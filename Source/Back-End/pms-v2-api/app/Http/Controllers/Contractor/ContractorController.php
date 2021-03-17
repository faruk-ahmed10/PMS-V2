<?php

namespace App\Http\Controllers\Contractor;

use App\Helper\CommonHelper;
use App\Http\Controllers\Controller;
use App\Models\Contractor;
use App\Models\User;
use Config;
use Exception;
use Hash;
use Illuminate\Http\Request;
use Storage;
use DB;

class ContractorController extends Controller
{
    public function index(Request $request)
    {
        $RowsPerPage = (int)$request->input('RowsPerPage');
        $PageNumber = (int)$request->input('PageNumber') < 1 ? 1 : (int)$request->input('PageNumber');


        try {

            $contractors = Contractor::where('id', '!=', 0);

            $TotalRows = $contractors->count();
            $TotalPages = ceil((int)$TotalRows / $RowsPerPage);
            $Offset = ((int)$PageNumber - 1) * $RowsPerPage;
            $PrevPage = (int)$PageNumber > 1 ? ((int)$PageNumber - 1) : 0;
            $NextPage = (int)$PageNumber < $TotalPages ? ((int)$PageNumber + 1) : 0;
            $LastPage = (int)$PageNumber == $TotalPages ? 0 : $TotalPages;

            $contractors = $contractors->with('user')->skip($Offset)->take($RowsPerPage)->get();

            return CommonHelper::Response(true, 'Contractor list fetched successfully!', null, [
                'TotalRows' => $TotalRows,
                'TotalPages' => $TotalPages,
                'PrevPage' => $PrevPage,
                'NextPage' => $NextPage,
                'LastPage' => $LastPage,
                'ListData' => $contractors,
            ]);

        } catch (Exception $e) {
            return CommonHelper::throwError($e, 'ContractorController', 'index', 'ERR_UNKNOWN');
        }

    }

    public function getContractorsNoLimit(Request $request) {
        try {
            $contractors = Contractor::with('user')->get();

            foreach ($contractors as $contractor) {
                $contractor->name = $contractor->user->name;
            }

            return CommonHelper::Response(true, 'Contractors fetched successfully!', null, $contractors);
        } catch (Exception $e) {
            return CommonHelper::throwError($e, 'ContractorController', 'getContractors', null);
        }
    }

    public function getContractors(Request $request) {
        try {
            $contractors = Contractor::whereHas('projects', function ($query) use ($request) {
                if ($request->project_id) {
                    return $query->where('project_id', $request->project_id);
                }
            })->with('user')->get();

            foreach ($contractors as $contractor) {
                $contractor->name = $contractor->user->name;
            }

            return CommonHelper::Response(true, 'Contractors fetched successfully!', null, $contractors);
        } catch (Exception $e) {
            return CommonHelper::throwError($e, 'ContractorController', 'getContractors', null);
        }
    }

    public function getContractorList(Request $request) {
        try {
            $contractors = Contractor::with('user')->get();

            foreach ($contractors as $contractor) {
                $contractor->name = $contractor->user->name;
            }

            return CommonHelper::Response(true, 'Contractors fetched successfully!', null, $contractors);
        } catch (Exception $e) {
            return CommonHelper::throwError($e, 'ContractorController', 'getContractors', null);
        }
    }


    public function show($id)
    {
        try {
            $contractor = Contractor::where('id', '=', $id)->with('user')->first();

            if ($contractor) {
                return CommonHelper::Response(true, 'Contractor fetched successfully!', null, $contractor);
            }

            return CommonHelper::Response(false, 'Contractor not found!', null, null, 404);
        } catch (Exception $e) {
            return CommonHelper::throwError($e, 'ContractorController', 'show');
        }
    }

    public function store(Request $request)
    {
        DB::beginTransaction();
        try {
            if (!$request->contractor_id) {

                $user = new User();
                $contractor = new Contractor();
                $msg = "Saved successfully!";
            } else {
                $contractor = Contractor::find($request->contractor_id);
                $msg = "Updated successfully!";

                $user = User::find($contractor->user_id);
            }

            $user->name = $request->name;
            $user->email = $request->email;
            $user->password = Hash::make(time());
            $user->user_type_id = $request->user_type_id;
            $user->role_id = $request->user_role_id;
            if($request->status && $request->status!='null' && $request->status!=null ){
                $user->status = $request->status;
            }else{
                $user->status = 'Active';
            }
            $user->save();
            $user_id = $user->id;

            $contractor->user_id = $user_id;
            $contractor->owner_name = $request->owner_name;
            $contractor->it = $request->it;
            $contractor->owner_nid = $request->owner_nid;
            $contractor->phone = $request->phone;
            $contractor->tin = $request->tin;
            $contractor->address = $request->address;
            if($request->status && $request->status!='null' && $request->status!=null ){
                $contractor->status = $request->status;
            }else{
                $contractor->status = 'Active';
            }

            $contractor->created_by = auth()->user()->id;

            if ($request->hasFile('license')) {
                $license = $request->file('license');
                $extension = (string)$license->extension();

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

                $name = time() . '.' . $license->getClientOriginalName();
                $filePath = Config::get('uploadconfig.CONTRACTOR_LICENSE') .'_'.  $name;
                Storage::disk('s3')->put($filePath, file_get_contents($license));
                $contractor->license = $filePath;
            }

            $contractor->save();
            DB::commit();

            return CommonHelper::Response(true, $msg, null);
        } catch (Exception $e) {
            DB::rollback();
            return CommonHelper::throwError($e, 'ContractorController', 'store', 'ERR_UNKNOWN');
        }
    }

    public function destroy(Request $request)
    {
        $contractor_id = (int)$request->input('id');

        try {
            $Contractor = Contractor::where('id', $contractor_id);

            if ($Contractor->exists()) {
                $Contractor = $Contractor->first();
                $Contractor->deleted_by = auth()->user()->id;
                $Contractor->save();
                $Contractor->delete();
                return CommonHelper::Response(true, 'Contractor Deleted Successfully!');
            }

            return CommonHelper::Response(false, 'Contractor not found!', null, null, 404);

        } catch (Exception $e) {
            return CommonHelper::throwError($e, 'ContractorController', 'destroy');
        }
    }
}
