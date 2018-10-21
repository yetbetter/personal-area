<?php

Auth::routes();

Route::get('/', 'Site\HomeController@index')->name('home');

Route::resource('guests', 'Site\GuestController');