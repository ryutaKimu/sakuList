<?php

use App\Http\Controllers\MembersController;
use Illuminate\Support\Facades\Route;

Route::get('/members/mbti/{mbtiCode}', [MembersController::class, 'searchMemberByMbti']);
Route::get('/member/{id}', [MembersController::class, 'displayMemberDetail']);
Route::get('/members/generation/{generation}', [MembersController::class, 'searchMembersByGeneration']);
