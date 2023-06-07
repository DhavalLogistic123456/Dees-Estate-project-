@extends(config('blog.defaultLayout'))
@section('title', $module_name)
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
                            @can('blog_category_add')
                                <a class="btn btn-primary btn-xs" href="{{ $module_route . '/create' }}" title="Add"><i
                                        class="fa fa-plus"></i> Add</a>
                            @endcan
                        </div>
                    </div>
                    <div class="ibox-content">
                        <div class="table-responsive">
                            <table id="categories-datatable" class="table table-striped table-hover w-100">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Title</th>
                                        <th>Slug</th>
                                        <th>Description</th>
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
@push('scripts')
    <script type="module">
         var oTable ='';
    $(document).ready(function(){
         oTable = $('#categories-datatable').DataTable({
            processing: true,
            serverSide: true,
            responsive: true,
            pagingType: "full_numbers",
            ajax: {
                url: "{!! $module_route.'/datatable' !!}",
                data: function ( d ) {
                }
            },
            columns: [
                { data: 'DT_RowIndex', searchable: false, orderable:false, width: 20 },
                {
                    data: 'name',
                    name: 'name'
                },
                {
                    data: 'slug',
                    name: 'slug'
                },
                {
                    data:  'description',
                    name:  'description'
                },
                {
                    data:  null,
                    orderable: false,
                    searchable: false,
                    responsivePriority: 1,
                    targets: 0,
                    className:"text-center",
                    visible: "{{ ($authUser->can('blog_category_edit') || $authUser->can('blog_category_delete')) }}",
                    render:function(o){
                        var post_url = '{{ route("blog::blog.index", "cate=:id") }}'.replace(':id', o.slug);
                        var element =  '<div class="btn-group">';
                        // element += `<a href='${post_url}' class='btn-sm m-1 btn-info'>Posts</a>`;
						element +=  '@can("blog_category_edit")<a class="btn btn-warning btn-xs" title="Edit" href="{{ $module_route }}/' + o.id + '/edit" ><i class="fa fa-edit"></i></a>@endcan';
						element +=  '@can("blog_category_delete")<button class="btn btn-danger btn-xs" title="Delete" id="deleteCategory" c_id="' + o.id + '"><i class="fa fa-trash"></i></button>@endcan';
						element +=  '</div>';
                        return element;
                    }
                }
            ]
        });
        $("#categories-datatable").delegate("#deleteCategory", "click", function(){
            let url = '{{ $module_route }}/' + $(this).attr('c_id');
            deleteRecordByAjax(url, "{{ $module_name }}", oTable);
        });
     
    });
</script>
    <script>
      /*    function deleteCategory (id) { //= (id) => {
            let url = '{{ $module_route }}/' + id;
            deleteRecordByAjax(url, "{{ $module_name }}", oTable);
        } */
    </script>
@endpush
