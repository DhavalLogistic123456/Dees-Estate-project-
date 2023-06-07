@extends('admin.layouts.default')
@section('title', 'Reset Password')
@section('content')
<div class="passwordBox animated fadeInDown">
    <div class="row">
        <div class="col-md-12">
            <div class="ibox-content">
                <h2 class="font-bold">Reset password</h2>
                <p>Enter your email address and new password.</p>
                <div class="row">
                    <div class="col-lg-12">
                        <form class="m-t" role="form" method="POST" action="{{ route('admin::password.update') }}">
                            @csrf
                            <input type="hidden" name="token" value="{{ $token }}">

                            <div class="form-group mb-3">
                                <input id="email" type="email" class="form-control @error('email') is-invalid @enderror"
                                    name="email" value="{{ old('email') }}" placeholder="{{ __('E-Mail Address') }}">
                                @error('email')
                                <span class="invalid-feedback" role="alert">
                                    <strong>{{ $message }}</strong>
                                </span>
                                @enderror
                            </div>

                            <div class="form-group mb-3">
                                <input id="password" type="password"
                                    class="form-control @error('password') is-invalid @enderror" name="password"
                                    placeholder="{{ __('Password') }}">
                                @error('password')
                                <span class="invalid-feedback" role="alert">
                                    <strong>{{ $message }}</strong>
                                </span>
                                @enderror
                            </div>

                            <div class="form-group mb-3">
                                <input id="password-confirm" type="password" class="form-control"
                                    name="password_confirmation" placeholder="{{ __('Confirm Password') }}">
                            </div>
                            <button type="submit"
                                class="btn btn-primary block full-width m-b">{{ __('Reset Password') }}</button>
                        </form>
                    </div>
                </div>
            </div>
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
