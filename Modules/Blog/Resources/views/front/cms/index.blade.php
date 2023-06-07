@extends(config('blog.front_defaultLayout'))

@section('title',"cmspages")
@section('seo')
<meta name="title" content="{{ (isset($result)&& $result['meta_title']!='') ? $result['meta_title'] : 'cmspages' }}" />
<meta name="description" content="{{ (isset($result)&& $result['meta_description']!='') ? $result['meta_description'] : 'cmspages' }}" />
<meta name="keywords" content="{{ (isset($result)&& $result['meta_keywords']!='') ? $result['meta_keywords'] : 'cmspages' }}" />
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
    @foreach($results as $result)
        <a class="card" href="{{ route('Cms-front::cms.details', $result['page_title']) }}">
            <div class="card-body">
                <h5 class="card-title">{{ $result['page_title'] }}</h5>
            </div>
        </a>
    @endforeach
</div>
@endsection