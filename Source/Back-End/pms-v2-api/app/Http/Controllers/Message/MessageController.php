<?php

namespace App\Http\Controllers\Message;

use App\Helper\CommonHelper;
use App\Http\Controllers\Controller;
use App\Models\Message;
use App\Models\Notice;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class MessageController extends Controller
{

    public function index(Request $request)
    {
        $RowsPerPage = (int)$request->input('RowsPerPage');
        $PageNumber = (int)$request->input('PageNumber') < 1 ? 1 : (int)$request->input('PageNumber');


        try {

            $message = Message::where('id', '!=', 0);

            $TotalRows = $message->count();
            $TotalPages = ceil((int)$TotalRows / $RowsPerPage);
            $Offset = ((int)$PageNumber - 1) * $RowsPerPage;
            $PrevPage = (int)$PageNumber > 1 ? ((int)$PageNumber - 1) : 0;
            $NextPage = (int)$PageNumber < $TotalPages ? ((int)$PageNumber + 1) : 0;
            $LastPage = (int)$PageNumber == $TotalPages ? 0 : $TotalPages;

            $message = $message->with('user')->skip($Offset)->take($RowsPerPage)->get();

            return CommonHelper::Response(true, 'Message list fetched successfully!', null, [
                'TotalRows' => $TotalRows,
                'TotalPages' => $TotalPages,
                'PrevPage' => $PrevPage,
                'NextPage' => $NextPage,
                'LastPage' => $LastPage,
                'ListData' => $message,
            ]);

        } catch (Exception $e) {
            return CommonHelper::throwError($e, 'MessageController', 'index', 'ERR_UNKNOWN');
        }

    }

    public function show($id)
    {
        try {
            $notice = Message::where('id', '=', $id)->with('user')->first();

            if ($notice) {
                return CommonHelper::Response(true, 'Message fetched successfully!', null, $notice);
            }

            return CommonHelper::Response(false, 'Message not found!', null, null, 404);
        } catch (Exception $e) {
            return CommonHelper::throwError($e, 'MessageController', 'show');
        }
    }

    public function getMessages(Request $request): object
    {
        $offset = (int)$request->offset;
        $sort = (string)$request->sort;
        $officer_id = (int)$request->officer_id;

        $notices = Message::when($offset > 0, function ($q) use ($offset) {
            return $q->skip(0)->take((int)$offset);
        })->when($sort != '' && ($sort === 'desc' || $sort === 'asc'), function ($q) use ($sort) {
            return $q->orderBy('id', (string)$sort);
        })->when($officer_id !== 0, function ($q) use($officer_id) {
            return $q->where('officer_id', '=', $officer_id);
        })->get();

        return response()->json([
            'success' => true,
            'error_code' => null,
            'message' => 'Messages listed successfully!',
            'data' => $notices,
        ]);
    }

    public function store(Request $request)
    {
        //return $request->all();
        DB::beginTransaction();

        try {

            if($request->message_id) {
                $message = Message::find($request->message_id);
                $msg = "Updated successfully!";


            }else{


                $message = new Message();
                $msg = "Saved successfully!";
            }


            $message->officer_id = $request->officer_id;
            $message->message_title = $request->message_title;
            $message->message = $request->message;
            $message->created_by = auth()->user()->id;


            if ($request->hasFile('image')) {
                $file = $request->file('image');
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
                $filePath = Config::get('uploadconfig.MESSAGE_FILE') .'_'.  $name;
                Storage::disk('s3')->put($filePath, file_get_contents($file));
                $message->image = $filePath;
            }

            $message->save();
            DB::commit();

            return CommonHelper::Response(true, $msg, null);

        } catch (Exception $e) {
            DB::rollback();
            return CommonHelper::throwError($e, 'MessageController', 'store', 'ERR_UNKNOWN');
        }
    }

    public function destroy(Request $request)
    {
        $message_id = (int)$request->input('id');

        try {
            $Message = Message::where('id', $message_id);

            if ($Message->exists()) {
                $Message = $Message->first();
//                $Notice->deleted_by = auth()->user()->id;
                $Message->save();
                $Message->delete();
                return CommonHelper::Response(true, 'Message Deleted Successfully!');
            }

            return CommonHelper::Response(false, 'Message not found!', null, null, 404);

        } catch (Exception $e) {
            return CommonHelper::throwError($e, 'MessageController', 'destroy');
        }
    }
}
