<div class="row">
    <div class="col-md-6">
        <div class="form-group mb-3">
            <label>Role name</label>
            <input id="name" type="text" class="form-control @error('name') is-invalid @enderror" name="name"
                data-validation="required" value="{{ isset($result) ? $result['name'] : old('name') }}"
                {{ isset($result) ? 'disabled' : '' }}>
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
                name="display_name" data-validation="required"
                value="{{ isset($result) ? $result['display_name'] : old('display_name') }}">
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
            <textarea name="description" id="discription"
                class="form-control @error('description') is-invalid @enderror"
                rows="3">{{ isset($result) ? $result['description'] : old('description') }}</textarea>
            @error('description')
            <span class="invalid-feedback" role="alert">
                <strong>{{ $message }}</strong>
            </span>
            @enderror
        </div>
    </div>
</div>
