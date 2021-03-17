<?php

namespace App\Http\Controllers\EquipmentCategory;

use App\Helper\CommonHelper;
use App\Http\Controllers\Controller;
use App\Models\EquipmentCategory;
use Illuminate\Http\Request;
use \Exception;
use Illuminate\Support\Facades\DB;

class EquipmentCategoryController extends Controller
{
    public function index(Request $request)
    {
        $RowsPerPage = (int)$request->input('RowsPerPage');
        $PageNumber = (int)$request->input('PageNumber') < 1 ? 1 : (int)$request->input('PageNumber');



        try {

            $category = EquipmentCategory::where('id', '!=', 0);


            $TotalRows = $category->count();
            $TotalPages = ceil((int)$TotalRows / $RowsPerPage);
            $Offset = ((int)$PageNumber - 1) * $RowsPerPage;
            $PrevPage = (int)$PageNumber > 1 ? ((int)$PageNumber - 1) : 0;
            $NextPage = (int)$PageNumber < $TotalPages ? ((int)$PageNumber + 1) : 0;
            $LastPage = (int)$PageNumber == $TotalPages ? 0 : $TotalPages;

            $category = $category->skip($Offset)->take($RowsPerPage)->get();

            return CommonHelper::Response(true, 'Category list fetched successfully!', null, [
                'TotalRows' => $TotalRows,
                'TotalPages' => $TotalPages,
                'PrevPage' => $PrevPage,
                'NextPage' => $NextPage,
                'LastPage' => $LastPage,
                'ListData' => $category,
            ]);

        } catch (Exception $e) {
            return CommonHelper::throwError($e, 'EquipmentCategoryController', 'index', 'ERR_UNKNOWN');
        }

    }

    public function getCategory() {
        try {
            $category = EquipmentCategory::all();
            return CommonHelper::Response(true, 'Category fetched successfully!', null, $category);
        } catch (Exception $e) {
            return CommonHelper::throwError($e, 'EquipmentCategoryController', 'getSections', null);
        }
    }

    public function store(Request $request)
    {

        DB::beginTransaction();

        try {

            if($request->equcat_id) {
                $category = EquipmentCategory::find($request->equcat_id);
                $msg = "Updated successfully!";


            }else{


                $category = new EquipmentCategory();
                $msg = "Saved successfully!";
            }


            $category->name = $request->name;
            $category->created_by = auth()->user()->id;



            $category->save();
            DB::commit();

            return CommonHelper::Response(true, $msg, null);

        } catch (Exception $e) {
            DB::rollback();
            return CommonHelper::throwError($e, 'EquipmentCategoryController', 'store', 'ERR_UNKNOWN');
        }
    }

    public function show($id)
    {
        try {
            $cate = EquipmentCategory::where('id', '=', $id)->first();

            if ($cate) {
                return CommonHelper::Response(true, 'Category fetched successfully!', null, $cate);
            }

            return CommonHelper::Response(false, 'Category not found!', null, null, 404);
        } catch (Exception $e) {
            return CommonHelper::throwError($e, 'EquipmentCategoryController', 'show');
        }
    }

    public function destroy(Request $request)
    {
        $equ_id = (int)$request->input('id');

        try {
            $Equipment = EquipmentCategory::where('id', $equ_id);

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
