<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\AdminResource;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{


    public function login(Request $request)
    {
        //これがないと、メンバー登録時にセッションが何度も発行される。
        if (Auth::guard('admin')->check()) {
            return new JsonResponse(['message' => 'すでにログイン済みです'], 200);
        }

        $credential = $request->only('email', 'password');
        if (!Auth::guard('admin')->attempt($credential, true)) {
            return new JsonResponse(['message' => "ログイン失敗"], 401);
        }

        $admin = Auth::guard('admin')->user();
        $request->session()->regenerate();
        return new JsonResponse(['message' => 'ログイン成功', 'user' => new AdminResource($admin)], 200);
    }
}
