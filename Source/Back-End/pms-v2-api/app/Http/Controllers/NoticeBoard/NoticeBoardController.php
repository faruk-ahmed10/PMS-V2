<?php

namespace App\Http\Controllers\NoticeBoard;

use App\Helper\CommonHelper;
use App\Http\Controllers\Controller;
use App\Models\Notice;
use Illuminate\Support\Facades\Config;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use \Exception;

class NoticeBoardController extends Controller
{
    public function __construct()
    {

    }


    public function index(Request $request)
    {
        $RowsPerPage = (int)$request->input('RowsPerPage');
        $PageNumber = (int)$request->input('PageNumber') < 1 ? 1 : (int)$request->input('PageNumber');


        try {

            $notices = Notice::where('id', '!=', 0);

            $TotalRows = $notices->count();
            $TotalPages = ceil((int)$TotalRows / $RowsPerPage);
            $Offset = ((int)$PageNumber - 1) * $RowsPerPage;
            $PrevPage = (int)$PageNumber > 1 ? ((int)$PageNumber - 1) : 0;
            $NextPage = (int)$PageNumber < $TotalPages ? ((int)$PageNumber + 1) : 0;
            $LastPage = (int)$PageNumber == $TotalPages ? 0 : $TotalPages;

            $notices = $notices->with('user')->skip($Offset)->take($RowsPerPage)->get();

            return CommonHelper::Response(true, 'Notice list fetched successfully!', null, [
                'TotalRows' => $TotalRows,
                'TotalPages' => $TotalPages,
                'PrevPage' => $PrevPage,
                'NextPage' => $NextPage,
                'LastPage' => $LastPage,
                'ListData' => $notices,
            ]);

        } catch (Exception $e) {
            return CommonHelper::throwError($e, 'NoticeBoardController', 'index', 'ERR_UNKNOWN');
        }

    }





    public function show($id)
    {
        try {
            $notice = Notice::where('id', '=', $id)->with('user')->first();

            if ($notice) {
                return CommonHelper::Response(true, 'Notice fetched successfully!', null, $notice);
            }

            return CommonHelper::Response(false, 'Notice not found!', null, null, 404);
        } catch (Exception $e) {
            return CommonHelper::throwError($e, 'NoticeBoardController', 'show');
        }
    }





    public function getLatestNotices(Request $request): object
    {
        $offset = (int)$request->offset;
        $sort = (string)$request->sort;
        $featured = (boolean)$request->featured;

        $notices = Notice::when($offset > 0, function ($q) use ($offset) {
            return $q->skip(0)->take((int)$offset);
        })->when($sort != '' && ($sort === 'desc' || $sort === 'asc'), function ($q) use ($sort) {
            return $q->orderBy('id', (string)$sort);
        })->when($featured && ($featured === true || $featured === false), function ($q) use ($featured) {
            return $q->where('is_featured', $featured);
        })->get();

        return response()->json([
            'success' => true,
            'error_code' => null,
            'message' => 'Notices listed successfully!',
            'data' => $notices,
        ]);
    }


    public function store(Request $request)
    {

        DB::beginTransaction();

        try {

          if($request->notice_id) {
                $notice = Notice::find($request->notice_id);
                $msg = "Updated successfully!";


            }else{


              $notice = new Notice();
              $msg = "Saved successfully!";
          }


            $notice->title = $request->title;
            $notice->description = $request->description;
            $notice->publish_date = $request->publish_date;
            $notice->status = $request->status;
            $notice->created_by = auth()->user()->id;


            if ($request->hasFile('file')) {
                $file = $request->file('file');
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
                $filePath = Config::get('uploadconfig.NOTICE_FILE') .'_'.  $name;
                Storage::disk('s3')->put($filePath, file_get_contents($file));
                $notice->file = $filePath;
            }

            $notice->save();
            DB::commit();

            return CommonHelper::Response(true, $msg, null);

        } catch (Exception $e) {
            DB::rollback();
            return CommonHelper::throwError($e, 'NoticeBoardController', 'store', 'ERR_UNKNOWN');
        }
    }

    public function destroy(Request $request)
    {
        $notice_id = (int)$request->input('id');

        try {
            $Notice = Notice::where('id', $notice_id);

            if ($Notice->exists()) {
                $Notice = $Notice->first();
//                $Notice->deleted_by = auth()->user()->id;
                $Notice->save();
                $Notice->delete();
                return CommonHelper::Response(true, 'Notice Deleted Successfully!');
            }

            return CommonHelper::Response(false, 'Notice not found!', null, null, 404);

        } catch (Exception $e) {
            return CommonHelper::throwError($e, 'NoticeBoardController', 'destroy');
        }
    }
}
