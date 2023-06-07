@extends('admin.layouts.default')
@section('title', 'Verify Email')
@section('content')
<div class="loginColumns animated fadeInDown">
    <div class="row">
        <div class="col-md-12">
            <div class="card text-center">
                <div class="card-header">{{ __('Verify your email address') }}</div>
                <div class="card-body">
                    @if (session('verification_message'))
                    <div class="alert alert-warning alert-dismissable" role="alert">
                        <button aria-hidden="true" data-dismiss="alert" class="btn-close" type="button"><i
                                class="fa fa-times"></i></button>
                        {!! __(session()->get('verification_message')) !!}
                    </div>
                    @endif
                    @if (session('resent'))
                    <div class="alert alert-success" role="alert">
                        {{ __('A new verification link has been sent to your email address.') }}
                    </div>
                    @endif
                    {{ __('Before proceeding, please check your email for a verification link.') }}
                    <br />
                    {{ __('If you did not receive the email') }},
                    <a href="{{ route('admin::verification.resend') }}">{{ __('click here to request another') }}</a>.
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
