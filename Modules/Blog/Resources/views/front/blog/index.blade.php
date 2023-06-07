@extends(config('blog.front_defaultLayout'))
@section('seo')
<meta name="title" content="{{ (isset($blog) && $blog['seo_title']!='') ? $blog['seo_title'] : 'blog' }}" />
<meta name="description" content="{{ (isset($blog) && $blog['meta_description']!='') ? $blog['meta_description'] : 'blog' }}" />
<meta name="keywords" content="{{ (isset($blog) && $blog['blog_meta_keyword']!='')? $blog['blog_meta_keyword'] : 'blog' }}" />
@stop
@push('styles')
    <style>
        .card-deck .card {
            flex: unset;
            flex-basis: 22%;
            margin: 15px;
            text-decoration: none;
            color: unset;
        }
        .card-img-top {
            max-height: 60%;
            min-height: 60%;
            border-bottom: 1px solid rgba(0, 0, 0, 0.125);
        }
        .card-body .card-title{
            font-weight: bold;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
        }
        .card-body .card-title, p.card-text {
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
        }
        .card-body .card-title {
            font-weight: bold;
            -webkit-line-clamp: 1;
        }
        p.card-text {
            -webkit-line-clamp: 2;
        }
    </style>
@endpush

@section('content')

<div class="card-deck">
    @foreach($blogs as $blog)
        <a class="card" href="{{ route('blog-front::blog.details', $blog['slug']) }}">
            <img class="card-img-top" src="{{ $blog['featured_image'] }}" alt="{{ $blog['title'] }}" onerror="this.onerror=null;this.src='{{ asset('assets/front/images/No_Image_Available.jpg') }}';">
            <div class="card-body">
                <h5 class="card-title">{{ $blog['title'] }}</h5>
                <p class="card-text">{{ $blog['short_description'] }}</p>
                <span class="card-text">
                    <small class="text-muted"><time datetime="{{ $blog['created_at'] }}">{{ $blog['created_at']->format('M d, Y') }}</time></small>
                </span>
            </div>
        </a>
    @endforeach
</div>
@endsection