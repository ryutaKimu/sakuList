<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{

    public function index()
    {
        // ログイン後に表示する画面の実装
        return new JsonResponse(['message' => "テスト"]);
    }

    public function login(Request $request)
    {
        $credential = $request->only('email', 'password');
        if (!Auth::guard('admin')->attempt($credential, true)) {
            return new JsonResponse(['message' => "ログイン失敗"], 401);
        }

        return new JsonResponse(['message' => 'ログイン成功'], 200);
    }
}
