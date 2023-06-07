@extends('admin.layouts.default')
@section('title', 'Change Password')
@section('content')
<div class="passwordBox animated fadeInDown">
    <div class="row">
        <div class="col-md-12">
            <div class="ibox-content">
                <h2 class="font-bold">Change password</h2>
                <p>Enter your current password and new password.</p>
                <div class="row">
                    <div class="col-lg-12">
                        @if (session('error'))
                        <div class="alert alert-danger">
                            {{ session('error') }}
                        </div>
                        @endif
                        @if (session('success'))
                        <div class="alert alert-success">
                            {{ session('success') }}
                        </div>
                        @endif
                        <form class="m-t" role="form" method="POST"
                            action="{{ route('admin::password.change.update') }}">
                            @csrf
                            <div class="form-group mb-3">
                                <input id="current-password" type="password"
                                    class="form-control @error('current-password') is-invalid @enderror"
                                    name="current-password" value="{{ old('current-password') }}"
                                    placeholder="{{ __('Current Password') }}" data-validation="required">
                                @error('current-password')
                                <span class="invalid-feedback" role="alert">
                                    <strong>{{ $message }}</strong>
                                </span>
                                @enderror
                            </div>

                            <div class=" form-group mb-3">
                                <input id="new-password" type="password"
                                    class="form-control @error('new-password') is-invalid @enderror" name="new-password"
                                    placeholder="{{ __('New Password') }}" data-validation="required">
                                @error('new-password')
                                <span class="invalid-feedback" role="alert">
                                    <strong>{{ $message }}</strong>
                                </span>
                                @enderror
                            </div>

                            <div class="form-group mb-3">
                                <input id="new-password-confirm" type="password" class="form-control"
                                    name="new-password_confirmation" placeholder="{{ __('Confirm Password') }}"
                                    data-validation="required">
                            </div>
                            <button type="submit"
                                class="btn btn-primary block full-width m-b">{{ __('Change Password') }}</button>
                            <a class="btn btn-success block full-width m-b"
                                href="{{ url(config('settings.ADMIN_PREFIX')) }}">{{ __('Dashboard') }}</a>
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
