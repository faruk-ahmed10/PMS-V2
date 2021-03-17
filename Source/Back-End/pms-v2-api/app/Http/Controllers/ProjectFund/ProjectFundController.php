<?php

namespace App\Http\Controllers\ProjectFund;

use App\Helper\CommonHelper;
use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\ProjectFund;
use App\Models\Task;
use Illuminate\Support\Facades\Config;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class ProjectFundController extends Controller
{
    public function getParentItems()
    {
        try {
            $parent_items = Task::where('fund_type', 'PF')->where('parent_task_id', 0)->orWhere('parent_task_id', null)->get();

            return CommonHelper::Response(true, 'Parent items fetched successfully!', null, $parent_items);

        } catch (Exception $e) {
            return CommonHelper::throwError($e, 'ProjectFundController', 'getParentItems', null);
        }
    }

    public function index(Request $request)
    {
        $RowsPerPage = (int)$request->input('RowsPerPage');
        $PageNumber = (int)$request->input('PageNumber') < 1 ? 1 : (int)$request->input('PageNumber');
        $Status = (string)$request->input('Status');


        try {

            $projects = Task::when($request->fund_type, function($q) use ($request) {
                return $q->where('fund_type', $request->fund_type);
            })->where('id', '!=', 0)->when($request->project_id, function($q) use ($request) {
                return $q->where('project_id', $request->project_id);
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
            return CommonHelper::throwError($e, 'ProjectFundController', 'show');
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
            return CommonHelper::throwError($e, 'ProjectFundController', 'destroy');
        }
    }

    public function getProjectFundsNoLimit(Request $request)
    {
        try {
            $pf_funds = Task::with('unit')->
            where('fund_type', 'PF')->
            whereHas('contractors', function ($query) use ($request) {
                if ($request->contractor_id) {
                    $query->where('contractor_id', $request->contractor_id);
                }

            })->
            when($request->parent_task_id != 0, function ($q) use ($request) {
                return $q->where('parent_task_id', $request->parent_task_id);
            })->
            when($request->project_id != 0, function ($q) use ($request) {
                return $q->where('project_id', $request->project_id);
            })
                ->join('bill_details', 'bills.id', '=', 'bill_details.bill_id')
                ->join('tasks', 'bill_details.task_id', '=', 'tasks.id')->
                orderBy('id', 'desc')->with('project')->get();

            return CommonHelper::Response(true, 'Project Funds Fetched Successfully!', null, $pf_funds);
        } catch (Exception $e) {
            return CommonHelper::throwError($e, 'ProjectFundController', 'getProjectFundsForBalanceSheet', 'UNKNOWN');
        }
    }

    public function getParentTasks(Request $request)
    {
        try {
            $pf_funds = Task::
            where('fund_type', 'PF')->
            whereHas('contractors', function ($query) use ($request) {
                if ($request->contractor_id) {
                    $query->where('contractor_id', $request->contractor_id);
                }
            })->
            when($request->project_id != 0, function ($q) use ($request) {
                return $q->where('project_id', $request->project_id);
            })->
            where('parent_task_id', '<>', 0)->
            orderBy('id', 'desc')->with('project')->get();

            return CommonHelper::Response(true, 'PF Parent Tasks Fetched Successfully!', null, $pf_funds);
        } catch (Exception $e) {
            return CommonHelper::throwError($e, 'ProjectFundController', 'getParentTasks', 'UNKNOWN');
        }
    }
}
