<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\indexController;
use App\Http\Controllers\portfolioController;
use App\Http\Controllers\serviceController;
use App\Http\Controllers\starterController;

Route::get('/', [indexController::class, 'index'])->name('index');
Route::get('/portfolio', [portfolioController::class, 'index'])->name('portfolio');
Route::get('/services', [serviceController::class, 'index'])->name('services');
Route::get('/starter', [starterController::class, 'index'])->name('starter');
