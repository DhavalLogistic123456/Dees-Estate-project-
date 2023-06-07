<div class="form-group mb-3">
    <label>Title</label>
    <input type="text" class="form-control @error('title') is-invalid @enderror" id="title"
        aria-describedby="title_help" name='title' value='{{ isset($result) ? $result['title'] : old('title') }}'
        data-validation="required">
    <small id="title_help" class="form-text text-muted">The title of the testimonial</small>
    @error('title')
    <span class="invalid-feedback" role="alert">
        <strong>{{ $message }}</strong>
    </span>
    @enderror
</div>
<div class="form-group mb-3">
    <label>Description</label>
    <textarea class="form-control @error('title') is-invalid @enderror" id="description"
        aria-describedby="description_help" data-validation="required"
        name='description'>{{ isset($result) ? $result['description'] : old('description') }}</textarea>
    <small id="description_help" class="form-text text-muted">The description of the testimonial</small>
    @error('description')
    <span class="invalid-feedback" role="alert">
        <strong>{{ $message }}</strong>
    </span>
    @enderror
</div>
<div class="form-group mb-3">
    <label>Video Link</label>
    <input class="form-control @error('file') is-invalid @enderror" id="file" aria-describedby="file_help" name='file'
        type='text' value='{{ isset($result) ? $result['file'] : old('file') }}'>
    @error('file')
    <span class="invalid-feedback" role="alert">
        <strong>{{ $message }}</strong>
    </span>
    @enderror
</div>
<div class="form-group mb-3">
    <label>User Name</label>
    <input class="form-control @error('user_name') is-invalid @enderror" id="user_name"
        aria-describedby="user_name_help" name='user_name' type='text'
        value='{{ isset($result) ? $result['user_name'] : old('user_name') }}' data-validation="required">
    <small id="user_name_help" class="form-text text-muted">The name of the writer</small>
    @error('user_name')
    <span class="invalid-feedback" role="alert">
        <strong>{{ $message }}</strong>
    </span>
    @enderror
</div>
<div class="form-group mb-3">
    <label>User Photo</label>
    <input class="form-control @error('user_photo') is-invalid @enderror" id="user_photo" name='user_photo' type='text'
        value='{{ isset($result) ? $result['user_photo'] : old('user_photo') }}'>
    @error('user_photo')
    <span class="invalid-feedback" role="alert">
        <strong>{{ $message }}</strong>
    </span>
    @enderror
</div>
<div class="form-group mb-3">
    <label>User Designation</label>
    <input class="form-control @error('user_designation') is-invalid @enderror" id="user_designation"
        aria-describedby="user_designation_help" name='user_designation' type='text'
        value='{{ isset($result) ? $result['user_designation'] : old('user_designation') }}' data-validation="required">
    <small id="user_designation_help" class="form-text text-muted">The description aboute the writer</small>
    @error('user_designation')
    <span class="invalid-feedback" role="alert">
        <strong>{{ $message }}</strong>
    </span>
    @enderror
</div>
