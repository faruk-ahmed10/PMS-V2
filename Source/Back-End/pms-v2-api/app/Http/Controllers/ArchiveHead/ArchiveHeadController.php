<?php

namespace App\Http\Controllers\ArchiveHead;

use App\Helper\CommonHelper;
use App\Http\Controllers\Controller;
use App\Models\ArchiveHead;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ArchiveHeadController extends Controller
{
    public function index(Request $request)
    {
        $RowsPerPage = (int)$request->input('RowsPerPage');
        $PageNumber = (int)$request->input('PageNumber') < 1 ? 1 : (int)$request->input('PageNumber');



        try {

            $head = ArchiveHead::where('id', '!=', 0);


            $TotalRows = $head->count();
            $TotalPages = ceil((int)$TotalRows / $RowsPerPage);
            $Offset = ((int)$PageNumber - 1) * $RowsPerPage;
            $PrevPage = (int)$PageNumber > 1 ? ((int)$PageNumber - 1) : 0;
            $NextPage = (int)$PageNumber < $TotalPages ? ((int)$PageNumber + 1) : 0;
            $LastPage = (int)$PageNumber == $TotalPages ? 0 : $TotalPages;

            $head = $head->skip($Offset)->take($RowsPerPage)->get();

            return CommonHelper::Response(true, 'Head list fetched successfully!', null, [
                'TotalRows' => $TotalRows,
                'TotalPages' => $TotalPages,
                'PrevPage' => $PrevPage,
                'NextPage' => $NextPage,
                'LastPage' => $LastPage,
                'ListData' => $head,
            ]);

        } catch (Exception $e) {
            return CommonHelper::throwError($e, 'ArchiveHeadControler', 'index', 'ERR_UNKNOWN');
        }

    }

    public function store(Request $request)
    {

        DB::beginTransaction();

        try {

            if($request->head_id) {
                $head = ArchiveHead::find($request->head_id);
                $msg = "Updated successfully!";


            }else{


                $head = new ArchiveHead();
                $msg = "Saved successfully!";
            }


            $head->name = $request->name;
            $head->created_by = auth()->user()->id;



            $head->save();
            DB::commit();

            return CommonHelper::Response(true, $msg, null);

        } catch (Exception $e) {
            DB::rollback();
            return CommonHelper::throwError($e, 'ArchiveHeadController', 'store', 'ERR_UNKNOWN');
        }
    }

    public function show($id)
    {
        try {
            $head = ArchiveHead::where('id', '=', $id)->with('user')->first();

            if ($head) {
                return CommonHelper::Response(true, 'Head fetched successfully!', null, $head);
            }

            return CommonHelper::Response(false, 'Head not found!', null, null, 404);
        } catch (Exception $e) {
            return CommonHelper::throwError($e, 'ArchiveHeadController', 'show');
        }
    }

    public function getHeads() {
        try {
            $heads = ArchiveHead::all();
            return CommonHelper::Response(true, 'Heads fetched successfully!', null, $heads);
        } catch (Exception $e) {
            return CommonHelper::throwError($e, 'ArchiveHeadController', 'getHeads', null);
        }
    }
}
