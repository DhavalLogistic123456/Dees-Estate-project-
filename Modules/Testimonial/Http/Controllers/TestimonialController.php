<?php

namespace Modules\Testimonial\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\View;
use Modules\Testimonial\Entities\Testimonial;

class TestimonialController extends Controller
{
    public function __construct(Testimonial $model)
    {
        $this->moduleName = config('testimonial.name');
        $this->moduleRoute = url(config('testimonial.routePrefix') . '/testimonial');
        $this->moduleView = "testimonial";
        $this->model = $model;

        View::share('module_name', $this->moduleName);
        View::share('module_route', $this->moduleRoute);
        View::share('module_view', $this->moduleView);
    }

    public function index()
    {
        $data['testimonials'] = $this->model::get();
        return view("testimonial::front.$this->moduleView.index", $data);
    }
}
