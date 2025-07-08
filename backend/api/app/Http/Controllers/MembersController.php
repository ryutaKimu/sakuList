<?php

namespace App\Http\Controllers;

use App\Http\Resources\MemberResource;
use App\Models\Img;
use App\Models\Member;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class MembersController extends Controller
{
    /**
     * @param int $id
     * @return JsonResponse
     */

    public function searchMembersByGeneration(int $id): JsonResponse
    {
        $query = Member::with(['generation', 'mbti', 'imgs']);

        //全ての期生を表示
        if ($id === Member::GENERATION_ALL) {
            $query
                ->orderBy('generation_id', 'asc')
                ->orderBy('furigana', 'asc');
        } elseif ($id === Member::GENERATION_GRADUATED) {
            //期生順に卒業生のみ表示
            $query
                ->where('graduated', true)
                ->orderBy('generation_id', 'asc')
                ->orderBy('furigana', 'asc');
        } else {
            $query
                ->where('generation_id', $id)
                ->orderBy('furigana', 'asc');
        }

        //存在しない期生を入力された場合のバリデーションも検討

        $members = $query->get();
        $formatResponseData = MemberResource::collection($members);
        return new JsonResponse($formatResponseData, 200, [], JSON_UNESCAPED_UNICODE);
    }

    /**
     * @param int $id
     * @return JsonResponse
     */

    public function displayMemberDetail(int $id): JsonResponse
    {
        $member = Member::find($id);
        $formatResponseData = MemberResource::collection($member);
        return new JsonResponse($formatResponseData, 200, [], JSON_UNESCAPED_UNICODE);
    }

    /**
     * @param string $mbtiCode
     * @return JsonResponse
     */

    public function searchMemberByMbti(string $mbtiCode): JsonResponse
    {
        $query = Member::with(['imgs', 'generation', 'mbti']);
        if ($mbtiCode === Member::MBTI_ALL) {
            $query->orderBy('generation_id', 'asc')->orderBy('furigana', 'asc');
        } else {
            $query->whereHas('mbti', function ($q) use ($mbtiCode) {
                $q->where('mbti_code', $mbtiCode);
            })
                ->orderBy('furigana', 'asc');
        }

        $members = $query->get();
        $formatResponseData = MemberResource::collection($members);
        return new JsonResponse($formatResponseData, 200, [], JSON_UNESCAPED_UNICODE);
    }
}
