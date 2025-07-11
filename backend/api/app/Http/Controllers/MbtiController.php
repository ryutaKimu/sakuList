<?php

namespace App\Http\Controllers;

use App\Services\MbtiService;
use Illuminate\Http\JsonResponse;

class MbtiController extends Controller
{
    public function __construct(private MbtiService $mbti) {}

    public function getAllMbti()
    {
        $allMbti = $this->mbti->fetchMembersByMbti();
        return new JsonResponse($allMbti, 200);
    }
}
