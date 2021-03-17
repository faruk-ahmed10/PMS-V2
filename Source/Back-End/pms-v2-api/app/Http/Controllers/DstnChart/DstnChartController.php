<?php

namespace App\Http\Controllers\DstnChart;

use App\Helper\CommonHelper;
use App\Http\Controllers\Controller;
use App\Models\DstnChart;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class DstnChartController extends Controller
{
    public function index(Request $request)
    {
        $RowsPerPage = (int)$request->input('RowsPerPage');
        $PageNumber = (int)$request->input('PageNumber') < 1 ? 1 : (int)$request->input('PageNumber');


        try {

            $dstn_chart = DstnChart::where('id', '!=', 0);

            $TotalRows = $dstn_chart->count();
            $TotalPages = ceil((int)$TotalRows / $RowsPerPage);
            $Offset = ((int)$PageNumber - 1) * $RowsPerPage;
            $PrevPage = (int)$PageNumber > 1 ? ((int)$PageNumber - 1) : 0;
            $NextPage = (int)$PageNumber < $TotalPages ? ((int)$PageNumber + 1) : 0;
            $LastPage = (int)$PageNumber == $TotalPages ? 0 : $TotalPages;

            $dstn_chart = $dstn_chart->with('user')->with('project')->skip($Offset)->take($RowsPerPage)->get();

            return CommonHelper::Response(true, 'Message list fetched successfully!', null, [
                'TotalRows' => $TotalRows,
                'TotalPages' => $TotalPages,
                'PrevPage' => $PrevPage,
                'NextPage' => $NextPage,
                'LastPage' => $LastPage,
                'ListData' => $dstn_chart,
            ]);

        } catch (Exception $e) {
            return CommonHelper::throwError($e, 'DstnChartController', 'index', 'ERR_UNKNOWN');
        }

    }

    public function GetDstnChart() {

        try {
            $DstnChart = DstnChart::where('id', '=', 1);

            if($DstnChart->exists()) {
                return response()->json([
                    'success' => true,
                    'error_code' => null,
                    'message' => 'Dsatn Cart Image Fetched successfully!',
                    'data' => $DstnChart->first(),
                ]);
            }

            return response()->json([
                'success' => true,
                'error_code' => null,
                'message' => 'No data found for dstn chart!',
            ]);

        } catch (Exception $exception) {
            return response()->json([
                'success' => false,
                'error_code' => 'UNKNOWN_ERROR',
                'message' => 'Failed to fetch the dstn chart! ' . $exception->getMessage(),
            ]);
        }
    }

    public function store(Request $request)
    {
        //return $request->all();
        DB::beginTransaction();

        try {

            if($request->Dstn_id) {
                $dstnChart = DstnChart::find($request->Dstn_id);
                $msg = "Updated successfully!";


            }else{


                $dstnChart = new DstnChart();
                $msg = "Saved successfully!";
            }


            $dstnChart->project_id = $request->Project_id;
            $dstnChart->created_by = auth()->user()->id;


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
                $filePath = Config::get('uploadconfig.DSTN_FILE') .'_'.  $name;
                Storage::disk('s3')->put($filePath, file_get_contents($file));
                $dstnChart->image = $filePath;
            }

            $dstnChart->save();
            DB::commit();

            return CommonHelper::Response(true, $msg, null);

        } catch (Exception $e) {
            DB::rollback();
            return CommonHelper::throwError($e, 'MessageController', 'store', 'ERR_UNKNOWN');
        }
    }

    public function show($id)
    {
        try {
            $dstn = DstnChart::where('id', '=', $id)->with('user')->first();

            if ($dstn) {
                return CommonHelper::Response(true, 'Dstn Chart fetched successfully!', null, $dstn);
            }

            return CommonHelper::Response(false, 'Dstn Chart not found!', null, null, 404);
        } catch (Exception $e) {
            return CommonHelper::throwError($e, 'DstnChartController', 'show');
        }
    }

    public function destroy(Request $request)
    {
        $dstn_id = (int)$request->input('id');

        try {
            $Dstn = DstnChart::where('id', $dstn_id);

            if ($Dstn->exists()) {
                $Dstn = $Dstn->first();
//                $Notice->deleted_by = auth()->user()->id;
                $Dstn->save();
                $Dstn->delete();
                return CommonHelper::Response(true, 'DSTN Chart Deleted Successfully!');
            }

            return CommonHelper::Response(false, 'DSTN Chart not found!', null, null, 404);

        } catch (Exception $e) {
            return CommonHelper::throwError($e, 'DstnChartController', 'destroy');
        }
    }
}
