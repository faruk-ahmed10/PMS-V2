<?php

namespace App\Http\Controllers\Fund\Misc;

use App\Helper\CommonHelper;
use App\Http\Controllers\Controller;
use App\Models\MiscFund;
use Illuminate\Support\Facades\Config;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class MiscController extends Controller
{
    public function getParentItems()
    {
        try {
            $parent_items = MiscFund::all();
            return CommonHelper::Response(true, 'Parent items fetched successfully!', null, $parent_items);

        } catch (Exception $e) {
            return CommonHelper::throwError($e, 'MiscController', 'getParentItems', null);
        }
    }

    public function index(Request $request)
    {
        $RowsPerPage = (int)$request->input('RowsPerPage');
        $PageNumber = (int)$request->input('PageNumber') < 1 ? 1 : (int)$request->input('PageNumber');
        $Status = (string)$request->input('Status');


        try {

            $projects = MiscFund::where('id', '!=', 0);

            if($Status !== 'All') {
                $projects = $projects->where('status', '=', $Status);
            }

            $TotalRows = $projects->count();
            $TotalPages = ceil((int)$TotalRows / $RowsPerPage);
            $Offset = ((int)$PageNumber - 1) * $RowsPerPage;
            $PrevPage = (int)$PageNumber > 1 ? ((int)$PageNumber - 1) : 0;
            $NextPage = (int)$PageNumber < $TotalPages ? ((int)$PageNumber + 1) : 0;
            $LastPage = (int)$PageNumber == $TotalPages ? 0 : $TotalPages;

            $projects = $projects->skip($Offset)->take($RowsPerPage)->with('project')->with('section')->with('item_head')->with('unit')->with('supplier')->with('parent_item')->with('contractors')->get();

            return CommonHelper::Response(true, 'Misc Fund list fetched successfully!', null, [
                'TotalRows' => $TotalRows,
                'TotalPages' => $TotalPages,
                'PrevPage' => $PrevPage,
                'NextPage' => $NextPage,
                'LastPage' => $LastPage,
                'ListData' => $projects,
            ]);

        } catch (Exception $e) {
            return CommonHelper::throwError($e, 'MiscController', 'index', 'ERR_UNKNOWN');
        }

    }

    public function show($id)
    {
        try {
            $supplier = MiscFund::where('id', '=', $id)->with('contractors')->first();

            if ($supplier) {
                return CommonHelper::Response(true, 'Misc Fund fetched successfully!', null, $supplier);
            }

            return CommonHelper::Response(false, 'Misc Fund not found!', null, null, 404);
        } catch (Exception $e) {
            return CommonHelper::throwError($e, 'MiscController', 'show');
        }
    }

    public function store(Request $request)
    {

        DB::beginTransaction();
        try {
            if (!$request->fund_id) {

                $Misc = new MiscFund();
                $msg = "Saved successfully!";
            } else {
                $Misc = MiscFund::find($request->fund_id);
                $msg = "Updated successfully!";
            }

            $Misc->economic_code = $request->economic_code;
            $Misc->economic_sub_code = $request->economic_sub_code;
            $Misc->description = $request->description;
            $Misc->project_id = (int)$request->project_id;
            $Misc->parent_item_id = (int)$request->parent_item_id;
            $Misc->unit_id = (int)$request->unit_id;
            $Misc->item_head_id = (int)$request->item_head_id;
            $Misc->section_id = (int)$request->section_id;
            $Misc->supplier_id = (int)$request->supplier_id;

            $Misc->start_date = $request->start_date;
            $Misc->end_date = $request->end_date;

            $Misc->unit_rate = $request->unit_rate;
            $Misc->qty = $request->qty;
            $Misc->total_price = $request->total_price;
            $Misc->status = $request->status ? $request->status : 'Active';

            $Misc->remarks = $request->remarks;

            $Misc->created_by = auth()->user()->id;

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

                $name = time() . '.' . $attachment->getClientOriginalName();
                $filePath = Config::get('uploadconfig.FUND_ATTACHMENT') .'_'.  $name;
                Storage::disk('s3')->put($filePath, file_get_contents($attachment));
                $Misc->attachment = $filePath;
            }


            /**
             * Assign the contractors
             */
            $Misc->save();

            $contractor_ids = (explode(',', $request->selected_contractors));
            for($i = 0; $i < count($contractor_ids); $i++) {
                if($contractor_ids[$i] === '') {
                    unset($contractor_ids[$i]);
                }
            }
            $Misc->contractors()->sync($contractor_ids);

            $Misc->project()->first()->contractors()->syncWithoutDetaching($contractor_ids);

            DB::commit();

            return CommonHelper::Response(true, $msg, null);
        } catch (Exception $e) {
            DB::rollback();
            return CommonHelper::throwError($e, 'MiscController', 'store', 'ERR_UNKNOWN');
        }
    }

    public function destroy(Request $request)
    {
        $misc_fund_id = (int)$request->input('id');

        try {
            $misc_fund = MiscFund::where('id', $misc_fund_id);

            if ($misc_fund->exists()) {
                $misc_fund = $misc_fund->first();
                $misc_fund->deleted_by = auth()->user()->id;
                $misc_fund->save();
                $misc_fund->delete();
                return CommonHelper::Response(true, 'Misc Fund Deleted Successfully!');
            }

            return CommonHelper::Response(false, 'Misc Fund not found!', null, null, 404);

        } catch (Exception $e) {
            return CommonHelper::throwError($e, 'MiscController', 'destroy');
        }
    }
}
