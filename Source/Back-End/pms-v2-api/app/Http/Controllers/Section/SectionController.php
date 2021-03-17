<?php

namespace App\Http\Controllers\Section;

use App\Helper\CommonHelper;
use App\Http\Controllers\Controller;
use App\Models\Section;
use Illuminate\Http\Request;
use \Exception;
use Illuminate\Support\Facades\DB;

class SectionController extends Controller
{

    public function index(Request $request)
    {
        $RowsPerPage = (int)$request->input('RowsPerPage');
        $PageNumber = (int)$request->input('PageNumber') < 1 ? 1 : (int)$request->input('PageNumber');



        try {

            $section = Section::where('id', '!=', 0);


            $TotalRows = $section->count();
            $TotalPages = ceil((int)$TotalRows / $RowsPerPage);
            $Offset = ((int)$PageNumber - 1) * $RowsPerPage;
            $PrevPage = (int)$PageNumber > 1 ? ((int)$PageNumber - 1) : 0;
            $NextPage = (int)$PageNumber < $TotalPages ? ((int)$PageNumber + 1) : 0;
            $LastPage = (int)$PageNumber == $TotalPages ? 0 : $TotalPages;

            $section = $section->skip($Offset)->take($RowsPerPage)->get();

            return CommonHelper::Response(true, 'Unit list fetched successfully!', null, [
                'TotalRows' => $TotalRows,
                'TotalPages' => $TotalPages,
                'PrevPage' => $PrevPage,
                'NextPage' => $NextPage,
                'LastPage' => $LastPage,
                'ListData' => $section,
            ]);

        } catch (Exception $e) {
            return CommonHelper::throwError($e, 'SectionController', 'index', 'ERR_UNKNOWN');
        }

    }

    public function getSections() {
        try {
            $sections = Section::all();
            return CommonHelper::Response(true, 'Sections fetched successfully!', null, $sections);
        } catch (Exception $e) {
            return CommonHelper::throwError($e, 'SectionController', 'getSections', null);
        }
    }

    public function store(Request $request)
    {

        DB::beginTransaction();

        try {

            if($request->section_id) {
                $section = Section::find($request->section_id);
                $msg = "Updated successfully!";


            }else{


                $section = new Section();
                $msg = "Saved successfully!";
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
            $section = Section::where('id', '=', $id)->with('user')->first();

            if ($section) {
                return CommonHelper::Response(true, 'Section fetched successfully!', null, $section);
            }

            return CommonHelper::Response(false, 'Section not found!', null, null, 404);
        } catch (Exception $e) {
            return CommonHelper::throwError($e, 'SectionController', 'show');
        }
    }

    public function destroy(Request $request)
    {
        $section_id = (int)$request->input('id');

        try {
            $Section = Section::where('id', $section_id);

            if ($Section->exists()) {
                $Section = $Section->first();
//                $Notice->deleted_by = auth()->user()->id;
                $Section->save();
                $Section->delete();
                return CommonHelper::Response(true, 'Section Deleted Successfully!');
            }

            return CommonHelper::Response(false, 'Section not found!', null, null, 404);

        } catch (Exception $e) {
            return CommonHelper::throwError($e, 'SectionController', 'destroy');
        }
    }
}
