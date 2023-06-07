<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>@yield('title') | {{config('app.name')}}</title>
    @include('admin.include.styles')
    @stack('styles')
</head>

<body class="gray-bg">
    @yield('content')
    @include('admin.include.scripts')
    @stack('scripts')
</body>

</html>
