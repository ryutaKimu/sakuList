<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\MemberResource;
use App\Services\DashBoardService;
use App\Services\MemberService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DashBoardController extends Controller
{
    public function __construct(
        private MemberService $memberService,
        private DashBoardService $dashBoarService
    ) {}

    public function displayDetailMembers(int $id)
    {
        $member = $this->memberService->searchMember($id);
        $formattedData = new MemberResource($member);

        return response()->json($formattedData, 200);
    }

    public function post(Request $request)
    {
        if (!Auth::check()) {
            return response()->json(['message' => '未認証です'], 401);
        }

        $this->dashBoarService->createMember($request);
        return response()->json(['message' => '登録成功']);
    }

    public function updateMemberInfo($id, Request $request)
    {
        $member = $this->dashBoarService->updateMember($id, $request);

        return response()->json([
            'message' => 'Member updated successfully',
            'member' => $member,
        ]);
    }
}
