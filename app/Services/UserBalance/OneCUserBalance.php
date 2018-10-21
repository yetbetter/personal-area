<?php

namespace App\Services\UserBalance;

use App\Contracts\UserBalance\UserBalance;
use Carbon\Carbon;
use SoapClient;
use Auth;

class OneCUserBalance implements UserBalance
{
    private $host = 'http://80.254.115.133:7080';
    private $login = 'login';
    private $password = 'password';

    /**
     * Connects with 1C server
     *
     * @param string $url path for connect
     * @return object
     */
    public function connect(string $url)
    {
        $options = array(
            'login' => $this->login,
            'password' => $this->password,
            'soap_version'   => SOAP_1_2,
            'cache_wsdl'     => WSDL_CACHE_NONE,
            'exceptions'     => true,
            'trace'          => 1
        );

        return new SoapClient($url, $options);
    }

    /**
     * Gets user settings
     *
     * @return array
     */
    public function getUserSettings()
    {
        return array(
            'IdAccount' => Auth::user()->invoice_num,
            'StartPeriod' => Carbon::now()->startOfMonth()->timestamp, 
            'EndPeriod' => Carbon::now()->endOfMonth()->timestamp
        );
    }

    /**
     * Gets user balance
     *
     * @return object
     */
    public function get()
    {  
        $url = $this->host . '/oookp_Donskoy/ws/inpk.1cws?wsdl';

        // Working only with correct login and password
        $connect = $this->connect($url);

        $userSettings = $this->getUserSettings();

        // GetClientBalance function from 1C
        $balance = $connect->GetClientBalance($userSettings);

        return json_decode($balance);
    }
}