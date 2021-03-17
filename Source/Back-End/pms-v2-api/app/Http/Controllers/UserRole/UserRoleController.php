<?php

namespace App\Http\Controllers\UserRole;

use App\Helper\CommonHelper;
use App\Http\Controllers\Controller;
use App\Models\UserRole;
use Illuminate\Http\Request;

class UserRoleController extends Controller
{
    public function getUserRoles() {
        try {
            $user_roles = UserRole::all();
            return CommonHelper::Response(true, 'User roles fetched successfully!', null, $user_roles);
        } catch (\Exception $e) {
            return CommonHelper::throwError($e, 'UserRoleController', 'getUserRoles', null);
        }
    }
}
