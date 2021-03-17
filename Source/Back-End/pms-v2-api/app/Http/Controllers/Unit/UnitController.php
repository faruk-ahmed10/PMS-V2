<?php

namespace App\Http\Controllers\Unit;

use App\Helper\CommonHelper;
use App\Http\Controllers\Controller;
use App\Models\Notice;
use App\Models\Unit;
use Illuminate\Http\Request;
use \Exception;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class UnitController extends Controller
{

    public function index(Request $request)
    {
        $RowsPerPage = (int)$request->input('RowsPerPage');
        $PageNumber = (int)$request->input('PageNumber') < 1 ? 1 : (int)$request->input('PageNumber');
        $Status = (string)$request->input('Status');


        try {

            $units = Unit::where('id', '!=', 0);


            $TotalRows = $units->count();
            $TotalPages = ceil((int)$TotalRows / $RowsPerPage);
            $Offset = ((int)$PageNumber - 1) * $RowsPerPage;
            $PrevPage = (int)$PageNumber > 1 ? ((int)$PageNumber - 1) : 0;
            $NextPage = (int)$PageNumber < $TotalPages ? ((int)$PageNumber + 1) : 0;
            $LastPage = (int)$PageNumber == $TotalPages ? 0 : $TotalPages;

            $units = $units->skip($Offset)->take($RowsPerPage)->get();

            return CommonHelper::Response(true, 'Unit list fetched successfully!', null, [
                'TotalRows' => $TotalRows,
                'TotalPages' => $TotalPages,
                'PrevPage' => $PrevPage,
                'NextPage' => $NextPage,
                'LastPage' => $LastPage,
                'ListData' => $units,
            ]);

        } catch (Exception $e) {
            return CommonHelper::throwError($e, 'UnitController', 'index', 'ERR_UNKNOWN');
        }

    }


    public function getUnits() {
        try {
            $units = Unit::all();
            return CommonHelper::Response(true, 'Unit fetched successfully!', null, $units);
        } catch (Exception $e) {
            return CommonHelper::throwError($e, 'UnitController', 'getUnits', null);
        }
    }

    public function store(Request $request)
    {

        DB::beginTransaction();

        try {

            if($request->unit_id) {
                $unit = Unit::find($request->unit_id);
                $msg = "Updated successfully!";


            }else{


                $unit = new Unit();
                $msg = "Saved successfully!";
            }


            $unit->name = $request->name;
            $unit->created_by = auth()->user()->id;



            $unit->save();
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
            $unit = Unit::where('id', '=', $id)->with('user')->first();

            if ($unit) {
                return CommonHelper::Response(true, 'Unit fetched successfully!', null, $unit);
            }

            return CommonHelper::Response(false, 'Unit not found!', null, null, 404);
        } catch (Exception $e) {
            return CommonHelper::throwError($e, 'UnitController', 'show');
        }
    }


    public function destroy(Request $request)
    {
        $unit_id = (int)$request->input('id');

        try {
            $Unit = Unit::where('id', $unit_id);

            if ($Unit->exists()) {
                $Unit = $Unit->first();
//                $Notice->deleted_by = auth()->user()->id;
                $Unit->save();
                $Unit->delete();
                return CommonHelper::Response(true, 'Unit Deleted Successfully!');
            }

            return CommonHelper::Response(false, 'Unit not found!', null, null, 404);

        } catch (Exception $e) {
            return CommonHelper::throwError($e, 'UnitController', 'destroy');
        }
    }


}
