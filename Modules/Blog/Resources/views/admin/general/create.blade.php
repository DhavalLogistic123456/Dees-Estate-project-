@extends(config('blog.defaultLayout'))
@section('title', 'Create '. $module_name)
@section('content')
<div class="row wrapper border-bottom white-bg page-heading">
    <div class="col-lg-12">
        @if(isset($module_name))
        <h2>{{ $module_name }}</h2>
        <ol class="breadcrumb">
            <li class="breadcrumb-item">
                <a href="{{ url(config('blog.routePrefix')) }}">Home</a>
            </li>
            <li class="breadcrumb-item">
                <a>Create {{ $module_name }}</a>
            </li>
        </ol>
        @endif
    </div>
</div>
<div class="wrapper wrapper-content animated fadeInRight">
    <div class="row">
        <div class="col-lg-12">
            <div class="ibox ">
                <div class="ibox-title">
                    @if(isset($module_name))
                    <h5>Create {{ $module_name }}</h5>
                    @endif
                </div>
                <div class="ibox-content">
                    <form class='form-horizontal' method="POST" action="{{ $module_route }}"
                        enctype="multipart/form-data">
                        @csrf
                        @include("blog::admin.$module_view._form")
                        <div class="text-end">
                            <a href="{{ $module_route }}" class="btn btn-white btn-sm">Cancel</a>
                            <button class="btn btn-primary btn-sm" type="submit"><i class="fa fa-check"></i>
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
