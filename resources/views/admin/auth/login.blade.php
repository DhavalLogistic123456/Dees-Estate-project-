@extends('admin.layouts.default')
@section('title', 'Login')
@section('content')
<div class="container eg-admin">
    <div class="middle-box text-center loginscreen animated fadeInDown">
        <h1 class="logo-name">LS</h1>
        <h3>Welcome to the {{config('app.name')}}</h3>
        <p>Login in. To see it in action.</p>
        <form class="m-t" role="form" method="POST" action="{{ route('admin::login') }}">
            @csrf
            <div class="form-group mb-3">
                <input id="email" type="email" class="form-control @error('email') is-invalid @enderror" name="email"
                    value="{{ old('email') }}" placeholder="Email" data-validation="required email">
                @error('email')
                <span class="invalid-feedback" role="alert">
                    <strong>{{ $message }}</strong>
                </span>
                @enderror
            </div>
            <div class="form-group mb-3 ">
                <input id="password" type="password" class="form-control @error('password') is-invalid @enderror"
                    name="password" placeholder="Password" data-validation="required">
                @error('password')
                <span class="invalid-feedback" role="alert">
                    <strong>{{ $message }}</strong>
                </span>
                @enderror
            </div>
            <button type="submit" class="btn btn-primary block full-width m-b">{{ __('Login') }}</button>
            <a href="{{ route('admin::password.request') }}"><small>Forgot password?</small></a>
            <p class="text-muted text-center"><small>Do not have an account?</small></p>
            <a class="btn btn-sm btn-white btn-block" href="{{ route('admin::register') }}">Create an account</a>
        </form>
        <p class="m-t"> <small>{{config('app.name')}} &copy; {{date('Y')}}</small> </p>
    </div>
</div>
@endsection
