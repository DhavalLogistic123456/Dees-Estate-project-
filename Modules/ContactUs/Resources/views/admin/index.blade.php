@extends(config('contactus.defaultLayout'))
@section('title', $module_name)
@section('content')
    <div class="wrapper-content animated fadeInRight">
        <div class="row">
            <div class="col-lg-12">
                <div class="ibox ">
                    <div class="ibox-title">
                        @if (isset($module_name))
                            <h5 class="card-title mb-0">{{ $module_name }} List</h5>
                        @endif
                    </div>
                    <div class="ibox-content">
                        <div class="table-responsive">
                            <table id="contact-us-datatable" class="table w-100">
                                <thead class="table-light">
                                    <tr>
                                        <th>#</th>
                                        <th>name</th>
                                        <th>email</th>
                                        <th>number</th>
                                        <th>message</th>
                                        <th>action</th>
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
        $(document).ready(function() {
            var oTable = $('#contact-us-datatable').DataTable({
                processing: true,
                serverSide: true,
                responsive: true,
                pagingType: "full_numbers",
                ajax: {
                    url: `{{ route("{$module_route}.datatable") }}`,
                    data: function(d) {
                        d.category = $('#category-filter').val();
                    }
                },
                columns: [{
                        data: 'DT_RowIndex',
                        searchable: false,
                        orderable: false,
                        width: 20
                    },
                    {
                        data: 'name',
                        name: 'name'
                    },
                    {
                        data: 'email',
                        name: 'email'
                    },
                    {
                        data: 'phone',
                        name: 'phone'
                    },
                    {
                        data: 'message',
                        name: 'message'
                    },
                    {
                        data: null,
                        searchable: false,
                        orderable: false,
                        render: function(o, type, row, meta) {
                            return '<button class="btn btn-danger btn-sm" title="Delete" onclick="deleteContactUs(' +
                                o.id + ')"><i class="fa fa-trash"></i></button>';
                            // return `<button type="button" class="btn btn-xs btn-danger" title="Delete" onclick="deleteContactUs(${row.id})"><i class="fa fa-trash"></i></button>`;
                        }
                    }
                ]
            });

            window.deleteContactUs = (id) => {
                var url = '{{ route("{$module_route}.destroy", ':contactus') }}';
                url = url.replace(':contactus', id);
                deleteRecordByAjax(url, '{{ $module_name }}', oTable);
            }
            // function deleteContactUs(id) {
            // var url = '{{ route('admin::contactus.destroy', ':contactus') }}';
            // url = url.replace(':contactus', id);
            // deleteRecordByAjax(url, '{{ $module_name }}', contactUsTable);

        });
    </script>
@endpush
