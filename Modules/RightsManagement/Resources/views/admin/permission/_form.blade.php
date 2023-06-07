<div class="row">
    <div class="col-md-6">
        <div class="form-group mb-3">
            <label>Name</label>
            <input id="name" type="text" class="form-control @error('name') is-invalid @enderror" name="name"
                data-validation="required" value="{{ isset($result) ? $result['name'] : old('name') }}" disabled>
            @error('name')
            <span class="invalid-feedback" role="alert">
                <strong>{{ $message }}</strong>
            </span>
            @enderror
        </div>
    </div>
    <div class="col-md-6">
        <div class="form-group mb-3">
            <label>Display name</label>
            <input id="display_name" type="text" class="form-control @error('display_name') is-invalid @enderror"
                name="display_name" value="{{ isset($result) ? $result['display_name'] : old('display_name') }}">
            @error('display_name')
            <span class="invalid-feedback" role="alert">
                <strong>{{ $message }}</strong>
            </span>
            @enderror
        </div>
    </div>
    <div class="col-md-12">
        <div class="form-group mb-3">
            <label>Description</label>
            <textarea id="description" class="form-control @error('description') is-invalid @enderror"
                name="description">{{ isset($result) ? $result['description'] : old('description') }}</textarea>
            @error('description')
            <span class="invalid-feedback" role="alert">
                <strong>{{ $message }}</strong>
            </span>
            @enderror
        </div>
    </div>
</div>
