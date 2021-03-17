<?php

namespace App\Http\Controllers\BasicSettings;

use App\Helper\CommonHelper;
use App\Http\Controllers\Controller;
use App\Models\BasicSettings;
use Config;
use Error;
use Exception;
use Illuminate\Http\Request;
use Storage;

class BasicSettingsController extends Controller
{
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
            $filePath = Config::get('uploadconfig.BASIC_SETTINGS') .'_'.  $name;
            Storage::disk('s3')->put($filePath, file_get_contents($file));

            return $filePath;
        }

        return false;
    }

    public function getSettings()
    {
        try {
            $settings = BasicSettings::where('id', '=', 1)->first();
            return CommonHelper::Response(true, 'Basic settings fetched successfully!', null, $settings);
        } catch (Exception $e) {
            return CommonHelper::throwError($e, 'BasicSettingsController', 'getSettings', null);
        }
    }

    public function updateSettings(Request $request)
    {
        try {
            $data = [
                'site_title' => $request->site_title,
                'site_sub_title' => $request->site_sub_title,
                'copyright' => $request->copyright,
                'slogan'    => $request->slogan,
            ];
            $header_banner = $this->handleUploadFile($request, 'header_banner');
            $logo1 = $this->handleUploadFile($request, 'logo1');
            $logo2 = $this->handleUploadFile($request, 'logo2');
            if($header_banner) {
                $data['header_banner'] = $header_banner;
            }
            if($logo1) {
                $data['logo1'] = $logo1;
            }
            if($logo2) {
                $data['logo2'] = $logo2;
            }

            $basic_settings = BasicSettings::where('id', '=', 1);
            if ($basic_settings->exists()) {
                $basic_settings->update($data);
            } else {
                $data['id'] = 1;
                BasicSettings::insert($data);
            }

            return CommonHelper::Response(true, 'Saved successfully!');

        } catch (Exception $e) {
            return CommonHelper::throwError($e, 'BasicSettingsController', 'updateSettings', null);
        }
    }
}
