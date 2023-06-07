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
                            {{-- <select class="form-control" id="category-filter">
                            <option value="">All Categories</option>
                            @foreach ($category as $category)
                            <option value="{{ $category->slug }}">{{ $category->name }}</option>
                            @endforeach
                        </select> --}}
                            @can('blog_add')
                                <a class="btn btn-primary btn-xs" href="{{ $module_route . '/create' }}" title="Add"><i
                                        class="fa fa-plus"></i> Add</a>
                            @endcan
                        </div>
                    </div>
                    <div class="ibox-content">
                        <div class="table-responsive">
                            <table id="posts-datatable" class="table table-striped table-hover w-100">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Image</th>
                                        <th>Title</th>
                                        <th>Slug</th>
                                        <th>Categories</th>
                                        <th>Posted At</th>
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
    $(document).ready(function(){

        var oTable = $('#posts-datatable').DataTable({
            processing: true,
            serverSide: true,
            responsive: true,
            pagingType: "full_numbers",
            ajax: {
                url: "{!! $module_route.'/datatable' !!}",
                data: function ( d ) {
                    d.category = $('#category-filter').val();
                }
            },
            columns: [
                { data: 'DT_RowIndex', searchable: false, orderable:false, width: 20 },
                {
                    data:  null,
                    name: 'featured_image',
                    orderable: false,
                    searchable: false,
                    className:"text-center",
                    render:function(o){
                        return  '';//`<img class="img-sm" src="${o.featured_image_thumb}" onerror="this.src='{{ url('build/admin/images/default.jpg') }}'">`;
                    }
                },
                {
                    data: 'title',
                    name: 'title'
                },
                {
                    data: 'slug',
                    name: 'slug'
                },
                {
                    data:  null,
                    name: 'categories.name',
                    orderable: false,
                    className:"text-center",
                    render:function(o){
                        var categories = "";
                        o.categories.forEach(category => {
                            if (category.name) {
                                if (categories) {
                                    categories += ", <br>";
                                }
                                categories += category.name;
                            }
                        });
                        return  categories;
                    }
                },
                {
                    data:  'bloged_at',
                    name:  'bloged_at',
                },
                {
                    data:  null,
                    orderable: false,
                    searchable: false,
                    responsivePriority: 1,
                    targets: 0,
                    className:"text-center",
                    visible: "true",
                    visible: "{{ ($authUser->can('blog_edit') || $authUser->can('blog_delete')) }}",
                    render:function(o){
                        var view_url = '{{ route("blog-front::blog.details", ":slug") }}'.replace(':slug', o.slug);

                        var element =  '<div class="btn-group">';
						element +=  '@can("blog_edit")<a class="btn btn-primary btn-xs" target="_blank" title="Edit With Content Builder" href="{{ $module_route }}/' + o.id + '/edit/buildwithcontentbuilder" >content builder</a>@endcan';
						element +=  '@can("blog_edit")<a class="btn btn-warning btn-xs" title="Edit" href="{{ $module_route }}/' + o.id + '/edit" ><i class="fa fa-edit"></i></a>@endcan';
                        element +=  '@can("blog_delete")<button class="btn btn-danger btn-xs" title="Delete" id="deleteBlog" blogId="' + o.id + '"><i class="fa fa-trash"></i></button>@endcan';
                        element += `<a href='${view_url}' target='_blank' class='btn btn-primary btn-xs' title='Blog Preview'><i class='fa fa-eye'></i></a>`;
						element +=  '</div>';
                        return element;
                    }
                }
            ]
        });
        $('#posts-datatable').delegate('#deleteBlog','click',function(){
            let url = '{{ $module_route }}/'+$(this).attr('blogId');
            deleteRecordByAjax(url, "{{$module_name}}", oTable);
        });
    });
</script>
@endpush
