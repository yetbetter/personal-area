@extends('layouts.app')

@section('content')
    <div class="uk-child-width-1-2@m uk-grid-collapse uk-height-viewport" uk-grid>
    
        <div class="uk-background-cover uk-background-center-center uk-background-cover uk-height-viewport uk-visible@m" style="background-image:url('/img/login/login-bgs.jpg');"></div>

        <div class="uk-background-default uk-flex uk-flex-middle uk-flex-center">
            <div class="uk-width-large@s uk-width-xlarge@l uk-padding uk-child-width-1-1" uk-grid>
                <a href="{{ route('home') }}"><img src="/img/logo/login-donskoy-logo.svg"></a>
                @yield('form')
                <div>
	                <div class="uk-child-width-1-1@m uk-child-width-1-2@l" uk-grid>
	                    <div>
	                        <div class="uk-text-muted uk-text-small uk-margin-bottom">
	                            Если у вас возникли сложности обратитесь по этому телефону:
	                        </div>
	                        <div class="uk-text-lead@m">
	                            <a href="tel:+79381206787">+7 (938) 120-67-87</a>
	                        </div>
	                    </div>
	                    <div class="uk-flex">
	                    	<a href="https://www.in-pk.com/directions/inpk-development" target="_blank"><img src="/img/logo/login-dvlplogo.svg"></a>
	                    </div>
	                </div>
                </div>
            </div>
        </div>
    </div>
@stop