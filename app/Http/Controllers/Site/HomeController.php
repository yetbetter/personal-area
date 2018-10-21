<?php

namespace App\Http\Controllers\Site;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Contracts\UserBalance\UserBalance;
use Illuminate\Support\Collection;

class HomeController extends Controller
{
    protected $userBalance;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct(UserBalance $userBalance)
    {
        $this->middleware('auth');
        $this->userBalance = $userBalance;
    }

    /**
     * Home page user account
     *
     * @return html view with data
     */
    public function index()
    {
        $balance = $this->userBalance->get();
        return view('home', compact('balance'));
    }
}
