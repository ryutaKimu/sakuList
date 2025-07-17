<?php

use App\Http\Controllers\Admin\AuthController;
use App\Http\Controllers\Admin\DashBoardController;
use App\Http\Controllers\GenerationController;
use App\Http\Controllers\MbtiController;
use App\Http\Controllers\MembersController;
use Illuminate\Support\Facades\Route;

Route::get('/members/mbti/{mbtiCode}', [MembersController::class, 'searchMemberByMbti']);
Route::get('/member/{id}', [MembersController::class, 'displayMemberDetail']);
Route::get('/members/generation/{generation}', [MembersController::class, 'searchMembersByGeneration']);

Route::get('/generation', [GenerationController::class, 'getAllGeneration']);
Route::get('/mbti', [MbtiController::class, 'getAllMbti']);

Route::prefix('admin')->group(function () {
  Route::post('/login', [AuthController::class, 'login'])->name('login');
  Route::middleware(['auth:admin'])->group(function () {
    Route::get('/member/detail/{id}', [DashBoardController::class, 'displayDetailMembers']);
    Route::post('/dashboard', [DashBoardController::class, 'post']);
    Route::put('/dashboard/member/{id}', [DashBoardController::class, 'updateMemberInfo']);
  });
});
