@extends(config('blog.defaultLayout'))
@section('title',$module_name)
@section('content')
<div class="row wrapper border-bottom white-bg page-heading">
    <div class="col-lg-12 col-md-12 col-sm-12">
        <h2>{{ $module_name }}</h2>
        <ol class="breadcrumb">
            <li class="breadcrumb-item">
                <a href="{{ url(config('blog.routePrefix')) }}">Home</a>
            </li>
            <li class="breadcrumb-item">
                <a>{{ $module_name }} List</a>
            </li>
        </ol>
    </div>
</div>
<div class="wrapper wrapper-content animated fadeInRight">
    <div class="row">
        <div class="col-lg-12 col-md-12 col-sm-12">
            <div class="ibox">
                <div class="ibox-title">
                    <h5 class="card-title mb-0">{{ $module_name }} List</h5>
                    <div class="ibox-tools">
                        {{-- <select class="form-control" id="category-filter">
                            <option value="">All Categories</option>
                            @foreach($category as $category)
                            <option value="{{ $category->slug }}">{{ $category->name }}</option>
                        @endforeach
                        </select> --}}
                        @can('blog_add')
                        <a class="btn btn-primary btn-xs" href="{{ $module_route.'/create' }}" title="Add"><i
                                class="fa fa-plus"></i> Add</a>
                        @endcan
                    </div>
                </div>
                <div class="ibox-content">
                    <div class="table-responsive">
                        <table id="cms-datatable" class="table table-striped table-hover w-100">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Page Title</th>
                                    <th>URL Key</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@stop
@push("scripts")
<script type="module">
     $(document).ready(function(){
        var oTable = $('#cms-datatable').DataTable({
            processing: true,
            serverSide: true,
            responsive: true,
            pagingType: "full_numbers",
            ajax: {
                url: "{!! $module_route.'/datatable' !!}",
                data: function ( data ) {
                    console.log(data,"D");
                }
            },
            columns: [
                { data: 'DT_RowIndex', searchable: false, orderable:false, width: 20 },
                {
                    data: 'page_title',
                    name: 'page_title'
                },
                {
                    data: 'url_key',
                    name: 'url_key'
                },
                {
                    data:  null,
                    orderable: false,
                    searchable: false,
                    responsivePriority: 1,
                    targets: 0,
                    className:"text-center",
                    visible: "{{ ($authUser->can('Cms_edit') || $authUser->can('Cms_delete')) }}",
                    render:function(o){
                        var element =  '<div class="btn-group">';
						element +=  '@can("blog_edit")<a class="btn btn-primary btn-xs" target="_blank" title="Edit With Content Builder" href="{{ $module_route }}/' + o.id + '/edit/buildwithcontentbuilder" >content builder</a>@endcan';
						element +=  '@can("Cms_edit")<a class="btn btn-warning btn-xs" title="Edit" href="{{ $module_route }}/' + o.id + '/edit" ><i class="fa fa-edit"></i></a>@endcan';
						element +=  '@can("Cms_delete")<button class="btn btn-danger btn-xs" title="Delete" id="deleteTestimonial" tId="' + o.id + '"><i class="fa fa-trash"></i></button>@endcan';
						element +=  '</div>';
                        return element;
                    }
                }
            ]
        });
        $('#cms-datatable').delegate('#deleteTestimonial','click',function(){
            let url = '{{ $module_route }}/'+$(this).attr('tId');
            deleteRecordByAjax(url, "{{$module_name}}", oTable);
        });
    });
</script>
@endpush
