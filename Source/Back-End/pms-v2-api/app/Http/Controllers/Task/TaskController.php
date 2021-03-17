<?php

namespace App\Http\Controllers\Task;

use App\Helper\CommonHelper;
use App\Http\Controllers\Controller;
use App\Models\Task;
use Illuminate\Support\Facades\Config;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class TaskController extends Controller
{
    public function getParentItems()
    {
        try {
            $parent_items = Task::all();
            return CommonHelper::Response(true, 'Parent items fetched successfully!', null, $parent_items);

        } catch (Exception $e) {
            return CommonHelper::throwError($e, 'TaskController', 'getParentItems', null);
        }
    }

    public function index(Request $request)
    {
        $RowsPerPage = (int)$request->input('RowsPerPage');
        $PageNumber = (int)$request->input('PageNumber') < 1 ? 1 : (int)$request->input('PageNumber');
        $Status = (string)$request->input('Status');


        try {

            $projects = Task::where('fund_type', $request->fund_type)->where('id', '!=', 0)->when($request->project_id, function ($q) use ($request) {
                return $q->where('project_id', $request->project_id);
            })->when($request->contractor_id, function ($q) use ($request) {
                $q->whereHas('contractors', function ($query) use ($request) {
                    if ($request->contractor_id) {
                        return $query->where('contractor_id', $request->contractor_id);
                    }
                });
            });

            if ($Status !== 'All') {
                $projects = $projects->where('status', '=', $Status);
            }

            $TotalRows = $projects->count();
            $TotalPages = ceil((int)$TotalRows / $RowsPerPage);
            $Offset = ((int)$PageNumber - 1) * $RowsPerPage;
            $PrevPage = (int)$PageNumber > 1 ? ((int)$PageNumber - 1) : 0;
            $NextPage = (int)$PageNumber < $TotalPages ? ((int)$PageNumber + 1) : 0;
            $LastPage = (int)$PageNumber == $TotalPages ? 0 : $TotalPages;

            $projects = $projects->skip($Offset)->take($RowsPerPage)->with('project')->with('section')->with('item_head')->with('unit')->with('supplier')->with('parent_item')->with('contractors')->get();

            return CommonHelper::Response(true, 'Project fund list fetched successfully!', null, [
                'TotalRows' => $TotalRows,
                'TotalPages' => $TotalPages,
                'PrevPage' => $PrevPage,
                'NextPage' => $NextPage,
                'LastPage' => $LastPage,
                'ListData' => $projects,
            ]);

        } catch (Exception $e) {
            return CommonHelper::throwError($e, 'ProjectFundController', 'index', 'ERR_UNKNOWN');
        }

    }

    public function show($id)
    {
        try {
            $supplier = Task::where('id', '=', $id)->with('contractors')->first();

            if ($supplier) {
                return CommonHelper::Response(true, 'Project Fund fetched successfully!', null, $supplier);
            }

            return CommonHelper::Response(false, 'Project fund not found!', null, null, 404);
        } catch (Exception $e) {
            return CommonHelper::throwError($e, 'TaskController', 'show');
        }
    }

    public function store(Request $request)
    {

        DB::beginTransaction();
        try {
            if (!$request->fund_id) {
                $Task = new Task();
                $msg = "Saved successfully!";
            } else {
                $Task = Task::find($request->fund_id);
                $msg = "Updated successfully!";
            }

            $Task->fund_type = $request->fund_type;
            $Task->economic_code = $request->economic_code;
            $Task->economic_sub_code = $request->economic_sub_code;
            $Task->description = $request->description;
            $Task->project_id = (int)$request->project_id;
            if ((int)$request->parent_task_id != 0) {
                $Task->parent_task_id = (int)$request->parent_task_id;
            }
            if ((int)$request->parent_item_id != 0) {
                $Task->parent_task_id = (int)$request->parent_item_id;
            }
            if ((int)$request->unit_id != 0) {
                $Task->unit_id = (int)$request->unit_id;
            }

            if ((int)$request->item_head_id != 0) {
                $Task->item_head_id = (int)$request->item_head_id;
            }

            if ((int)$request->section_id != 0) {
                $Task->section_id = (int)$request->section_id;
            }

            if ((int)$request->supplier_id != 0) {
                $Task->supplier_id = (int)$request->supplier_id;
            }

            if ($request->unit_rate) {
                $Task->unit_rate = $request->unit_rate;
            }
            if ($request->qty) {
                $Task->qty = $request->qty;
            }
            if ($request->start_date) {
                $Task->start_date = $request->start_date;
            }
            if ($request->end_date) {
                $Task->end_date = $request->end_date;
            }
            $Task->total_price = (double)$request->total_price;
            $Task->status = 'Active';

            $Task->remarks = $request->remarks;

            $Task->created_by = auth()->user()->id;

            if ($request->hasFile('attachment')) {
                $attachment = $request->file('attachment');
                $extension = (string)$attachment->extension();

                $continue = false;
                foreach (Config::get('fileextensions.ACCEPTED_FILE_EXTENSIONS') as $afe) {
                    if ($extension == $afe) {
                        $continue = true;
                    }
                }

                if (!$continue) {
                    return CommonHelper::Response(false, 'Please select a valid file!', 'UNSUPPORTED_FORMAT');
                }

                $name = time() . '_' . $attachment->getClientOriginalName();
                $filePath = Config::get('uploadconfig.TASK_ATTACHMENT') . $request->fund_type . '/' . $name;
                Storage::disk('s3')->put($filePath, file_get_contents($attachment));
                $Task->attachment = $filePath;
            }


            /**
             * Assign the contractors
             */
            $Task->save();

            $contractor_array = array();
            $project_contractor_array = array();
            $contractor_ids = (explode(',', $request->selected_contractors));
            for ($i = 0; $i < count($contractor_ids); $i++) {
                if ($contractor_ids[$i] === '') {
                    unset($contractor_ids[$i]);
                } else {
                    $contractor_array[$contractor_ids[$i]] =
                        [
                            "contract_qty" => $request->qty,
                            "contract_amount" => $request->total_price,
                            'contractor_id' => $contractor_ids[$i],
                            'created_at' => date('Y-m-d H:i:s'),
                            'updated_at' => date('Y-m-d H:i:s'),
                            'created_by' => auth()->user()->id,
                            'ip' => \Request::ip(),
                            'agent' =>  \Request::header('User-Agent')
                        ];

                    $project_contractor_array[$contractor_ids[$i]] =
                        [
                            'contractor_id' => $contractor_ids[$i],
                            'created_at' => date('Y-m-d H:i:s'),
                            'updated_at' => date('Y-m-d H:i:s'),
                            'created_by' => auth()->user()->id,
                            'ip' => \Request::ip(),
                            'agent' =>  \Request::header('User-Agent')
                        ];
                }
            }

            $Task->contractors()->sync($contractor_array);

            $Task->project()->first()->contractors()->syncWithoutDetaching($project_contractor_array);

            DB::commit();

            return CommonHelper::Response(true, $msg, null);
        } catch (Exception $e) {
            DB::rollback();
            return CommonHelper::throwError($e, 'TaskController', 'store', 'ERR_UNKNOWN');
        }
    }

    public function destroy(Request $request)
    {
        $project_fund_id = (int)$request->input('id');

        try {
            $project_fund = Task::where('id', $project_fund_id);

            if ($project_fund->exists()) {
                $project_fund = $project_fund->first();
                $project_fund->deleted_by = auth()->user()->id;
                $project_fund->save();
                $project_fund->delete();
                return CommonHelper::Response(true, 'Project Fund Deleted Successfully!');
            }

            return CommonHelper::Response(false, 'Project Fund not found!', null, null, 404);

        } catch (Exception $e) {
            return CommonHelper::throwError($e, 'TaskController', 'destroy');
        }
    }

    public function getTasksNoLimit(Request $request)
    {
        $fund_type = $request->fund_type;

        try {
            $tasks = Task::where('fund_type', '=', $fund_type)->with('unit')->
            whereHas('contractors', function ($query) use ($request) {
                if ($request->contractor_id) {
                    return $query->where('contractor_id', $request->contractor_id);
                }
            })->
            when($request->parent_task_id != 0, function ($q) use ($request) {
                return $q->where('parent_task_id', $request->parent_task_id);
            })->
            when($request->project_id != 0, function ($q) use ($request) {
                return $q->where('project_id', $request->project_id);
            })->with([
                'contractors' => function ($query) use ($request) {
                    return $query->where('contractors.id', $request->contractor_id);
                }
            ])->
            where('parent_task_id', '<>', 0)->
            orderBy('tasks.id', 'asc')->with('project')->get();

            return CommonHelper::Response(true, 'Tasks Fetched Successfully!', null, $tasks);
        } catch (Exception $e) {
            return CommonHelper::throwError($e, 'TaskController', 'getTasksNoLimit', 'UNKNOWN');
        }
    }

    public function getTasksList(Request $request)
    {
        try {
            $tasks = Task::where('fund_type', '=', $request->fund_type)
                ->when($request->project_id != 0, function ($q) use ($request) {
                    return $q->where('project_id', $request->project_id);
                })->with('project')
                ->orderBy('tasks.id', 'asc')->get();
            return CommonHelper::Response(true, 'Tasks Fetched Successfully!', null, $tasks);
        } catch (Exception $e) {
            return CommonHelper::throwError($e, 'TaskController', 'getTasksList', 'UNKNOWN');
        }
    }

    public function getParentTasks(Request $request)
    {
        try {
            $pf_funds = Task::
            where('fund_type', $request->fund_type)->
            where('parent_task_id', null)->
            when($request->contractor_id != 0, function ($q) use ($request) {
                $q->whereHas('contractors', function ($query) use ($request) {
                    if ($request->contractor_id) {
                        $query->where('contractor_id', $request->contractor_id);
                    }
                });
            })->
            when($request->project_id != 0, function ($q) use ($request) {
                return $q->where('project_id', $request->project_id);
            })->
            orderBy('id', 'desc')->with('project')->get();

            return CommonHelper::Response(true, 'Parent Tasks Fetched Successfully!', null, $pf_funds);
        } catch (Exception $e) {
            return CommonHelper::throwError($e, 'TaskController', 'getParentTasks', 'UNKNOWN');
        }
    }
}
