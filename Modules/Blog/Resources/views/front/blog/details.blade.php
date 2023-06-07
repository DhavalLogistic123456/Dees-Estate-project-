@extends(config('blog.front_defaultLayout'))
@section('seo')
<meta name="title" content="{{ (isset($blog)&& $blog['seo_title']!='') ? $blog['seo_title'] : 'blog' }}" />
<meta name="description" content="{{ (isset($blog)&& $blog['meta_description']!='') ? $blog['meta_description'] : 'blog' }}" />
<meta name="keywords" content="{{ (isset($blog)&& $blog['blog_meta_keyword']!='')  ? $blog['blog_meta_keyword'] : 'blog' }}" />
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
    <div class="header-section">
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="{{ route('home') }}">Home</a></li>
                <li class="breadcrumb-item"><a href="{{ route('blog-front::blog.list') }}">Blog</a></li>
                <li class="breadcrumb-item active" aria-current="page">{{ $blog['title'] }}</li>
            </ol>
        </nav>
        <h1>{{ $blog['title'] }}</h1>
        <div class="posted-date">
            <span>
                Posted on <a href="#" rel="bookmark"><time datetime="{{ $blog['created_at'] }}">{{ $blog['created_at']->format('M d, Y') }}</time></a>
            </span>
        </div>
    </div>

    <div class="content-builder-data">
        {!! $blog['description'] !!}
    </div>
@endsection