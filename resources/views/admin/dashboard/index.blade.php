@extends('admin.layouts.app')
@section('title', $module_name)
@section('content')
<div class="row wrapper border-bottom white-bg page-heading">
    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <h2>{{ $module_name }}</h2>
        <ol class="breadcrumb">
            <li class="breadcrumb-item">
                <a href="{{ url(config('settings.ADMIN_PREFIX')) }}">Home</a>
            </li>
        </ol>
    </div>
</div>
@endsection
