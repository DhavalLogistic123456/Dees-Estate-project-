<?php

namespace Modules\Blog\Http\Controllers\Admin;
use Illuminate\Support\Facades\View;
use Carbon\Carbon;

use Illuminate\Contracts\Support\Renderable;
use Illuminate\Http\Request;
use Modules\Blog\Entities\cmspage;
use Illuminate\Routing\Controller;
use Yajra\DataTables\Facades\DataTables;


class CmsController extends Controller
{
    public function __construct(cmspage $model)
    {
        $this->moduleName = 'Cms';
        $this->moduleRoute = url(config('blog.routePrefix') . '/cms');
        $this->moduleView = "cms";
        $this->model=$model;

        View::share('module_name', $this->moduleName);
        View::share('module_route', $this->moduleRoute);
        View::share('module_view', $this->moduleView);
    }
    /**
     * Display a listing of the resource.
     * @return Renderable
     */
    public function index()
    {
        return view("blog::admin.$this->moduleView.index");
    }

    public function getdatatable(Request $request)
    {
            $data = cmspage::latest()->get();
                    return DataTables::of($data)
                        ->addIndexColumn()
                        ->make(true);
    }

    /**
     * Show the form for creating a new resource.
     * @return Renderable
     */
    public function create()
    {
        return view('blog::admin.general.create');
    }

    /**
     * Store a newly created resource in storage.
     * @param Request $request
     * @return Renderable
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'page_title' => ['required', 'string', 'min:1', 'max:255'],
            'url_key' => ['required', 'string', 'min:1', 'max:150', 'unique:cmspages,url_key,'],
            'locales' => ['required'],
            'html_content' => ['nullable', 'max:2000000'],
            'meta_description' => ['nullable', 'string', 'min:1', 'max:1000'],
            'meta_title' => ['nullable', 'string', 'min:1', 'max:255'],
            'meta_keywords' => ['nullable'],
            'is_published' => ['nullable', 'boolean'],
            'bloged_at' => ['nullable', function ($attribute, $value, $fail) {
                try {
                    Carbon::createFromFormat('Y-m-d H:i:s', $value);
                } catch (\Exception $e) {
                    return $fail('Bloged at is not a valid date');
                }
            }],
        ]);
        $input = $request->only(['page_title', 'url_key','bloged_at','is_published', 'locales', 'html_content', 'meta_description', 'meta_title', 'meta_keywords']);
        $data = cmspage::create($input);
        return redirect($this->moduleRoute)->with("success", "$this->moduleName Created Successfully");
    }

    /**
     * Show the specified resource.
     * @param int $id
     * @return Renderable
     */
    public function show($id)
    {
        return view('blog::admin.general.create');
    }

    /**
     * Show the form for editing the specified resource.
     * @param int $id
     * @return Renderable
     */
    public function edit($id)
    {
        $result = $this->model::whereId($id)->first();
        if ($result) {
            $data['result'] = $result;
            return view("blog::admin.general.edit", $data);
        }
        return redirect($this->moduleRoute)->with("error", "Sorry, $this->moduleName not found");
    }

    /**
     * Update the specified resource in storage.
     * @param Request $request
     * @param int $id
     * @return Renderable
     */
    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'page_title' => ['required', 'string', 'min:1', 'max:255'],
            'url_key' => ['required', 'string', 'min:1', 'max:150','unique:cmspages,url_key,' . $id],
            'locales' => ['required'],
            'html_content' => ['nullable', 'max:2000000'],
            'meta_description' => ['nullable', 'string', 'min:1', 'max:1000'],
            'meta_title' => ['nullable', 'string', 'min:1', 'max:255'],
            'meta_keywords' => ['nullable'],
            'is_published' => ['nullable', 'boolean'],
            'bloged_at' => ['nullable', function ($attribute, $value, $fail) {
                try {
                    Carbon::createFromFormat('Y-m-d H:i:s', $value);
                } catch (\Exception $e) {
                    return $fail('Bloged at is not a valid date');
                }
            }],
        ]);

        $input = $request->only(['page_title', 'url_key', 'locales','bloged_at','is_published','html_content', 'meta_description', 'meta_title', 'meta_keywords']);
        $data = $this->model::whereId($id)->first();
        $data->update($input);
        return redirect($this->moduleRoute)->with("success", "$this->moduleName Updated Successfully");
    }

    /**
     * Remove the specified resource from storage.
     * @param int $id
     * @return Renderable
     */
    public function destroy($id)
    {
        $response = [];
        $data = $this->model::find($id);
        if ($data) {
            $data->delete();
            $response['message'] = "$this->moduleName Deleted.";
            $response['status'] = true;
        } else {
            $response['message'] = "$this->moduleName not Found!";
            $response['status'] = false;
        }
        return response()->json($response);
    }

    public function buildWithContentBuilder(Request $request, $id = null)
    {
        $viewData = [];
        $result = $this->model::whereId($id)->first();

        if ($result) {
            $viewData['result'] = $result;
        }

        return view("blog::admin.content-builder.index", $viewData);
    }

    public function setDescriptionByContentBuilder(Request $request, $id)
    {
        try {
            $data = $this->model::whereId($id)->first();

            if ($data) {
                $input = $request->only(['html_content']);

                $status = $data->update($input);

                if ($status) {
                    return redirect()->route('blog::cms.edit', ['blog' => $id]);
                }
            }
            return redirect($this->moduleRoute)->with("error", "Sorry, Something went wrong please try again");
        } catch (\Exception $e) {
            return redirect($this->moduleRoute)->with('error', $e->getMessage());
        }
    }
}
