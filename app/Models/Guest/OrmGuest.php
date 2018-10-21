<?php

namespace App\Models\Guest;

use Illuminate\Database\Eloquent\Model;
use App\Contracts\Guest\Guest;
use Illuminate\Http\Request;
use Validator;
use Auth;

class OrmGuest extends Model implements Guest
{
    protected $table = 'guests';

    /**
     * Gets all guests
     *
     * @return collection
     */
    public function getAll()
    {
        return self::where('user_id', Auth::user()->id)
                    ->orderBy('id', 'desc')
                    ->get();
    }

    /**
     * Validates info about before create guest
     *
     * @param  Request $request
     * @return \Illuminate\Contracts\Validation\Validator
     */
    public function validateGuest(Request $request)
    {
        return Validator::make($request->all(), [
            'name' => 'required|min:2|max:50',
            'surname' => 'required|min:2|max:50',
            'access_code' => 'required|min:2|max:255'
        ])->validate();
    }

    /**
     * Saves guest to db
     *
     * @param Request $request
     * @return void
     */
    public function create(Request $request)
    {
        $this->validateGuest($request);

        $this->user_id = Auth::user()->id;
        $this->name = $request->name;
        $this->surname = $request->surname;
        $this->access_code = $request->access_code;

        $this->save();
    }
}