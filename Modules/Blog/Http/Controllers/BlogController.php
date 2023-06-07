<?php

namespace Modules\Blog\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\View;
use Modules\Blog\Entities\Blog;
use Modules\Blog\Entities\BlogCategory;

class BlogController extends Controller
{
    public function __construct(Blog $model)
    {
        $this->moduleName = config('blog.name');
        $this->moduleRoute = url(config('blog.routePrefix') . '/blog');
        $this->moduleView = "blog";
        $this->model = $model;

        View::share('module_name', $this->moduleName);
        View::share('module_route', $this->moduleRoute);
        View::share('module_view', $this->moduleView);
    }

    public function index()
    {
        $data['blogs'] = $this->model::get();
        return view("blog::front.$this->moduleView.index", $data);
    }

    public function show($slug)
    {
        $blog = $this->model::whereSlug($slug)->first();
        if ($blog) {
            $data['blog'] = $blog;
            $data['category'] = BlogCategory::orderBy("name")->pluck('name', 'id');
            return view("blog::front.$this->moduleView.details", $data);
        }
        return redirect($this->moduleRoute)->with("error", "Sorry, $this->moduleName not found");
    }
}
