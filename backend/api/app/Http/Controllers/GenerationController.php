<?php

namespace App\Http\Controllers;

use App\Services\GenerationService;
use Illuminate\Http\JsonResponse;

class GenerationController extends Controller
{
    public function __construct(private GenerationService $generation) {}

    public function getAllGeneration()
    {
        $all = $this->generation->fetchAllGeneration();
        return new JsonResponse($all, 200);
    }
}
