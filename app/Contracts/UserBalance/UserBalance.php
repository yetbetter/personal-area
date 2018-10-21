<?php

namespace App\Contracts\UserBalance;

interface UserBalance
{
    /**
     * Gets user balance
     *
     * @return object
     */
    public function get();
}