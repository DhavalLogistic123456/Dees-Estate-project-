@extends(config('media.defaultLayout'))
@push('styles')
    @vite('Modules/Media/Resources/assets/sass/app.scss');
@endpush
@section('title', $module_name)
@section('content')
    <div class="row wrapper border-bottom white-bg page-heading">
        <div class="col-lg-12 col-md-12 col-sm-12">
            <h2>{{ $module_name }}</h2>
            <ol class="breadcrumb">
                <li class="breadcrumb-item">
                    <a href="{{ url(config('media.routePrefix')) }}">Home</a>
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
                    </div>
                    <div class="ibox-content">
                        @can('media_add')
                            <form method="post" action="{{ $module_route }}" enctype="multipart/form-data"
                                class="dropzone mb-3" id="li-media-dropzone">
                                {{ csrf_field() }}
                                <div class="dz-message">
                                    <div class="col-xs-8">
                                        <div class="message text-center">Drop files here or Click to upload</div>
                                    </div>
                                </div>
                                <div class="fallback">
                                    <input type="file" name="file" multiple>
                                </div>
                            </form>
                        @endcan
                        <div class="row">
                            <div class="col-lg-12 col-md-12 col-sm-12">
                                <div id="image-list">{!! $html !!}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
@push('scripts')
    @vite('Modules/Media/Resources/assets/js/app.js')
    <script type="module"> 
    var nxtPage = 2;
	$(document).ready(function(){

        $("#li-media-dropzone").dropzone({
			uploadMultiple: true,
			parallelUploads: 2,
            maxFilesize: 16,
			dictFileTooBig: 'Image is larger than 16MB',
			timeout: 10000,
			init: function () {
                this.on("complete", function(file) {
                    this.removeFile(file);
                    reset_media();
                });
			},
        });

		$(document).on('click', '#loadMore', function() {
			var $this=$(this);
			load_more($this);
		});

		$(document).on('click', '.delete-media', function() {
			swal({
				title: "Are you sure?",
				text: `You will not be able to recover this {{$module_name }}!`,
				icon: "warning",
				buttons: [true, "Yes, delete it!"],
				dangerMode: true,
			}).then((willDelete) => {
				if (willDelete) {
					var id = $(this).data('id');
					var $this=$(this);
					$.ajax({
						type: "DELETE",
						url: '{{ $module_route }}/'+ id,
						headers: {
							'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
						},
						success: function (response) {
							if(response.status) {
								reset_media();
								toastr.success(response.message);
							} else {
								toastr.error(response.message);
							}
						},
						error:function (error) {
							toastr.error(error.responseJSON.message);
						}
					});
				}
			})
		});
		         
	

	}); 
	</script>
    <script>
        function copyImgUrl(element) {
            let url = $(element).data('url');
            copyToClipboard(url);
        }

        function load_more($this) {
            $.ajax({
                type: "POST",
                url: '{{ route('media::load-more') }}',
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
                data: {
                    page: nxtPage
                },
                beforeSend: function() {
                    if ($this) {
                        $this.remove();
                    }
                },
                success: function(response) {
                    if (response.status) {
                        nxtPage++;
                        console.log("response.html", response.html);
                        $('#image-list').append(response.html);
                    }
                },
                error: function(error) {
                    toastr.error(error.responseJSON.message);
                }
            });
        }

        function reset_media() {
            $('#image-list').html('');
            nxtPage = 1;
            load_more(false);
        }
    </script>
@endpush
