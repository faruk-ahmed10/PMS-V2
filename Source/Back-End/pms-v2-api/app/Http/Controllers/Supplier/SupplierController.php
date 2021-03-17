<?php

namespace App\Http\Controllers\Supplier;

use App\Helper\CommonHelper;
use App\Http\Controllers\Controller;
use App\Models\Supplier;
use App\Models\User;
use Config;
use Exception;
use Hash;
use Illuminate\Http\Request;
use Storage;
use DB;

class SupplierController extends Controller
{
    public function index(Request $request)
    {
        $RowsPerPage = (int)$request->input('RowsPerPage');
        $PageNumber = (int)$request->input('PageNumber') < 1 ? 1 : (int)$request->input('PageNumber');


        try {

            $suppliers = Supplier::where('id', '!=', 0);

            $TotalRows = $suppliers->count();
            $TotalPages = ceil((int)$TotalRows / $RowsPerPage);
            $Offset = ((int)$PageNumber - 1) * $RowsPerPage;
            $PrevPage = (int)$PageNumber > 1 ? ((int)$PageNumber - 1) : 0;
            $NextPage = (int)$PageNumber < $TotalPages ? ((int)$PageNumber + 1) : 0;
            $LastPage = (int)$PageNumber == $TotalPages ? 0 : $TotalPages;

            $suppliers = $suppliers->with('user')->skip($Offset)->take($RowsPerPage)->get();

            return CommonHelper::Response(true, 'Supplier list fetched successfully!', null, [
                'TotalRows' => $TotalRows,
                'TotalPages' => $TotalPages,
                'PrevPage' => $PrevPage,
                'NextPage' => $NextPage,
                'LastPage' => $LastPage,
                'ListData' => $suppliers,
            ]);

        } catch (Exception $e) {
            return CommonHelper::throwError($e, 'SupplierController', 'index', 'ERR_UNKNOWN');
        }

    }

    public function getSuppliers() {
        try {
            $suppliers = Supplier::with('user')->get();

            foreach ($suppliers as $supplier) {
                $supplier->name = $supplier->user->name;
            }

            return CommonHelper::Response(true, 'Suppliers fetched successfully!', null, $suppliers);
        } catch (Exception $e) {
            return CommonHelper::throwError($e, 'SupplierController', 'getSuppliers', null);
        }
    }

    public function show($id)
    {
        try {
            $supplier = Supplier::where('id', '=', $id)->with('user')->first();

            if ($supplier) {
                return CommonHelper::Response(true, 'Supplier fetched successfully!', null, $supplier);
            }

            return CommonHelper::Response(false, 'Supplier not found!', null, null, 404);
        } catch (Exception $e) {
            return CommonHelper::throwError($e, 'SupplierController', 'show');
        }
    }

    public function store(Request $request)
    {
        DB::beginTransaction();
        try {
            if (!$request->supplier_id) {

                $user = new User();
                $supplier = new Supplier();
                $msg = "Saved successfully!";
            } else {
                $supplier = Supplier::find($request->supplier_id);
                $msg = "Updated successfully!";
                $user = User::find($supplier->user_id);
            }
            $user->name = $request->name;
            $user->email = $request->email;
            $user->password = Hash::make(time());
            $user->user_type_id = $request->user_type_id;
            $user->role_id = $request->user_role_id;
            $user->status = $request->status?$request->status:'Active';
            $user->save();
            $user_id = $user->id;

            $supplier->user_id = $user_id;
            $supplier->owner_name = $request->owner_name;
            $supplier->it = $request->it;
            $supplier->owner_nid = $request->owner_nid;
            $supplier->phone = $request->phone;
            $supplier->tin = $request->tin;
            $supplier->address = $request->address;
            $supplier->status = $request->status?$request->status:'Active';
            $supplier->created_by = auth()->user()->id;

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
                $filePath = Config::get('uploadconfig.Supplier_LICENSE') .'_'.  $name;
                Storage::disk('s3')->put($filePath, file_get_contents($license));
                $supplier->license = $filePath;
            }

            $supplier->save();
            DB::commit();

            return CommonHelper::Response(true, $msg, null);
        } catch (Exception $e) {
            DB::rollback();
            return CommonHelper::throwError($e, 'SupplierController', 'store', 'ERR_UNKNOWN');
        }
    }

    public function destroy(Request $request)
    {
        $supplier_id = (int)$request->input('id');

        try {
            $supplier = Supplier::where('id', $supplier_id);

            if ($supplier->exists()) {
                $supplier = $supplier->first();
                $supplier->deleted_by = auth()->user()->id;
                $supplier->save();
                $supplier->delete();
                return CommonHelper::Response(true, 'Supplier Deleted Successfully!');
            }

            return CommonHelper::Response(false, 'Supplier not found!', null, null, 404);

        } catch (Exception $e) {
            return CommonHelper::throwError($e, 'SupplierController', 'destroy');
        }
    }
}
