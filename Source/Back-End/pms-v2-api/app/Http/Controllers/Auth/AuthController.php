<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use \Exception;

class AuthController extends Controller
{
    public function attempt(Request $request): object
    {
        $credentials = $request->only(['email', 'password']);

        try {
            if (!$token = auth()->attempt($credentials)) {
                return response()->json([
                    'success' => false,
                    'error_code' => 'CREDENTIALS_ERROR',
                    'message' => 'Your email or password was incorrect!',
                    'token' => null,
                ]);

            }

            return response()->json([
                'success' => true,
                'error_code' => null,
                'message' => 'Authentication successful!',
                'token' => $token,
            ]);
        } catch (Exception $exception) {

            return response()->json([
                'success' => false,
                'error_code' => 'UNKNOWN_ERROR',
                'message' => 'Error occurred! !' . $exception->getMessage(),
            ]);

        }
    }

    public function logout(Request $request) {
        $token = $request->header('Authorization');

        try {
            if(JWTAuth::parseToken()->invalidate($token)) {
                return response()->json([
                    'success' => true,
                    'error_code' => null,
                    'message' => 'Logout successful!',
                ]);
            }
        } catch (Exception $exception) {
            return response()->json([
                'success' => false,
                'error_code' => 'UNKNOWN_ERROR',
                'message' => 'Failed to logout! ' . $exception->getMessage(),
            ]);
        }

        return response()->json([
            'success' => false,
            'error_code' => 'UNKNOWN_ERROR',
            'message' => 'Failed to logout!',
        ]);
    }
}
