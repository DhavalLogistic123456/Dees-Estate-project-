<div class="row">
    <div class="col-md-12">
        <div class="form-group mb-3">
            <label>Blog Post Title</label>
            <input type="text" class="form-control @error('title') is-invalid @enderror" id="title"
                data-validation="required" aria-describedby="name_help" name='title'
                value="{{ isset($result) ? $result['title'] : old('title') }}">
            <small id="title_help" class="form-text text-muted">The title of the blog post</small>
            @error('title')
            <span class="invalid-feedback" role="alert">
                <strong>{{ $message }}</strong>
            </span>
            @enderror
        </div>

        <div class="form-group mb-3">
            <label>Blog Post Slug</label>
            <input type="text" class="form-control @error('slug') is-invalid @enderror" id="slug"
                data-validation="required" aria-describedby="name_help" name='slug'
                value="{{ isset($result) ? $result['slug'] : old('slug') }}">
            <small id="slug_help" class="form-text text-muted">The slug (leave blank to auto generate) -
                i.e. {{route("blog::blog.index","")}}/<u><em>slug</em></u></small>
            @error('slug')
            <span class="invalid-feedback" role="alert">
                <strong>{{ $message }}</strong>
            </span>
            @enderror
        </div>
    </div>
    <div class="col-md-4">
        <div class="form-group mb-3">
            <label>Blog Author</label>
            <input type="text" class="form-control @error('blog_author') is-invalid @enderror" id="blog_author"
                data-validation="required" aria-describedby="name_help" name='blog_author'
                value="{{ isset($result) ? $result['blog_author'] : old('blog_author') }}">
            <small id="blog_author_help" class="form-text text-muted">The author of the blog post.</small>
            @error('blog_author')
            <span class="invalid-feedback" role="alert">
                <strong>{{ $message }}</strong>
            </span>
            @enderror
        </div>
    </div>
    <div class="col-md-4">
        <div class="form-group mb-3">
            <label>Published?</label>
            <select name='is_published' class='form-control @error(' is_published') is-invalid @enderror'
                id='is_published' aria-describedby='is_published_help'>
                @php
                $status=isset($result) ? $result['is_published'] : null;
                @endphp
                <option @if(old("is_published",$status)=='1' ) selected='selected' @endif value='1'>
                    Published
                </option>
                <option @if(old("is_published",$status)=='0' ) selected='selected' @endif value='0'>Not
                    Published
                </option>
            </select>
            <small id="is_published_help" class="form-text text-muted">Should this be published? If not, then it
                won't be
                publicly viewable.</small>
            @error('is_published')
            <span class="invalid-feedback" role="alert">
                <strong>{{ $message }}</strong>
            </span>
            @enderror
        </div>
    </div>
    <div class="col-md-4">
        <div class="form-group mb-3">
            <label>Posted at</label>
            <input type="text" class="form-control @error('bloged_at') is-invalid @enderror" id="bloged_at"
                aria-describedby="bloged_at_help" name='bloged_at'
                value="{{ isset($result) ? $result['bloged_at'] : old('bloged_at',\Carbon\Carbon::now()) }}">
            <small id="bloged_at_help" class="form-text text-muted">When this should be published. If this value is
                greater
                than now ({{\Carbon\Carbon::now()}}) then it will not (yet) appear on your blog. Should be in the <code>YYYY-MM-DD
                HH:MM:SS</code> format.</small>
            @error('bloged_at')
            <span class="invalid-feedback" role="alert">
                <strong>{{ $message }}</strong>
            </span>
            @enderror
        </div>
    </div>
    <div class="col-md-12">
        <div class="form-group mb-3">
            <label>Category</label>
            <select name="category[]" id="category" class="form-control select2" multiple='multiple'>
                @foreach($category as $id => $name)
                <option value="{{ $id }}"
                    {{ (isset($result) && $result['categories']->contains($id) ? "selected" : "") }}>
                    {{ $name }}</option>
                @endforeach
            </select>
        </div>
    </div>
    <div class="col-md-12">
        <div class="form-group mb-3">
            <div class="d-flex justify-content-between mb-1">
            <label>Description
                @if(config("blog.echo_html"))
                    (HTML)
                @else
                    (Html will be escaped)
                @endif</label>
                @if(isset($result['id']))
                    <a class="btn btn-sm btn-success" href="{{ route('blog::build.contentbuilder', $result['id']) }}" target="_blank">Edit with content builder</a>
                @endif
            </div>

            <textarea class="form-control summernote {{ (config('blog.echo_html')) ? 'blog_description_editor' : ''  }}" id="description" aria-describedby="description_help" name='description'>{{ isset($result) ? $result['description'] : old('description') }}</textarea>
            <small id="description_help" class="form-text text-muted">Please note that any HTML (including any JS code)
                that is
                entered here will be
                echoed (without escaping)
            </small>
            @error('description')
            <span class="invalid-feedback" role="alert">
                <strong>{{ $message }}</strong>
            </span>
            @enderror
        </div>
        <div class="form-group mb-3">
            <label>SEO title (optional)</label>
            <input class="form-control @error('seo_title') is-invalid @enderror" id="seo_title"
                aria-describedby="seo_title_help" name='seo_title' tyoe='text'
                value='{{ isset($result) ? $result['seo_title'] : old('seo_title') }}'>
            <small id="seo_title_help" class="form-text text-muted">Enter a value for the {{"<title>"}} tag. If nothing
                is
                provided here we will just use the normal post title from above.</small>
        </div>
        <div class="form-group mb-3">
            <label>Meta Description (optional)</label>
            <textarea class="form-control" id="meta_description" aria-describedby="meta_description_help"
                name='meta_description'>{{ isset($result) ? $result['meta_description'] : old('meta_description') }}</textarea>
            <small id="meta_description_help" class="form-text text-muted">Meta description.</small>
            @error('meta_description')
            <span class="invalid-feedback" role="alert">
                <strong>{{ $message }}</strong>
            </span>
            @enderror
        </div>

        <div class="form-group mb-3">
            <label>Meta keyword (optional) </label>
            <textarea class="form-control" id="blog_meta_keyword" aria-describedby="blog_meta_keyword"
                name='blog_meta_keyword'>{{ isset($result) ? $result['blog_meta_keyword'] : old('blog_meta_keyword') }}</textarea>
            <small id="blog_meta_keyword_help" class="form-text text-muted">blog meta keyword </small>
            @error('blog_meta_keyword')
            <span class="invalid-feedback" role="alert">
                <strong>{{ $message }}</strong>
            </span>
            @enderror
        </div>
    </div>
    <div class="col-md-12">
        @if(config("blog.image_upload_enabled"))
        <div class='p-4 mb-4 rounded border'>
            <div class="row">
                <div class="col-md-10">
                    <h4>Featured Image (Thumb Image URL)</h4>
                    <div class="my-3">
                        <div class="form-group mb-3">
                            <input id="featured_image_thumb" class="form-control" type="text"
                                onchange="featureImgChange(this, 'featured_image_thumb_holder')"
                                value="{{ isset($result) ? $result['featured_image_thumb'] : old('featured_image_thumb') }}"
                                name="featured_image_thumb">
                            <small class="form-text text-muted">Enter image url, you can select image url from <a
                                    target="_blank" href="{{ route('media::media.index') }}">Media</a>.</small>
                        </div>
                    </div>
                </div>
                <div class="col-md-2">
                    <img id="featured_image_thumb_holder" class="img-lg"
                        src="{{ isset($result) ? $result['featured_image_thumb'] : old('featured_image_thumb') }}"
                        onerror="this.src='{{ url('build/admin/images/default.jpg') }}'">
                </div>
                <div class="col-md-10">
                    <h4>Featured Image</h4>
                    <div class="my-3">
                        <div class="form-group mb-3">
                            <input id="featured_image" class="form-control" type="text"
                                onchange="featureImgChange(this, 'featured_image_holder')"
                                value="{{ isset($result) ? $result['featured_image'] : old('featured_image') }}"
                                name="featured_image">
                            <small class="form-text text-muted">Enter image url, you can select image url from <a
                                    target="_blank" href="{{ route('media::media.index') }}">Media</a>.</small>
                        </div>
                    </div>
                </div>
                <div class="col-md-2">
                    <img id="featured_image_holder" class="img-lg"
                        src="{{ isset($result) ? $result['featured_image'] : old('featured_image') }}"
                        onerror="this.src='{{ url('build/admin/images/default.jpg') }}'">
                </div>
            </div>
        </div>
        @else
        <div class='alert alert-warning'>Image uploads were disabled in config.</div>
        @endif
    </div>
</div>
@push('styles')

{{-- <link rel="stylesheet" href="{{ url(mix('modules/css/blog.css')) }}"> --}}
@endpush
@push("scripts")

{{-- <script src="{{ url(mix('modules/js/blog.js')) }}"></script>
 --}}<script type="module">
    $(document).ready(function(){
        // $('.summernote').summernote();

        $(document).on('input','#title',function() {
            var value = $(this).val();
            if (value) {
                $('#slug').val(value.toLowerCase()
                        .replace(/[^\w-_ ]+/g, '') // replace with nothing
                        .replace(/[_ ]+/g, '-') // replace _ and spaces with -
                        .substring(0,99)); // limit str length
            }
        });

    });
</script>
<script>
    function featureImgChange(input, imgTag) {
        document.getElementById(imgTag).src = input.value;
    }

</script>

@endpush
