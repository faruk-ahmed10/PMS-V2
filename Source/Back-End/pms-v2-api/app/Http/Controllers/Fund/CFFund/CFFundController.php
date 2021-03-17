<?php

namespace App\Http\Controllers\Fund\CFFund;

use App\Helper\CommonHelper;
use App\Http\Controllers\Controller;
use App\Models\CfFund;
use App\Models\Task;
use Illuminate\Support\Facades\Config;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class CFFundController extends Controller
{
    public function getParentItems()
    {
        try {
            $parent_items = Task::where('fund_type','CF')->get();

            return CommonHelper::Response(true, 'Parent items fetched successfully!', null, $parent_items);

        } catch (Exception $e) {
            return CommonHelper::throwError($e, 'CFFundController', 'getParentItems', null);
        }
    }
    

    public function show($id)
    {
        try {
            $supplier = Task::where('id', '=', $id)->with('contractors')->first();

            if ($supplier) {
                return CommonHelper::Response(true, 'CF Fund fetched successfully!', null, $supplier);
            }

            return CommonHelper::Response(false, 'CF Fund not found!', null, null, 404);
        } catch (Exception $e) {
            return CommonHelper::throwError($e, 'CFFundController', 'show');
        }
    }

    public function store(Request $request)
    {

        DB::beginTransaction();
        try {
            if (!$request->fund_id) {

                $CFFund = new CfFund();
                $msg = "Saved successfully!";
            } else {
                $CFFund = CfFund::find($request->fund_id);
                $msg = "Updated successfully!";
            }

            $CFFund->economic_code = $request->economic_code;
            $CFFund->economic_sub_code = $request->economic_sub_code;
            $CFFund->description = $request->description;
            $CFFund->project_id = (int)$request->project_id;
            if($request->parent_item_id){
                $CFFund->parent_item_id = (int)$request->parent_item_id;
            }
            $CFFund->unit_id = (int)$request->unit_id;
            $CFFund->item_head_id = (int)$request->item_head_id;
            $CFFund->section_id = (int)$request->section_id;
            if($request->supplier_id){
                $CFFund->supplier_id = (int)$request->supplier_id;
            }
            $CFFund->start_date = $request->start_date;
            $CFFund->end_date = $request->end_date;
            $CFFund->unit_rate = $request->unit_rate;
            $CFFund->status = $request->status ? $request->status : 'Active';
            $CFFund->remarks = $request->remarks;

            $CFFund->created_by = auth()->user()->id;

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
                $CFFund->attachment = $filePath;
            }


            /**
             * Assign the contractors
             */
            $CFFund->save();
            $CFFund->increment('qty',$request->qty);
            $CFFund->increment('total_price',$request->total_price);

            $contractor_array = array();
            $contractor_ids = (explode(',', $request->selected_contractors));
            for($i = 0; $i < count($contractor_ids); $i++) {
                if($contractor_ids[$i] === '') {
                    unset($contractor_ids[$i]);
                }else{
                    $contractor_array[$contractor_ids[$i]] = ["contract_qty" => $request->qty, "contract_amount" => $request->total_price,'contractor_id' => $contractor_ids[$i]];
                }
            }

            $CFFund->contractors()->sync($contractor_array);

            $CFFund->project()->first()->contractors()->sync($contractor_ids);

            DB::commit();

            return CommonHelper::Response(true, $msg, null);
        } catch (Exception $e) {
            DB::rollback();
            return CommonHelper::throwError($e, 'CFFundController', 'store', 'ERR_UNKNOWN');
        }
    }

    public function destroy(Request $request)
    {
        $cf_fund_id = (int)$request->input('id');

        try {
            $cf_fund = Task::where('id', $cf_fund_id);

            if ($cf_fund->exists()) {
                $cf_fund = $cf_fund->first();
                $cf_fund->deleted_by = auth()->user()->id;
                $cf_fund->save();
                $cf_fund->delete();
                return CommonHelper::Response(true, 'CF Fund Deleted Successfully!');
            }

            return CommonHelper::Response(false, 'CF Fund not found!', null, null, 404);

        } catch (Exception $e) {
            return CommonHelper::throwError($e, 'CFFundController', 'destroy');
        }
    }
    
}
