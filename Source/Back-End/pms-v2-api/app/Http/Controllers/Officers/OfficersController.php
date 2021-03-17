<?php

namespace App\Http\Controllers\Officers;

use App\Helper\CommonHelper;
use App\Http\Controllers\Controller;
use App\Models\Message;
use App\Models\Officers;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class OfficersController extends Controller
{
    protected function limit_text($text, $limit)
    {
        if (str_word_count($text, 0) > $limit) {
            $words = str_word_count($text, 2);
            $pos = array_keys($words);
            $text = substr($text, 0, $pos[$limit]) . '...';
        }
        return $text;
    }

    public function index(Request $request)
    {
        $Rank = (string)$request->input('Rank');
        $RowsPerPage = (int)$request->input('RowsPerPage');
        $PageNumber = (int)$request->input('PageNumber') < 1 ? 1 : (int)$request->input('PageNumber');
        $Status = (string)$request->input('Status');

        try {

            $officers = Officers::where('id', '!=', 0);

            if($Rank !== '') {
                $officers = $officers->where('type', '=', strtoupper($Rank));
            }

            if($Status !== 'All') {
                $officers = $officers->where('status', '=', $Status);
            }

            $TotalRows = $officers->count();
            $TotalPages = ceil((int)$TotalRows / $RowsPerPage);
            $Offset = ((int)$PageNumber - 1) * $RowsPerPage;
            $PrevPage = (int)$PageNumber > 1 ? ((int)$PageNumber - 1) : 0;
            $NextPage = (int)$PageNumber < $TotalPages ? ((int)$PageNumber + 1) : 0;
            $LastPage = (int)$PageNumber == $TotalPages ? 0 : $TotalPages;

            $officers = $officers->with('user','rank')->skip($Offset)->take($RowsPerPage)->orderBy('position','desc')->get();

            return CommonHelper::Response(true, 'Officers list fetched successfully!', null, [
                'TotalRows' => $TotalRows,
                'TotalPages' => $TotalPages,
                'PrevPage' => $PrevPage,
                'NextPage' => $NextPage,
                'LastPage' => $LastPage,
                'ListData' => $officers,
            ]);

        } catch (Exception $e) {
            return CommonHelper::throwError($e, 'OfficersController', 'index', 'ERR_UNKNOWN');
        }
    }

    public function getOfficersNoLimit()
    {
        try {

            $officers = Officers::with('user','rank')->get();

            return CommonHelper::Response(true, 'Officers list fetched successfully!', null, $officers);

        } catch (Exception $e) {
            return CommonHelper::throwError($e, 'OfficersController', 'index', 'ERR_UNKNOWN');
        }
    }

    public function getOfficers(Request $request)
    {
        $offset = (int)$request->offset;
        $sort = (string)$request->sort;
        $officer_id = (int)$request->officer_id;
        $sort_key = $request->sort_key ? $request->sort_key : 'id';

        try {
            $officers = Officers::when($offset > 0, function ($q) use ($offset) {
                return $q->skip(0)->take((int)$offset);
            })->when($sort != '' && ($sort === 'desc' || $sort === 'asc'), function ($q) use ($sort, $sort_key) {
                return $q->orderBy($sort_key, (string)$sort);
            })->when($officer_id !== 0, function ($q) use ($officer_id) {
                return $q->where('id', '=', $officer_id);
            })->get();

            foreach ($officers as $officer) {
                $messages = Message::where('officer_id', '=', $officer->id)->orderBy('id', 'desc')->get();
                foreach($messages as $message) {
                    $message->short_message = $this->limit_text($message->message, 80);
                }
                $officer->messages = $messages;
            }


            $previous_officers = Officers::where('rank', '=', 'CO')->where('leave_date', '!=', '')->orderBy('id', 'desc')->get();

            $data = [
                'officers' => $officers,
                'previous_officers' => $previous_officers,
            ];

            return response()->json([
                'success' => true,
                'error_code' => null,
                'message' => 'Officers listed successfully!',
                'data' => $data,
            ]);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'error_code' => 'ERR_UNKNOWN',
                'message' => $e->getMessage(),
            ]);
        }
    }

    public function show($id)
    {
        try {
            $officer = Officers::where('id', '=', $id)->with('user','rank')->first();

            if ($officer) {
                return CommonHelper::Response(true, 'Officer fetched successfully!', null, $officer);
            }

            return CommonHelper::Response(false, 'Officer not found!', null, null, 404);
        } catch (Exception $e) {
            return CommonHelper::throwError($e, 'OfficersController', 'show');
        }
    }

    public function store(Request $request)
    {
        DB::beginTransaction();

        try {

            if($request->officer_id) {
                $officer = Officers::find($request->officer_id);
                $msg = "Updated successfully!";


            }else{


                $officer = new Officers();
                $msg = "Saved successfully!";
            }


            $officer->name = $request->name;
            $officer->type = strtoupper($request->type);
            $officer->display_name = $request->display_name;
            $officer->blood_group = $request->blood_group;
            $officer->rank = $request->rank;
            $officer->dob = $request->dob;
            $officer->email = $request->email;
            $officer->phone = $request->phone;
            $officer->unit = $request->unit;
            $officer->marital_status = $request->marital_status;
            $officer->district = $request->district;
            $officer->education_qualification_army = $request->education_qualification_army;
            $officer->bma_long_course = $request->bma_long_course;
            $officer->punishment = $request->punishment;
            $officer->date_of_commission = $request->date_of_commission;
            $officer->trade = $request->trade;
            $officer->army_level_course = $request->army_level_course;
            $officer->education_qualification_civil = $request->education_qualification_civil;
            $officer->brif = $request->brif;
            $officer->join_date = $request->join_date;
            $officer->leave_date = $request->leave_date;
            $officer->message = $request->message;
            $officer->position = $request->position;
            $officer->ba_no = $request->ba_no;
            $officer->appointment = $request->appointment;
            $officer->status = $request->status;
            $officer->created_by = auth()->user()->id;


            if ($request->hasFile('photo')) {
                $file = $request->file('photo');
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
                $filePath = Config::get('uploadconfig.OFFICER_PROFILE_PHOTO') .'_'.  $name;
                Storage::disk('s3')->put($filePath, file_get_contents($file));
                $officer->photo = $filePath;
            }

            $officer->save();
            DB::commit();

            return CommonHelper::Response(true, $msg, null);

        } catch (Exception $e) {
            DB::rollback();
            return CommonHelper::throwError($e, 'OfficersController', 'store', 'ERR_UNKNOWN');
        }
    }

    public function destroy(Request $request)
    {
        $officer_id = (int)$request->input('id');

        try {
            $Officer = Officers::where('id', $officer_id);

            if ($Officer->exists()) {
                $Officer = $Officer->first();
//                $Notice->deleted_by = auth()->user()->id;
                $Officer->save();
                $Officer->delete();
                return CommonHelper::Response(true, 'Officer Deleted Successfully!');
            }

            return CommonHelper::Response(false, 'Officer not found!', null, null, 404);

        } catch (Exception $e) {
            return CommonHelper::throwError($e, 'OfficersController', 'destroy');
        }
    }
}
