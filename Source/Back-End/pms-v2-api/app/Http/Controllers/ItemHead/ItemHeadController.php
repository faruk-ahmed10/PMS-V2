<?php

namespace App\Http\Controllers\ItemHead;

use App\Helper\CommonHelper;
use App\Http\Controllers\Controller;
use App\Models\ItemHead;
use Illuminate\Http\Request;
use \Exception;
use Illuminate\Support\Facades\DB;

class ItemHeadController extends Controller
{
    public function index(Request $request)
    {
        $RowsPerPage = (int)$request->input('RowsPerPage');
        $PageNumber = (int)$request->input('PageNumber') < 1 ? 1 : (int)$request->input('PageNumber');



        try {

            $items = ItemHead::where('id', '!=', 0);


            $TotalRows = $items->count();
            $TotalPages = ceil((int)$TotalRows / $RowsPerPage);
            $Offset = ((int)$PageNumber - 1) * $RowsPerPage;
            $PrevPage = (int)$PageNumber > 1 ? ((int)$PageNumber - 1) : 0;
            $NextPage = (int)$PageNumber < $TotalPages ? ((int)$PageNumber + 1) : 0;
            $LastPage = (int)$PageNumber == $TotalPages ? 0 : $TotalPages;

            $items = $items->skip($Offset)->take($RowsPerPage)->get();

            return CommonHelper::Response(true, 'Unit list fetched successfully!', null, [
                'TotalRows' => $TotalRows,
                'TotalPages' => $TotalPages,
                'PrevPage' => $PrevPage,
                'NextPage' => $NextPage,
                'LastPage' => $LastPage,
                'ListData' => $items,
            ]);

        } catch (Exception $e) {
            return CommonHelper::throwError($e, 'SectionController', 'index', 'ERR_UNKNOWN');
        }

    }

    public function getItemHeads()
    {
        try {
            $item_heads = ItemHead::all();
            return CommonHelper::Response(true, 'Item heads fetched successfully!', null, $item_heads);
        } catch (Exception $e) {
            return CommonHelper::throwError($e, 'ItemHeadController', 'getItemHeads', null);
        }
    }

    public function store(Request $request)
    {

        DB::beginTransaction();

        try {

            if($request->item_head_id) {
                $section = ItemHead::find($request->item_head_id);
                $msg = 'Updated successfully!';


            }else{


                $section = new ItemHead();
                $msg = 'Saved successfully!';
            }


            $section->name = $request->name;
            $section->created_by = auth()->user()->id;



            $section->save();
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
            $itemhead = ItemHead::where('id', '=', $id)->first();

            if ($itemhead) {
                return CommonHelper::Response(true, 'Item Head fetched successfully!', null, $itemhead);
            }

            return CommonHelper::Response(false, 'Item Head not found!', null, null, 404);
        } catch (Exception $e) {
            return CommonHelper::throwError($e, 'ItemHeadController', 'show');
        }
    }

    public function destroy(Request $request)
    {
        $item_head_id = (int)$request->input('id');

        try {
            $ItemHead = ItemHead::where('id', $item_head_id);

            if ($ItemHead->exists()) {
                $ItemHead = $ItemHead->first();
//                $Notice->deleted_by = auth()->user()->id;
                $ItemHead->save();
                $ItemHead->delete();
                return CommonHelper::Response(true, 'Item Head Deleted Successfully!');
            }

            return CommonHelper::Response(false, 'Item Head not found!', null, null, 404);

        } catch (Exception $e) {
            return CommonHelper::throwError($e, 'ItemHeadController', 'destroy');
        }
    }

}
