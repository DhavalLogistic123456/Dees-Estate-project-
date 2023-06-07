<!-- Navigation -->
<nav class="bg-white navbar navbar-expand-lg fixed-top py-sm-3 border-bottom">
    <div class="container">
        <div class="d-flex justify-content-between w-100">
            <div class="d-flex">
                <img src="{{asset('build/front/images/logo.svg')}}">
            </div>
            <div class="offcanvas offcanvas-start justify-content-end" id="navbarTogglerDemo02">
                <div class="d-flex justify-content-end">
                    <button type="button" class="d-lg-none btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <ul class="navbar-main navbar-nav align-items-center mr-auto m-auto justify-content-between">
                    <img src="{{asset('build/front/images/logo.svg')}}" class="d-lg-none">
                    <li class="nav-item">
                        <a class="nav-link home-active" href="{{ route('home') }}">Home
                            <span class="visually-hidden">(current)</span>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Rent</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="{{ route('blog-front::blog.list') }}">Land</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="{{ route('Cms-front::cms.list') }}">Agent</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Contact Us</a>
                    </li>
                </ul>
            </div>
            <div>
                <button class="btn btn-primary-abc d-none d-lg-block">Get Started</button>
            </div>
            <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#navbarTogglerDemo02"
                aria-controls="offcanvasExample" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
        </div>
    </div>
</nav>
