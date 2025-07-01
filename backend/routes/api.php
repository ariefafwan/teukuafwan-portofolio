<?php

use App\Http\Controllers\Api\EducationController;
use App\Http\Controllers\Api\HomeController;
use App\Http\Controllers\Api\MainSkillController;
use App\Http\Controllers\Api\ProfileController;
use App\Http\Controllers\Api\ProjectController;
use App\Http\Controllers\Api\SkillController;
use App\Http\Controllers\Auth\AuthController;
use Illuminate\Support\Facades\Route;

Route::get('/home', [HomeController::class, 'index']);

Route::prefix('auth')->group(function () {
    Route::post('login', [AuthController::class, 'login']);
    // Route::post('register', [AuthController::class, 'register'])->name('register');
    Route::post('logout', [AuthController::class, 'logout']);

    Route::middleware('auth:sanctum')->group(function () {
        Route::group(['prefix' => 'profile', 'as' => 'profile.'], function () {
            Route::get('/', [ProfileController::class, 'index']);
            Route::post('/update', [ProfileController::class, 'update']);
        });
        Route::group(['prefix' => 'education', 'as' => 'education.'], function () {
            Route::get('/', [EducationController::class, 'index']);
            Route::post('/store', [EducationController::class, 'store']);
            Route::post('/update/{uuid}', [EducationController::class, 'update']);
            Route::delete('/delete/{uuid}', [EducationController::class, 'destroy']);
        });
        Route::group(['prefix' => 'skill', 'as' => 'skill.'], function () {
            Route::get('/', [SkillController::class, 'index']);
            Route::post('/store', [SkillController::class, 'store']);
            Route::post('/update/{uuid}', [SkillController::class, 'update']);
            Route::delete('/delete/{uuid}', [SkillController::class, 'destroy']);
        });
        Route::group(['prefix' => 'main-skill', 'as' => 'main-skill.'], function () {
            Route::get('/', [MainSkillController::class, 'index']);
            Route::post('/store', [MainSkillController::class, 'store']);
            Route::post('/update/{uuid}', [MainSkillController::class, 'update']);
            Route::delete('/delete/{uuid}', [MainSkillController::class, 'destroy']);
        });
        Route::group(['prefix' => 'project', 'as' => 'project.'], function () {
            Route::get('/', [ProjectController::class, 'index']);
            Route::post('/store', [ProjectController::class, 'store']);
            Route::get('/show/{slug}', [ProjectController::class, 'show']);
            Route::post('/update/{uuid}', [ProjectController::class, 'update']);
            Route::delete('/delete/{uuid}', [ProjectController::class, 'destroy']);
        });

        Route::post('refresh-token', [AuthController::class, 'refresh']);
    });
});
