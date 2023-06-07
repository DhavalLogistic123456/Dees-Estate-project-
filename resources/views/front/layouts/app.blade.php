<!doctype html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">
    @yield('head')
    <title>Larave Starter</title>
    @include('front.include.styles')
</head>
<body>

    @include('front.include.header')

    <!-- Begin page content -->
    <div class="wrapper container">
        @include('front.include.hero')
        @include('front.include.content')
        @yield('content')
    </div>

    @include('front.include.footer')

    @include('front.include.scripts')
</body>
</html>
