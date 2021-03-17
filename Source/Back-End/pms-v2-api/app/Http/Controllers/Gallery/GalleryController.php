<?php

namespace App\Http\Controllers\Gallery;

use App\Helper\CommonHelper;
use App\Http\Controllers\Controller;
use App\Models\Gallery;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class GalleryController extends Controller
{
    public function getGalleryImages(Request $request)
    {
        $offset = (int)$request->offset;
        $sort = (string)$request->sort;
        $is_featured = $request->featured;
        $project_id = (int)$request->project_id;

        $gallery_images = Gallery::when($offset > 0, function ($q) use ($offset) {
            return $q->skip(0)->take((int)$offset);
        })->when($sort != '' && ($sort === 'desc' || $sort === 'asc'), function ($q) use ($sort) {
            return $q->orderBy('id', (string)$sort);
        })->when($is_featured && (boolean)$is_featured === true, function ($q) {
            return $q->where('is_featured', '=', 1);
        })->when($project_id > 0, function ($q) use ($project_id) {
            return $q->where('project_id', '=', $project_id);
        })->get();

        return response()->json([
            'success' => true,
            'error_code' => null,
            'message' => 'Gallery images listed successfully!',
            'data' => $gallery_images,
        ]);
    }

    public function index(Request $request)
    {
        $RowsPerPage = (int)$request->input('RowsPerPage');
        $PageNumber = (int)$request->input('PageNumber') < 1 ? 1 : (int)$request->input('PageNumber');
        $project_id = (int)$request->project_id;
        $archive_head_id = (int)$request->archive_head_id;


        try {

            $gallery = Gallery::where('id', '!=', 0);
            if($project_id > 0) {
                $gallery = $gallery->where('project_id', '=', $project_id);
            }
            if($archive_head_id > 0) {
                $gallery = $gallery->where('archive_head_id', '=', $archive_head_id);
            }


            $TotalRows = $gallery->count();
            $TotalPages = ceil((int)$TotalRows / $RowsPerPage);
            $Offset = ((int)$PageNumber - 1) * $RowsPerPage;
            $PrevPage = (int)$PageNumber > 1 ? ((int)$PageNumber - 1) : 0;
            $NextPage = (int)$PageNumber < $TotalPages ? ((int)$PageNumber + 1) : 0;
            $LastPage = (int)$PageNumber == $TotalPages ? 0 : $TotalPages;

            $gallery = $gallery->with('project')->skip($Offset)->take($RowsPerPage)->get();

            return CommonHelper::Response(true, 'Unit list fetched successfully!', null, [
                'TotalRows' => $TotalRows,
                'TotalPages' => $TotalPages,
                'PrevPage' => $PrevPage,
                'NextPage' => $NextPage,
                'LastPage' => $LastPage,
                'ListData' => $gallery,
            ]);

        } catch (Exception $e) {
            return CommonHelper::throwError($e, 'SectionController', 'index', 'ERR_UNKNOWN');
        }

    }

    public function store(Request $request)
    {

        DB::beginTransaction();

        try {

            if($request->gallery_id) {
                $gallery = Gallery::find($request->gallery_id);
                $msg = "Updated successfully!";


            }else{


                $gallery = new Gallery();
                $msg = "Saved successfully!";
            }


            $gallery->project_id = $request->ProjectID;
            $gallery->archive_head_id = $request->ArchiveHeadID;
            $gallery->is_featured = $request->Featured;
            $gallery->title = $request->GalleryTitle;
            $gallery->description = $request->Description;
            $gallery->status = $request->status;
            $gallery->created_by = auth()->user()->id;

            if ($request->hasFile('Image')) {
                $file = $request->file('Image');
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
                $filePath = Config::get('uploadconfig.GALLERY_FILE') .'_'.  $name;
                Storage::disk('s3')->put($filePath, file_get_contents($file));
                $gallery->image = $filePath;
            }


            $gallery->save();
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
            $gallery = Gallery::where('id', '=', $id)->with('user')->first();

            if ($gallery) {
                return CommonHelper::Response(true, 'Gallery fetched successfully!', null, $gallery);
            }

            return CommonHelper::Response(false, 'Gallery not found!', null, null, 404);
        } catch (Exception $e) {
            return CommonHelper::throwError($e, 'GalleryController', 'show');
        }
    }

    public function destroy(Request $request)
    {
        $gallery_id = (int)$request->input('id');

        try {
            $Gallery = Gallery::where('id', $gallery_id);

            if ($Gallery->exists()) {
                $Gallery = $Gallery->first();
//                $Notice->deleted_by = auth()->user()->id;
                $Gallery->save();
                $Gallery->delete();
                return CommonHelper::Response(true, 'Gallery Deleted Successfully!');
            }

            return CommonHelper::Response(false, 'Gallery not found!', null, null, 404);

        } catch (Exception $e) {
            return CommonHelper::throwError($e, 'GalleryController', 'destroy');
        }
    }
}
