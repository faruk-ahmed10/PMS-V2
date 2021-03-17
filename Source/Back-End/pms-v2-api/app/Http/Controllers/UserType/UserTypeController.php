<?php

namespace App\Http\Controllers\UserType;

use App\Helper\CommonHelper;
use App\Http\Controllers\Controller;
use App\Models\UserType;
use Exception;
use Illuminate\Http\Request;

class UserTypeController extends Controller
{
    public function getUserTypes() {
        try {
            $user_roles = UserType::all();
            return CommonHelper::Response(true, 'User types fetched successfully!', null, $user_roles);
        } catch (Exception $e) {
            return CommonHelper::throwError($e, 'UserTypeController', 'getUserTypes', null);
        }
    }
}
