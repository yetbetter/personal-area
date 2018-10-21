@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row">
        <div class="col-md-8 col-md-offset-2">
            <div class="panel panel-default">
                <div class="panel-heading">State invoice</div>
                <div class="panel-body">
                    <div>Balance: {{ $balance->StartBalance }} </div>
                    <div>Assessed: {{ $balance->Income }} </div>
                    <div>Paid for by: {{ $balance->Outcome }} </div>
                    <div>Current balance: {{ $balance->EndBalance }} </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
