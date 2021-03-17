<?php

namespace App\Http\Controllers\Equipment;

use App\Helper\CommonHelper;
use App\Http\Controllers\Controller;
use App\Models\Equipment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class EquipmentController extends Controller
{
    public function index(Request $request)
    {
        $RowsPerPage = (int)$request->input('RowsPerPage');
        $PageNumber = (int)$request->input('PageNumber') < 1 ? 1 : (int)$request->input('PageNumber');



        try {

            $equipment = Equipment::where('id', '!=', 0);


            $TotalRows = $equipment->count();
            $TotalPages = ceil((int)$TotalRows / $RowsPerPage);
            $Offset = ((int)$PageNumber - 1) * $RowsPerPage;
            $PrevPage = (int)$PageNumber > 1 ? ((int)$PageNumber - 1) : 0;
            $NextPage = (int)$PageNumber < $TotalPages ? ((int)$PageNumber + 1) : 0;
            $LastPage = (int)$PageNumber == $TotalPages ? 0 : $TotalPages;

            $equipment = $equipment->with('project')->with('unit')->with('category')->skip($Offset)->take($RowsPerPage)->get();

            return CommonHelper::Response(true, 'Unit list fetched successfully!', null, [
                'TotalRows' => $TotalRows,
                'TotalPages' => $TotalPages,
                'PrevPage' => $PrevPage,
                'NextPage' => $NextPage,
                'LastPage' => $LastPage,
                'ListData' => $equipment,
            ]);

        } catch (Exception $e) {
            return CommonHelper::throwError($e, 'EquipmentController', 'index', 'ERR_UNKNOWN');
        }

    }

    public function store(Request $request)
    {

        //return $request->all();
        DB::beginTransaction();

        try {

            if($request->equipment_id) {
                $equipment = Equipment::find($request->equipment_id);
                $msg = "Updated successfully!";


            }else{


                $equipment = new Equipment();
                $msg = "Saved successfully!";
            }


            $equipment->project_id = $request->ProjectID;
            $equipment->name = $request->Name;
            $equipment->qty = $request->QTY;
            $equipment->unit_id = $request->UnitID;
            $equipment->ba_no = $request->BANo;
            $equipment->category_id = $request->CategoryID;
            $equipment->present_condition = $request->PresentCondition;
            $equipment->location = $request->Location;
            $equipment->purchase_date = $request->PurchaseDate;
            $equipment->receive_date = $request->ReceiveDate;
            $equipment->description = $request->Description;
            $equipment->created_by = auth()->user()->id;

            if ($request->hasFile('Document')) {
                $file = $request->file('Document');
                $extension = (string)$file->extension();

                $continue = false;
                foreach (Config::get('fileextensions.ACCEPTED_FILE_EXTENSIONS') as $afe) {
                    if ($extension == $afe) {
                        $continue = true;
                    }
                }

                if (!$continue) {
                    return response()->json([
                        'success' => false,
                        'error_code' => 'UNSUPPORTED_FORMAT',
                        'message' => 'Please select a valid file!',
                    ]);
                }

                $name = time() . '.' . $file->getClientOriginalName();
                $filePath = Config::get('uploadconfig.EQUIPMENT_FILE') .'_'.  $name;
                Storage::disk('s3')->put($filePath, file_get_contents($file));
                $equipment->document = $filePath;
            }


            $equipment->save();
            DB::commit();

            return CommonHelper::Response(true, $msg, null);

        } catch (Exception $e) {
            DB::rollback();
            return CommonHelper::throwError($e, 'UnitController', 'store', 'ERR_UNKNOWN');
        }
    }

    public function show($id)
    {
        try {
            $equipment = Equipment::where('id', '=', $id)->first();

            if ($equipment) {
                return CommonHelper::Response(true, 'Equipment fetched successfully!', null, $equipment);
            }

            return CommonHelper::Response(false, 'Equipment not found!', null, null, 404);
        } catch (Exception $e) {
            return CommonHelper::throwError($e, 'EquipmentController', 'show');
        }
    }

    public function destroy(Request $request)
    {
        $gallery_id = (int)$request->input('id');

        try {
            $Equipment = Equipment::where('id', $gallery_id);

            if ($Equipment->exists()) {
                $Equipment = $Equipment->first();
//                $Notice->deleted_by = auth()->user()->id;
                $Equipment->save();
                $Equipment->delete();
                return CommonHelper::Response(true, 'Equipment Deleted Successfully!');
            }

            return CommonHelper::Response(false, 'Equipment not found!', null, null, 404);

        } catch (Exception $e) {
            return CommonHelper::throwError($e, 'EquipmentController', 'destroy');
        }
    }
}
