

<div class="form-group mb-3">
    <label for="page_title">Page Title</label>
    <input type="text" class="form-control" required id="page_title" aria-describedby="page_title" name='page_title'
        oninput="" value="{{ isset($result) ? $result['page_title'] : old('page_title') }}">
    <small id="page_title" class="form-text text-muted">The title of the page</small>
    @if ($errors->has('page_title'))
        <span class="has-error">
            <strong>{{ $errors->first('page_title') }}</strong>
        </span>
    @endif
</div>

<div class='row'>
    <div class='col-sm-12 col-md-4'>
        <div class="form-group mb-3">
            <label for="url_key">URL Key</label>
            <input type="text" class="form-control" id="url_key" aria-describedby="url_key" name='url_key'
                value="{{ isset($result) ? $result['url_key'] : old('url_key') }}">
            <small id="url_key" class="form-text text-muted">The URL key of the page </small>
            @if ($errors->has('url_key'))
            <span class="has-error">
                    <strong>{{ $errors->first('url_key') }}</strong>
                </span>
            @endif
        </div>
    </div>
    <div class="col-md-6">
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
    <div class="col-md-6">
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
    <div class='col-sm-12 '>
            <div class="form-group mb-3"><label for="url-key" class="required">Locales</label>
            <select multiple="multiple" type="text" name="locales" value="" data-vv-as="&quot;Locales&quot;"class="form-control"
            aria-required="true" aria-invalid="false">
            <option value="1"  {{ (isset($result) && $result['locales']==1 ? "selected" : "") }}>English</option>
            </select>
            </div>
    </div>
 </div>


    <div class="form-group mb-3">
        <div class="d-flex justify-content-between mb-1">
            <label for="html_content">Post Body
                @if(config("liblog.echo_html"))
                    (HTML)
                @else
                (Html will be escaped)
                @endif

            </label>
            @if(isset($result['id']))
                <a class="btn btn-sm btn-success w-25" href="{{ route('Cms::build.contentbuilder', $result['id']) }}" target="_blank">Edit with content builder</a>
            @endif
        </div>


        <textarea style='min-height:600px;' class="form-control {{ (config('cms.echo_html')) ? 'Cms_html_content_editor' : ''  }}" id="html_content" aria-describedby="Cms_body_help"
                name='html_content'>{{ isset($result) ? $result['html_content'] : old('html_content') }}</textarea>

        <div class='alert alert-danger'>
            Please note that any HTML (including any JS code) that is entered here will be
            echoed (without escaping)
        </div>
        @if ($errors->has('html_content'))
            <span class="has-error">
                <strong>{{ $message }}</strong>
            </span>
        @endif
    </div>
<div class="form-group mb-3">
    <label for="meta_title">Meta Title</label>
    <input type="text" class="form-control" required id="meta_title" aria-describedby="meta_title" name='meta_title'
        oninput="" value="{{ isset($result) ? $result['meta_title'] : old('meta_title') }}">
    <small id="meta_title" class="form-text text-muted">Meta Title of the page</small>
    @if ($errors->has('meta_title'))
        <span class="has-error">
            <strong>{{ $errors->first('meta_title') }}</strong>
        </span>
    @endif
</div>
<div class="form-group mb-3">
    <label for="meta_keywords">Meta Keywords</label>
    <input type="text" class="form-control" required id="meta_keywords" aria-describedby="meta_keywords" name='meta_keywords'
        oninput="" value="{{ isset($result) ? $result['meta_keywords'] : old('meta_keywords') }}">
    <small id="meta_keywords" class="form-text text-muted">Meta Keywords of the page</small>
    @if ($errors->has('meta_keywords'))
        <span class="has-error">
            <strong>{{ $errors->first('meta_keywords') }}</strong>
        </span>
    @endif
</div>
<div class="form-group mb-3">
    <label for="meta_description">Meta Description</label>
    <input type="text" class="form-control" required id="meta_description" aria-describedby="meta_description" name='meta_description'
        oninput="" value="{{ isset($result) ? $result['meta_description'] : old('meta_description') }}">
    <small id="meta_description" class="form-text text-muted">Meta Description of the page</small>
    @if ($errors->has('meta_description'))
        <span class="has-error">
            <strong>{{ $errors->first('meta_description') }}</strong>
        </span>
    @endif
</div>


