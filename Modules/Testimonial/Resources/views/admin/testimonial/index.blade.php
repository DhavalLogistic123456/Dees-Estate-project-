@extends(config('testimonial.defaultLayout'))
@section('title',$module_name)
@section('content')
<div class="row wrapper border-bottom white-bg page-heading">
    <div class="col-lg-12 col-md-12 col-sm-12">
        <h2>{{ $module_name }}</h2>
        <ol class="breadcrumb">
            <li class="breadcrumb-item">
                <a href="{{ url(config('testimonial.routePrefix')) }}">Home</a>
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
                        @can('testimonial_add')
                        <a class="btn btn-primary btn-xs" href="{{ $module_route.'/create' }}" title="Add"><i
                                class="fa fa-plus"></i> Add</a>
                        @endcan
                    </div>
                </div>
                <div class="ibox-content">
                    <div class="table-responsive">
                        <table id="testimonial-datatable" class="table table-striped table-hover w-100">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Title</th>
                                    <th>Description</th>
                                    <th>User Name</th>
                                    <th>User Designation</th>
                                    <th>User Photo</th>
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
        var oTable = $('#testimonial-datatable').DataTable({
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
                    data: 'title',
                    name: 'title'
                },
                {
                    data: 'description',
                    name: 'description'
                },
                {
                    data: 'user_name',
                    name: 'user_name'
                },
                {
                    data:  'user_designation',
                    name:  'user_designation',
                },
                {
                    data:  null,
                    name: 'featured_image',
                    orderable: false,
                    searchable: false,
                    className:"text-center",
                    render:function(o){
                        return  `<img src="${o.user_photo}" class="img-sm" onerror="this.src='{{ url('build/admin/images/default.jpg') }}';"></img>`;
                    }
                },
                {
                    data:  null,
                    orderable: false,
                    searchable: false,
                    responsivePriority: 1,
                    targets: 0,
                    className:"text-center",
                    visible: "{{ ($authUser->can('testimonial_edit') || $authUser->can('testimonial_delete')) }}",
                    render:function(o){
                        var element =  '<div class="btn-group">';
						element +=  '@can("testimonial_edit")<a class="btn btn-warning btn-xs" title="Edit" href="{{ $module_route }}/' + o.id + '/edit" ><i class="fa fa-edit"></i></a>@endcan';
						element +=  '@can("testimonial_delete")<button class="btn btn-danger btn-xs" title="Delete" id="deleteTestimonial" tId="' + o.id + '"><i class="fa fa-trash"></i></button>@endcan';
						element +=  '</div>';
                        return element;
                    }
                }
            ]
        });
        $("#testimonial-datatable").delegate('#deleteTestimonial','click',function(){
            let url = '{{ $module_route }}/'+$(this).attr('tId');
            deleteRecordByAjax(url, "{{$module_name}}", oTable);
        })
    });
</script>
@endpush
