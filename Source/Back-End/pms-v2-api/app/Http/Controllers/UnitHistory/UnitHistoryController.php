<?php

namespace App\Http\Controllers\UnitHistory;

use App\Helper\CommonHelper;
use App\Models\BasicSettings;
use \App\Models\UnitHistory;
use App\Http\Controllers\Controller;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Storage;

class UnitHistoryController extends Controller
{
    public function GetUnitHistory() {
        try {
            $unit_history = UnitHistory::skip(0)->take(1)->orderBy('id', 'desc')->first();
            return response()->json([
                'success' => true,
                'error_code' => null,
                'message' => 'Unit history fetched successfully!',
                'data' => $unit_history,
            ]);
        } catch (Exception $exception) {
            return response()->json([
                'success' => false,
                'error_code' => 'UNKNOWN_ERROR',
                'message' => 'Failed to fetch unit history! ' . $exception->getMessage(),
            ]);
        }
    }

    protected function handleUploadFile($request, $key)
    {
        if ($request->hasFile($key)) {
            $file = $request->file($key);
            $extension = (string)$file->extension();

            $continue = false;
            foreach (Config::get('fileextensions.ACCEPTED_FILE_EXTENSIONS') as $afe) {
                if ($extension == $afe) {
                    $continue = true;
                }
            }

            if (!$continue) {
                throw new Error('Unsupported File Type!', 'UNSUPPORTED_FILE_TYPE');
            }

            $name = time() . '_' . $file->getClientOriginalName();
            $filePath = Config::get('uploadconfig.UNIT_HISTORY') .'_'.  $name;
            Storage::disk('s3')->put($filePath, file_get_contents($file));

            return $filePath;
        }

        return false;
    }

    public function getUnitHistorys()
    {
        try {
            $unitHistory = UnitHistory::where('id', '=', 1)->first();
            return CommonHelper::Response(true, 'Basic settings fetched successfully!', null, $unitHistory);
        } catch (Exception $e) {
            return CommonHelper::throwError($e, 'UnitHistoryController', 'getUnitHistorys', null);
        }
    }

    public function updateUnitHistory(Request $request)
    {
        try {
            $data = [
                'bangla_date' => $request->bangla_date,
                'title' => $request->title,
                'description' => $request->description,
            ];
            $image = $this->handleUploadFile($request, 'image');

            if($image) {
                $data['image'] = $image;
            }

            $unit_history = UnitHistory::where('id', '=', 1);
            if ($unit_history->exists()) {
                $unit_history->update($data);
            } else {
                $data['id'] = 1;
                UnitHistory::insert($data);
            }

            return CommonHelper::Response(true, 'Saved successfully!');

        } catch (Exception $e) {
            return CommonHelper::throwError($e, 'BasicSettingsController', 'updateUnitHistory', null);
        }
    }
}
