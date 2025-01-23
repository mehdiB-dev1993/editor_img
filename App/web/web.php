<?php
use App\Classes\Routing\Route;


Route::get('/', 'HomeController@index');
Route::post('/store', 'HomeController@store');

