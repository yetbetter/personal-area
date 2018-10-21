<?php

namespace App\Contracts\Guest;
use Illuminate\Http\Request;

interface Guest
{
    /**
     * Gets all guests
     *
     * @return collection
     */
    public function getAll();
    
    /**
     * Saves guest to db
     *
     * @param Request $request
     * @return void
     */
    public function create(Request $request);
}