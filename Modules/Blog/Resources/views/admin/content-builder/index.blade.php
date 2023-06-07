@extends('front.layouts.app')
@section('title', $module_name)
<base href="/">
@push('styles')
    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
    <link href="https://fonts.googleapis.com/css?family=Lato" rel="stylesheet" type="text/css" />
    @vite('Modules/Blog/Resources/assets/vendor/content_builder/contentbuilder/contentbuilder.css')
    @vite('Modules/Blog/Resources/assets/vendor/content_builder/assets/minimalist-basic/content-bootstrap.css')
@endpush

@section('content')
    <div id="contentarea" class="is-container container content-builder-data">
        @if (isset($result['html_content']))
            {!! $result['html_content'] !!}
        @elseif(isset($blog['description']))
            {!! $blog['description'] !!}
        @else
            <div class="row clearfix">
                <div class="column full">
                    <div class="center">
                        <i class="icon ion-leaf size-48"></i>
                        <h1 style="font-size: 1.3em">BEAUTIFUL CONTENT</h1>
                        <div class="display">
                            <h1>LOREM IPSUM IS SIMPLY DUMMY TEXT</h1>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row clearfix">
                <div class="column full">
                    <hr>
                </div>
            </div>
            <div class="row clearfix">
                <div class="column half">
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type
                        and scrambled it to make a type specimen book. Lorem ipsum dolor sit amet, consectetur adipiscing
                        elit. Vivamus leo ante, consectetur sit amet vulputate vel, dapibus sit amet lectus.</p>
                </div>
                <div class="column half">
                    <img src="{{ asset('Modules/Blog/Resources/assets/vendor/content-builder/assets/minimalist-basic/e09-1.jpg') }}" alt="">
                </div>
            </div>
        @endif

    </div>

    <!-- CUSTOM PANEL (can be used for "save" button or your own custom buttons) -->
    <div id="panelCms" class="text-center">
        <button id='save' class="btn btn-primary">Save</button>
    </div>

    <form id='description-form' method="POST"
        action="{{ isset($module_name) && $module_name == 'Cms' ? route('Cms::content.save', $result['id']) : route('blog::description.save', $blog['id']) }}"
        style="display:none">
        @csrf
        <input type="hidden" name="_method" value="PUT">
        <textarea name="{{ isset($module_name) && $module_name == 'Cms' ? 'html_content' : 'description' }}" id="description"></textarea>
    </form>
@stop

@push('scripts')
    @vite('Modules/Blog/Resources/assets/vendor/content_builder/contentbuilder/jquery.min.js')
    @vite('Modules/Blog/Resources/assets/vendor/content_builder/contentbuilder/jquery-ui.min.js')
    @vite('Modules/Blog/Resources/assets/vendor/content_builder/contentbuilder/contentbuilder.js')
    @vite('Modules/Blog/Resources/assets/vendor/content_builder/contentbuilder/saveimages.js')

    <script type="module">
            jQuery(document).ready(() => {

                    var builder = $("#contentarea").contentbuilder({
                                    snippetFile: "Modules/Blog/Resources/assets/vendor/content_builder/assets/minimalist-basic/snippets-bootstrap.html",
                                    snippetOpen: false,
                                    toolbar: "left",
                                    iconselect: "Modules/Blog/Resources/assets/vendor/content_builder/assets/ionicons/selecticon.html",
                                });
            });

       // function save(ele) {
        $('#save').click(function(){
            $(this).prop('disabled', true);
            $(this).html(`<img src="/vendor/content-builder/assets/loader.gif" style="margin-right: 10px;" /> Saving...`);

            // Save all images
            $("#contentarea").saveimages({
                handler: "{{ route('media::media.store') }}",
                _token: "{{ csrf_token() }}",
               onComplete: function() {
                    //Get content
                    var sHTML = $('#contentarea').data('contentbuilder').html();
                    //console.log("sHTML  "+sHTML);
                    $("#description-form").find("#description").val(sHTML);
                    $("#description-form").submit();

                    $(this).prop('disabled', false);
                    $(this).html(`Save`);
               }
            });
            $("#contentarea").data('saveimages').save();

        });
    </script>
<script>
        function view() {
            /* This is how to get the HTML (for saving into a database) */
            var sHTML = $('#contentarea').data('contentbuilder').viewHtml();

        }
    </script>
@endpush
