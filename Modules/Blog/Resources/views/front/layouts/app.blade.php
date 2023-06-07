<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Blogs</title>

    @include('blog::front.include.styles')
    @stack('styles')
</head>
<body>

    <!-- Begin page content -->
    <div class="wrapper container">
        @yield('content')
    </div>

    @include('blog::front.include.scripts')

    @stack('scripts')

</body>
</html>