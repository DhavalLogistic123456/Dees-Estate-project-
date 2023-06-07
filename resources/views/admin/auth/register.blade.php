@extends('admin.layouts.default')
@section('title', 'Register')
@section('content')
<div class="loginColumns animated fadeInDown">
    <div class="row">
        <div class="col-md-12">
            <h2 class="font-bold">Register to the {{config('app.name')}}</h2>
            <p>Create account to see it in action.</p>
            <form class="m-t" role="form" method="POST" action="{{ route('admin::register') }}">
                @csrf
                <div class="row">
                    <div class="col-md-6">
                        <div class="form-group mb-3">
                            <label>Name</label>
                            <input id="name" type="text" class="form-control @error('name') is-invalid @enderror"
                                name="name" data-validation="required" value="{{ old('name') }}">
                            @error('name')
                            <span class="invalid-feedback" role="alert">
                                <strong>{{ $message }}</strong>
                            </span>
                            @enderror
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group mb-3">
                            <label>Email</label>
                            <input id="email" type="text" class="form-control @error('email') is-invalid @enderror"
                                name="email" data-validation="required email" value="{{ old('email') }}">
                            @error('email')
                            <span class="invalid-feedback" role="alert">
                                <strong>{{ $message }}</strong>
                            </span>
                            @enderror
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group mb-3">
                            <label>Password</label>
                            <input id="password" type="password"
                                class="form-control @error('password') is-invalid @enderror" name="password"
                                data-validation="required" value="{{ old('password') }}">
                            @error('password')
                            <span class="invalid-feedback" role="alert">
                                <strong>{{ $message }}</strong>
                            </span>
                            @enderror
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group mb-3">
                            <label>Confirm password</label>
                            <input id="password_confirmation" type="password"
                                class="form-control @error('password_confirmation') is-invalid @enderror"
                                name="password_confirmation" data-validation="required"
                                value="{{ old('password_confirmation') }}">
                            @error('password_confirmation')
                            <span class="invalid-feedback" role="alert">
                                <strong>{{ $message }}</strong>
                            </span>
                            @enderror
                        </div>
                    </div>
                </div>
                <button type="submit" class="btn btn-primary block full-width m-b">Register</button>
                <p class="text-muted text-center"><small>Already have an account?</small></p>
                <a class="btn btn-sm btn-white btn-block" href="{{ route('admin::login') }}">Login</a>
            </form>
        </div>
    </div>
    <hr />
    <div class="row">
        <div class="col-md-6">
            Copyright {{config('app.name')}}
        </div>
        <div class="col-md-6 text-end">
            <small>&copy; {{date('Y')}}</small>
        </div>
    </div>
</div>
@endsection
