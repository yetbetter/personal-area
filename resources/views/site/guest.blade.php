@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row">
        <div class="col-md-8 col-md-offset-2">
            <div class="panel panel-default">
                <div class="panel-heading">Creating guest</div>
                <div class="panel-body">
                    <form class="form-horizontal" method="POST" action="{{ route('guests.store') }}">
                        {{ csrf_field() }}

                        <div class="form-group{{ $errors->has('name') ? ' has-error' : '' }}">
                            <label for="name" class="col-md-4 control-label">Name</label>

                            <div class="col-md-6">
                                <input id="name" type="text" class="form-control" name="name" value="{{ old('name') }}"  autofocus>

                                @if ($errors->has('name'))
                                    <span class="help-block">
                                        <strong>{{ $errors->first('name') }}</strong>
                                    </span>
                                @endif
                            </div>
                        </div>

                        <div class="form-group{{ $errors->has('surname') ? ' has-error' : '' }}">
                            <label for="surname" class="col-md-4 control-label">Surname</label>

                            <div class="col-md-6">
                                <input id="surname" type="text" class="form-control" name="surname" >

                                @if ($errors->has('surname'))
                                    <span class="help-block">
                                        <strong>{{ $errors->first('surname') }}</strong>
                                    </span>
                                @endif
                            </div>
                        </div>

                        <div class="form-group{{ $errors->has('access_code') ? ' has-error' : '' }}">
                            <label for="access_code" class="col-md-4 control-label">Access code</label>

                            <div class="col-md-6">
                                <input id="access_code" type="text" class="form-control" name="access_code" >

                                @if ($errors->has('access_code'))
                                    <span class="help-block">
                                        <strong>{{ $errors->first('access_code') }}</strong>
                                    </span>
                                @endif
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="col-md-8 col-md-offset-4">
                                <button type="submit" class="btn btn-primary">
                                    Create
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            @if(count($guests) > 0)
                <div>
                    <table class="table">
                      <thead>
                        <tr>
                          <th scope="col">Name</th>
                          <th scope="col">Surname</th>
                          <th scope="col">Access code</th>
                        </tr>
                      </thead>
                      <tbody>
                        @foreach($guests as $guest)
                            <tr>
                              <td>{{ $guest->name }}</td>
                              <td>{{ $guest->surname }}</td>
                              <td>{{ $guest->access_code }}</td>
                            </tr>
                        @endforeach
                      </tbody>
                    </table>
                </div>
            @endif
        </div>
    </div>
</div>
@endsection