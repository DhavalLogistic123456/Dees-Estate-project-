@extends(config('rightsmanagement.defaultLayout'))
@section('title', 'Create '. $module_name)
@section('content')
<div class="row wrapper border-bottom white-bg page-heading">
    <div class="col-lg-12">
        @if(isset($module_name))
        <h2>{{ $module_name }}</h2>
        @endif
        <ol class="breadcrumb">
            <li class="breadcrumb-item">
                <a href="{{ url(config('rightsmanagement.routePrefix')) }}">Home</a>
            </li>
            <li class="breadcrumb-item">
                <a>Create {{ $module_name }}</a>
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
                    <h5>Create {{ $module_name }}</h5>
                    @endif
                    <div class="ibox-tools">
                        <a class="btn btn-primary btn-xs" href="{{ $module_route }}" title="Back"><i
                                class="fa fa-arrow-left"></i> Back</i></a>
                    </div>
                </div>
                <div class="ibox-content">
                    <div class="table-responsive">
                        @if(isset($newPermissions) && count($newPermissions)>0)
                        <div class="float-end">
                            <button class="btn btn-sm btn-success" id="btn-save">Save</button>
                            <button class="btn btn-sm btn-info" id="btn-selectAll">Select All</button>
                            <button class="btn btn-sm btn-warning" id="btn-unSelectAll">Unselect All</button>
                        </div>
                        @endif
                        <table class="table table-striped table-hover permission_activation w-100" id="newPermissions">
                            <thead>
                                <tr>
                                    <th>Permission Name</th>
                                    <th>Display Name</th>
                                    <th>Description</th>
                                    <th>#</th>
                                </tr>
                            </thead>
                            <tfoot>
                                <tr>
                                    <th>Permission Name</th>
                                    <th>Display Name</th>
                                    <th>Description</th>
                                    <th>#</th>
                                </tr>
                            </tfoot>
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
    $(document).ready(function () {
    $('#newPermissions').DataTable({
        data: {!! $newPermissions !!},
        columns: [
            { data: 'name' },
            { data: 'display_name' },
            { data: 'description' },
            {
                data:  null,
                orderable: false,
                searchable: false,
                responsivePriority: 1,
                targets: 0,
                className:"text-center",
                render:function(o){
                    return '<input class="i-checks chk-permissions" value="' + o.name + '" type="checkbox">'
                }
            }
        ],
        paginate: false,
        autoWidth: false,
        responsive: true
    });

    $('.i-checks').iCheck({
        checkboxClass: 'icheckbox_square-green',
        radioClass: 'iradio_square-green',
    });

    //Select All
    $(document).on('click', '#btn-selectAll', function(event) {
        event.preventDefault();
        $(".chk-permissions").iCheck('check');
    });

    //Unselect All
    $(document).on('click', '#btn-unSelectAll', function(event) {
        event.preventDefault();
        $(".chk-permissions").iCheck('uncheck');
    });

    $(document).on('click', '#btn-save', function(event) {
        event.preventDefault();

        var permissions = [];
        $(".chk-permissions").each(function(index, el) {
            if(el.checked) {
                permissions.push(el.value.trim());
            }
        });

        if(permissions.length) {
            $.ajax({
                type: "POST",
                url: "{!! $module_route !!}",
                dataType: 'json',
                data : {names : permissions},
                headers: {
                    "X-CSRF-TOKEN":"{{ csrf_token() }}"
                },
                success: function (data) {
                    toastr.success('Permissions added successfully');
                    removeRowFromDatatableAfterStorePermission();
                },
                error: function (xhr, status, error) {
                    toastr.error(error);
                }
            });
        }
        else {
            toastr.error('Please select at least one permissions');
        }
    });


    function removeRowFromDatatableAfterStorePermission() {
        $(".chk-permissions").each(function(index, el) {
            if(el.checked) {
                el.closest('tr').remove();
            }
        });
    }
});
</script>
@endpush
