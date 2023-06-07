@extends(config('blog.front_defaultLayout'))

@section('title')
        {!! $result['page_title'] !!}
@endsection

@section('seo')

<meta name="title" content="{{ (isset($result)&& $result['meta_title']!='') ? $result['meta_title'] : 'cmspages' }}" />

<meta name="description" content="{{ (isset($result)&& $result['meta_description']!='') ? $result['meta_description'] : 'cmspages' }}" />

<meta name="keywords" content="{{ (isset($result)&& $result['meta_keywords']!='') ? $result['meta_keywords'] : 'cmspages' }}" />
@stop


@push('styles')
 <link href="{{ config('content-builder.content_css') }}" rel="stylesheet" type="text/css" />

<style>
    .is-container {
        padding: 10px 0;
    }
    .header-section {
        border-bottom: 1px solid black;
        padding: 10px 0;
        display: flex;
        flex-direction: column;
    }
    .posted-date {
        text-align: right;
    }
</style>
@endpush

@section('content')
    <div class="content-builder-data">
        {!! $result['html_content'] !!}
    </div>
@endsection