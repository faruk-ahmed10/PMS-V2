<?php

namespace App\Http\Controllers\Archives;

use App\Helper\CommonHelper;
use App\Http\Controllers\Controller;
use App\Models\Archive;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class ArchivesController extends Controller
{
    public function index(Request $request)
    {
        $RowsPerPage = (int)$request->input('RowsPerPage');
        $PageNumber = (int)$request->input('PageNumber') < 1 ? 1 : (int)$request->input('PageNumber');



        try {

            $archives = Archive::where('id', '!=', 0);


            $TotalRows = $archives->count();
            $TotalPages = ceil((int)$TotalRows / $RowsPerPage);
            $Offset = ((int)$PageNumber - 1) * $RowsPerPage;
            $PrevPage = (int)$PageNumber > 1 ? ((int)$PageNumber - 1) : 0;
            $NextPage = (int)$PageNumber < $TotalPages ? ((int)$PageNumber + 1) : 0;
            $LastPage = (int)$PageNumber == $TotalPages ? 0 : $TotalPages;

            $archives = $archives->with('project')->with('head')->skip($Offset)->take($RowsPerPage)->get();

            return CommonHelper::Response(true, 'Head list fetched successfully!', null, [
                'TotalRows' => $TotalRows,
                'TotalPages' => $TotalPages,
                'PrevPage' => $PrevPage,
                'NextPage' => $NextPage,
                'LastPage' => $LastPage,
                'ListData' => $archives,
            ]);

        } catch (Exception $e) {
            return CommonHelper::throwError($e, 'ArchivesController', 'index', 'ERR_UNKNOWN');
        }

    }

    public function store(Request $request)
    {

        //return $request->all();
        DB::beginTransaction();

        try {

            if($request->archive_id) {
                $archive = Archive::find($request->archive_id);
                $msg = "Updated successfully!";


            }else{


                $archive = new Archive();
                $msg = "Saved successfully!";
            }


            $archive->project_id = $request->ProjectID;
            $archive->title = $request->Title;
            $archive->head_id = $request->HeadID;
            $archive->description = $request->Description;
            $archive->created_by = auth()->user()->id;

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
                $filePath = Config::get('uploadconfig.ARCHIVE_FILE') .'_'.  $name;
                Storage::disk('s3')->put($filePath, file_get_contents($file));
                $archive->document = $filePath;
            }


            $archive->save();
            DB::commit();

            return CommonHelper::Response(true, $msg, null);

        } catch (Exception $e) {
            DB::rollback();
            return CommonHelper::throwError($e, 'ArchivesController', 'store', 'ERR_UNKNOWN');
        }
    }

    public function show($id)
    {
        try {
            $archive = Archive::where('id', '=', $id)->first();

            if ($archive) {
                return CommonHelper::Response(true, 'Archive fetched successfully!', null, $archive);
            }

            return CommonHelper::Response(false, 'Archive not found!', null, null, 404);
        } catch (Exception $e) {
            return CommonHelper::throwError($e, 'ArchivesController', 'show');
        }
    }

    public function destroy(Request $request)
    {
        $archive_id = (int)$request->input('id');

        try {
            $Archive = Archive::where('id', $archive_id);

            if ($Archive->exists()) {
                $Archive = $Archive->first();
//                $Notice->deleted_by = auth()->user()->id;
                $Archive->save();
                $Archive->delete();
                return CommonHelper::Response(true, 'Archive Deleted Successfully!');
            }

            return CommonHelper::Response(false, 'Archive not found!', null, null, 404);

        } catch (Exception $e) {
            return CommonHelper::throwError($e, 'ArchivesController', 'destroy');
        }
    }
}
