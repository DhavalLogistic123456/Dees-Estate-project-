<?php

namespace Modules\Blog\Http\Controllers;
use Illuminate\Support\Facades\View;

use Illuminate\Contracts\Support\Renderable;
use Illuminate\Http\Request;
use Modules\Blog\Entities\cmspage;
use Illuminate\Routing\Controller;
use Yajra\DataTables\Facades\DataTables;

class UserCmsController extends Controller
{
    public function __construct(cmspage $model)
    {
        $this->moduleName = config('cms.name');
        $this->moduleRoute = url(config('cms.routePrefix') . '/cms');
        $this->moduleView = "cms";
        $this->model = $model;

        View::share('module_name', $this->moduleName);
        View::share('module_route', $this->moduleRoute);
        View::share('module_view', $this->moduleView);
    }

    public function index()
    {
        $data['results'] = $this->model::get();
        return view("blog::front.$this->moduleView.index", $data);
    }

    public function show($slug)
    {
        $data = $this->model::where('page_title',$slug)->first();
        if ($data) {
            $data['result'] = $data;
            return view("blog::front.$this->moduleView.details", $data);
        }
        return redirect($this->moduleRoute)->with("error", "Sorry, $this->moduleName not found");
    }
}
