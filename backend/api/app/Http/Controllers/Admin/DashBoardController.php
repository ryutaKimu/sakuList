<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Img;
use App\Models\Member;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DashBoardController extends Controller
{
    public function post(Request $request)
    {
        if (!Auth::check()) {
            return response()->json(['message' => '未認証です'], 401);
        }
        $requests = $request->all();
        $member = Member::create($requests);
        $fileName = $request->file('image')->getClientOriginalName();
        $path = $request->file('image')->storeAs('members', $fileName,  'public');

        Img::create([
            'member_id' => $member->id,
            'img_path' => 'storage/' . $path
        ]);

        return new JsonResponse(['message' => '登録成功']);
    }
}
