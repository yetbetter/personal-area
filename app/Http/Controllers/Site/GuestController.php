<?php

namespace App\Http\Controllers\Site;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Contracts\Guest\Guest;
use Auth;

class GuestController extends Controller
{
    protected $guest;
    
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct(Guest $guest)
    {
        $this->middleware('auth');
        $this->guest = $guest;
    }

    /**
     * Display a listing of the resource.
     *
     * @return html view
     */
    public function index()
    {
        $guests = $this->guest->getAll();
        return view('site.guest', compact('guests'));
    }

    /**
     * Store a newly created resource in storage
     *
     * @param  Request $request
     * @return redirect back
     */
    public function store(Request $request)
    {
        $this->guest->create($request);
        return back();
    }
}
