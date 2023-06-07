@extends(config('rightsmanagement.defaultLayout'))
@section('title', $module_name)
@section('content')
<div class="row wrapper border-bottom white-bg page-heading">
    <div class="col-lg-12">
        <h2>{{  $module_name }}</h2>
        <ol class="breadcrumb">
            <li class="breadcrumb-item">
                <a href="{{ url(config('rightsmanagement.routePrefix')) }}">Home</a>
            </li>
            <li class="breadcrumb-item">
                <a>{{ $module_name }} List</a>
            </li>
        </ol>
    </div>
</div>
<div class="wrapper wrapper-content animated fadeInRight">
    <div class="row">
        <div class="col-lg-12">
            <div class="ibox ">
                <div class="ibox-title">
                    @if(isset($module_name))
                    <h5 class="card-title mb-0">{{  $module_name }} List</h5>
                    @endif
                    <div class="ibox-tools">
                        <a class="btn btn-primary btn-xs" href="{{ $module_route.'/create' }}" title="Add"><i
                                class="fa fa-plus"></i> Add</a>
                    </div>
                </div>
                <div class="ibox-content">
                    <div class="table-responsive">
                        <table id="roles-datatable" class="table table-striped table-hover w-100">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Role</th>
                                    <th>Display Name</th>
                                    <th>Description</th>
                                    <th>Added</th>
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
@endsection
@push("scripts")
<script type="module">
    $(document).ready(function(){

        var oTable = $('#roles-datatable').DataTable({
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
                    data: 'display_name',
                    name: 'display_name'
                },
                {
                    data: 'description',
                    name: 'description'
                },
                {
                    data: 'created_at',
                    name: 'created_at'
                },
                {
                    data:  null,
                    orderable: false,
                    searchable: false,
                    responsivePriority: 1,
                    targets: 0,
                    className:"text-center",
                    render:function(o){
                        var element =  '<div class="btn-group">';
						element +=  '<a class="btn btn-warning btn-xs" title="Edit" href="{{ $module_route }}/' + o.id + '/edit" ><i class="fa fa-edit"></i></a>';
						// element +=  '<button class="btn btn-danger btn-xs" title="Delete" onclick="deleteRole(' + o.id + ')"><i class="fa fa-trash"></i></button>';
						element +=  '</div>';
                        return element;
                    }
                }
            ]
        });

       function deleteRole(roleId){
            let url = '{{ $module_route }}/'+roleId;
            deleteRecordByAjax(url, "{{$module_name}}", oTable);
        }

    });
</script>
@endpush
