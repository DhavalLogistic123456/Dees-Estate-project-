<?php

namespace Modules\Media\Http\Controllers;

use App\Http\Controllers\Controller;
use Modules\Media\Entities\Media;
use Illuminate\Support\Facades\View;

class MediaController extends Controller
{
    public function __construct(Media $model)
    {
        $this->moduleName = config('media.name');
        $this->moduleRoute = url(config('media.routePrefix') . '/media');
        $this->moduleView = "media";
        $this->model = $model;

        View::share('module_name', $this->moduleName);
        View::share('module_route', $this->moduleRoute);
        View::share('module_view', $this->moduleView);
    }

    public function index()
    {
        $data['media'] = $this->model::get();
        return view("media::front.$this->moduleView.index", $data);
    }
}
