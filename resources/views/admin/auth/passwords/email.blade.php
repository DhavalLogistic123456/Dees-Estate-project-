@extends('admin.layouts.default')
@section('title', 'Forgot Password')
@section('content')
<div class="passwordBox animated fadeInDown">
    <div class="row">
        <div class="col-md-12">
            <div class="ibox-content">
                <h2 class="font-bold">Forgot password</h2>
                <p>Enter your email address and your password will be reset and emailed to you.</p>
                <div class="row">
                    <div class="col-lg-12">
                        @if (session('status'))
                        <div class="alert alert-success" role="alert">
                            {{ session('status') }}
                        </div>
                        @endif
                        <form class="m-t" role="form" method="POST" action="{{ route('admin::password.email') }}">
                            @csrf
                            <div class="form-group mb-3">
                                <input id="email" type="email" class="form-control @error('email') is-invalid @enderror"
                                    name="email" value="{{ old('email') }}" placeholder="{{ __('E-Mail Address') }}"
                                    data-validation="required email">
                                @error('email')
                                <span class="invalid-feedback" role="alert">
                                    <strong>{{ $message }}</strong>
                                </span>
                                @enderror
                            </div>
                            <button type="submit"
                                class="btn btn-primary block full-width m-b">{{ __('Send Password Reset Link') }}</button>
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
