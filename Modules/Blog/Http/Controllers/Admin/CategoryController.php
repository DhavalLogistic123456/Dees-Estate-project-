<?php

namespace Modules\Blog\Http\Controllers\Admin;

use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\View;
use Modules\Blog\Entities\BlogCategory;
use Yajra\DataTables\Facades\DataTables;

class CategoryController extends Controller
{
    public function __construct(BlogCategory $model)
    {
        $this->middleware('permission:blog_category_view', ['only' => ['index', 'getDatatable']]);
        $this->middleware('permission:blog_category_add', ['only' => ['create', 'store']]);
        $this->middleware('permission:blog_category_edit', ['only' => ['edit', 'update']]);
        $this->middleware('permission:blog_category_delete', ['only' => ['destroy']]);

        $this->moduleName = config('blog.category_name');
        $this->moduleRoute = url(config('blog.routePrefix') . '/blog-category');
        $this->moduleView = "category";
        $this->model = $model;

        View::share('module_name', $this->moduleName);
        View::share('module_route', $this->moduleRoute);
        View::share('module_view', $this->moduleView);
    }

    public function index()
    {
        return view("blog::admin.$this->moduleView.index");
    }

    public function getDatatable(Request $request)
    {
        $result = $this->model::all();
        return DataTables::of($result)->addIndexColumn()->make(true);
    }

    public function create()
    {
        return view("blog::admin.general.create");
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'name' => ['required'],
            'slug' => ['required', 'alpha_dash', 'unique:blog_categories,slug'],
            'description' => ['nullable'],
            'seo_title' => ['nullable'],
            'meta_description' => ['nullable']
        ]);

        $input = $request->only(['name', 'slug', 'description', 'seo_title', 'meta_description']);

        try {
            $data = $this->model::create($input);
            if ($data) {
                return redirect($this->moduleRoute)->with("success", "$this->moduleName Created Successfully");
            }
            return redirect($this->moduleRoute)->with("error", "Sorry, Something went wrong please try again");
        } catch (\Exception $e) {
            return redirect($this->moduleRoute)->with('error', $e->getMessage());
        }
    }

    public function show()
    {
        return view('blog::admin.category.show');
    }

    public function edit($id)
    {
        $result = $this->model::whereId($id)->first();
        if ($result) {
            $data['result'] = $result;
            return view("blog::admin.general.edit", $data);
        }
        return redirect($this->moduleRoute)->with("error", "Sorry, $this->moduleName not found");
    }

    public function update(Request $request, $id)
    {
        $this->validate($request, [
            'name' => ['required'],
            'slug' => ['required', 'alpha_dash', 'unique:blog_categories,slug,' . $id],
            'description' => ['nullable'],
            'seo_title' => ['nullable'],
            'meta_description' => ['nullable']
        ]);

        $input = $request->only(['name', 'slug', 'description', 'seo_title', 'meta_description']);

        try {
            $data = $this->model::whereId($id)->first();
            if ($data) {
                $status = $data->update($input);
                if ($status) {
                    return redirect($this->moduleRoute)->with("success", "$this->moduleName Updated Successfully");
                }
            }
            return redirect($this->moduleRoute)->with("error", "Sorry, Something went wrong please try again");
        } catch (\Exception $e) {
            return redirect($this->moduleRoute)->with('error', $e->getMessage());
        }
    }

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
}
