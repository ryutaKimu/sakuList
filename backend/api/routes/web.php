<?php

use App\Http\Controllers\Admin\AuthController;
use App\Http\Controllers\Admin\DashBoardController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});
