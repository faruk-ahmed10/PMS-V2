<?php

namespace App\Helper;

use Acolyte\ErrorLog\Helpers\SendMails;

class CommonHelper
{

    public static function Response($success, $message, $errorCode = null, $data = null, $status = 200)
    {
        return response()->json([
            'success' => $success,
            'error_code' => $errorCode,
            'message' => $message,
            'data' => $data,
        ], $status);
    }

    public static function throwError($e, $controllerName, $methodName, $errorCode = null)
    {
        $errorCode = $errorCode === null ? $e->getMessage() : $errorCode;
        SendMails::sendErrorMail($e->getMessage(), null, $controllerName, $methodName, $e->getLine(), $e->getFile(),
            '', '', '', '');

        return self::Response(false, $e->getMessage(), $errorCode);
    }

    private static function __generateZeroes($Length)
    {
        $Length = intval($Length);
        $Zeroes = '';
        for ($i = 1; $i <= $Length; $i++) {
            $Zeroes .= '0';
        }
        return $Zeroes;
    }

    public static function GenerateNewCode($Prefix, $ZeroesLength, $LastIncrement = 0)
    {
        $NewIncrement = $LastIncrement + 1;
        $N_I_LENGTH = strlen($NewIncrement);
        return $Prefix . '' . self::__generateZeroes((int)$ZeroesLength - (int)$N_I_LENGTH) . '' . $NewIncrement;
    }
}
