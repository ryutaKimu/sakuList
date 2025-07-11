<?php

use App\Http\Controllers\GenerationController;
use App\Http\Controllers\MbtiController;
use App\Http\Controllers\MembersController;
use Illuminate\Support\Facades\Route;

Route::get('/members/mbti/{mbtiCode}', [MembersController::class, 'searchMemberByMbti']);
Route::get('/member/{id}', [MembersController::class, 'displayMemberDetail']);
Route::get('/members/generation/{generation}', [MembersController::class, 'searchMembersByGeneration']);

Route::get('/generation', [GenerationController::class, 'getAllGeneration']);
Route::get('/mbti', [MbtiController::class, 'getAllMbti']);
