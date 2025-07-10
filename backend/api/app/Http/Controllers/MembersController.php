<?php

namespace App\Http\Controllers;

use App\Http\Resources\MemberResource;
use App\Models\Member;
use App\Services\MemberService;
use Illuminate\Http\JsonResponse;

class MembersController extends Controller
{
    public function __construct(private MemberService $memberService) {}

    /**
     * @param int $id
     * @return JsonResponse
     */

    public function searchMembersByGeneration(int $id): JsonResponse
    {
        $members = $this->memberService->searchMembersByGeneration($id);
        $formatResponseData = MemberResource::collection(($members));
        return new JsonResponse($formatResponseData, 200, [], JSON_UNESCAPED_UNICODE);
    }

    /**
     * @param int $id
     * @return JsonResponse
     */

    public function displayMemberDetail(int $id): JsonResponse
    {
        $member = $this->memberService->displayMemberDetail($id);
        $formatResponseData = MemberResource::collection($member);
        return new JsonResponse($formatResponseData, 200, [], JSON_UNESCAPED_UNICODE);
    }

    /**
     * @param string $mbtiCode
     * @return JsonResponse
     */

    public function searchMemberByMbti(string $mbtiCode): JsonResponse
    {
        $members = $this->memberService->searchMemberByMbti($mbtiCode);
        $formatResponseData = MemberResource::collection($members);
        return new JsonResponse($formatResponseData, 200, [], JSON_UNESCAPED_UNICODE);
    }
}
