<div class="form-group mb-3">
    <label>Name</label>
    <input type="text" class="form-control @error('name') is-invalid @enderror" id="name" data-validation="required"
        aria-describedby="name_help" name='name' value="{{ isset($result) ? $result['name'] : old('name') }}">
    <small id="name_help" class="form-text text-muted">The name of the category</small>
    @error('name')
    <span class="invalid-feedback" role="alert">
        <strong>{{ $message }}</strong>
    </span>
    @enderror
</div>
<div class="form-group mb-3">
    <label>Slug</label>
    <input maxlength='100' pattern="[a-zA-Z0-9-]+" type="text" class="form-control @error('slug') is-invalid @enderror"
        id="slug" oninput="SHOULD_AUTO_GEN_SLUG=false;" aria-describedby="slug_help" name='slug'
        value="{{ isset($result) ? $result['slug'] : old('slug') }}" data-validation="required">
    <small id="slug_help" class="form-text text-muted">
        Letters, numbers, dash only. The slug i.e. {{route("blog::blog-category.index","")}}/<u><em>slug</em></u>.
        This must be unique (two categories can't share the same slug).
    </small>
    @error('slug')
    <span class="invalid-feedback" role="alert">
        <strong>{{ $message }}</strong>
    </span>
    @enderror
</div>
<div class="form-group mb-3">
    <label>Description</label>
    <textarea name='description' class='form-control @error(' description') is-invalid @enderror'
        id='description'>{{ isset($result) ? $result['description'] : old('description') }}</textarea>
    @error('description')
    <span class="invalid-feedback" role="alert">
        <strong>{{ $message }}</strong>
    </span>
    @enderror
</div>
<div class="form-group mb-3">
    <label>SEO title</label>
    <input class="form-control @error('seo_title') is-invalid @enderror" id="seo_title"
        aria-describedby="seo_title_help" name='seo_title' type='text'
        value='{{ isset($result) ? $result['seo_title'] : old('seo_title') }}'>
    <small id="seo_title_help" class="form-text text-muted">Enter a value for the {{"<title>"}} tag. If nothing is
        provided here we will just use the normal category title from above</small>
    @error('seo_title')
    <span class="invalid-feedback" role="alert">
        <strong>{{ $message }}</strong>
    </span>
    @enderror
</div>
<div class="form-group mb-3">
    <label>Meta description</label>
    <textarea class="form-control @error('meta_description') is-invalid @enderror" id="meta_description"
        name='meta_description'>{{ isset($result) ? $result['meta_description'] : old('meta_description') }}</textarea>
    @error('meta_description')
    <span class="invalid-feedback" role="alert">
        <strong>{{ $message }}</strong>
    </span>
    @enderror
</div>
@push("scripts")
<script type="module">
    $(document).ready(function(){

        $(document).on('input','#name',function() {
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
@endpush
