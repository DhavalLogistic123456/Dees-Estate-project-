<?php

namespace Modules\Blog\Http\Controllers\Admin;

use App\Http\Controllers\Controller;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\View;
use Modules\Blog\Entities\Blog;
use Modules\Blog\Entities\BlogCategory;
use Yajra\DataTables\Facades\DataTables;

class BlogsController extends Controller
{
    public function __construct(Blog $model)
    {
        $this->middleware('permission:blog_view', ['only' => ['index', 'getDatatable']]);
        $this->middleware('permission:blog_add', ['only' => ['create', 'store']]);
        $this->middleware('permission:blog_edit', ['only' => ['edit', 'update']]);
        $this->middleware('permission:blog_delete', ['only' => ['destroy']]);

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
        $data['category'] = BlogCategory::orderBy("name")->get();
        return view("blog::admin.$this->moduleView.index", $data);
    }

    public function getDatatable(Request $request)
    {
        return DataTables::eloquent(
            $this->model::with(['categories' => function ($query) {
                $query->orderBy('name');
            }])
        )
            ->filter(function ($query) {
                if (request()->has('category') && request('category') != "") {
                    $query->whereHas('categories', function ($subquery) {
                        $subquery->where('slug', request('category'));
                    });
                }
            })
            ->addIndexColumn()
            ->make(true);
    }

    public function create()
    {
        $data['category'] = BlogCategory::orderBy("name")->pluck('name', 'id');
        return view("blog::admin.general.create", $data);
    }

    public function store(Request $request)
    {

        $this->validate($request, [
            'title' => ['required', 'string', 'min:1', 'max:255'],
            'sub_title' => ['nullable', 'string', 'min:1', 'max:255'],
            'description' => ['nullable', 'max:2000000'],
            'meta_description' => ['nullable', 'string', 'min:1', 'max:1000'],
            'short_description' => ['nullable', 'string', 'max:30000'],
            'is_published' => ['nullable', 'boolean'],
            'slug' => ['required', 'string', 'min:1', 'max:150', 'alpha_dash', 'unique:blogs,slug'],
            'seo_title' => ['nullable', 'string', 'min:1', 'max:255'],
            'featured_image' => ['nullable'],
            'featured_image_thumb' => ['nullable'],
            'category' => ['nullable', 'array'],
            'blog_author' => ['nullable','string'],
            'blog_meta_keyword' => ['nullable', 'string', 'min:1', 'max:1000'],

            'bloged_at' => ['nullable', function ($attribute, $value, $fail) {
                try {
                    Carbon::createFromFormat('Y-m-d H:i:s', $value);
                } catch (\Exception $e) {
                    return $fail('Bloged at is not a valid date');
                }
            }],
        ]);

        $input = $request->only(['title', 'sub_title', 'description', 'meta_description','blog_meta_keyword','blog_author','short_description', 'slug', 'bloged_at', 'featured_image', 'featured_image_thumb', 'seo_title', 'is_published']);

        try {

            if (!$input['bloged_at']) {
                $input['bloged_at'] = Carbon::now();
            }
            $input['user_id'] = \Auth::guard('admin')->user()->id;
            $data = $this->model::create($input);
            if ($data) {
                if ($request->has('category')) {
                    $categories = BlogCategory::whereIn("id", $request->category)->pluck("id")->toArray();
                    $data->categories()->sync($categories);
                }
                return redirect($this->moduleRoute)->with("success", "$this->moduleName Created Successfully");
            }
            return redirect($this->moduleRoute)->with("error", "Sorry, Something went wrong please try again");
        } catch (\Exception $e) {
            return redirect($this->moduleRoute)->with('error', $e->getMessage());
        }
    }

    public function show()
    {
        return view('blog::admin.blogs.show');
    }

    public function edit($id)
    {
        $result = $this->model::whereId($id)->first();
        if ($result) {
            $data['result'] = $result;
            $data['category'] = BlogCategory::orderBy("name")->pluck('name', 'id');
            return view("blog::admin.general.edit", $data);
        }
        return redirect($this->moduleRoute)->with("error", "Sorry, $this->moduleName not found");
    }

    public function update(Request $request, $id)
    {

        $this->validate($request, [
            'title' => ['required', 'string', 'min:1', 'max:255'],
            'sub_title' => ['nullable', 'string', 'min:1', 'max:255'],
            'description' => ['required_without:use_view_file', 'max:2000000'],
            'meta_description' => ['nullable', 'string', 'min:1', 'max:1000'],
            'short_description' => ['nullable', 'string', 'max:30000'],
            'is_published' => ['nullable', 'boolean'],
            'slug' => ['required', 'string', 'min:1', 'max:150', 'alpha_dash', 'unique:blogs,slug,' . $id],
            'seo_title' => ['nullable', 'string', 'min:1', 'max:255'],
            'featured_image' => ['nullable'],
            'featured_image_thumb' => ['nullable'],
            'category' => ['nullable', 'array'],
            'blog_author' => ['nullable','string'],
            'blog_meta_keyword' => ['nullable', 'string', 'min:1', 'max:1000'],
            'bloged_at' => ['nullable', function ($attribute, $value, $fail) {
                try {
                    Carbon::createFromFormat('Y-m-d H:i:s', $value);
                } catch (\Exception $e) {
                    return $fail('Bloged at is not a valid date');
                }
            }],
        ]);

        $input = $request->only(['title', 'sub_title', 'description','blog_meta_keyword','blog_author', 'meta_description', 'short_description', 'slug', 'bloged_at', 'featured_image', 'featured_image_thumb', 'seo_title', 'is_published']);

        try {
            $data = $this->model::whereId($id)->first();

            if ($data) {
                $status = $data->update($input);
                if ($status) {
                    if ($request->has('category')) {
                        $categories = BlogCategory::whereIn("id", $request->category)->pluck("id")->toArray();
                        $data->categories()->sync($categories);
                    }
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

    public function buildWithContentBuilder(Request $request, $id = null)
    {
      
        $viewData = [];
        $blog = $this->model::whereId($id)->first();
        if ($blog) {
           
            $viewData['blog'] = $blog;
        }
        return view("blog::admin.content-builder.index", $viewData);
    }

    public function setDescriptionByContentBuilder(Request $request, $id)
    {
        try {
            $data = $this->model::whereId($id)->first();

            if ($data) {
                $input = $request->only(['description']);

                $status = $data->update($input);

                if ($status) {
                    return redirect()->route('blog::blog.edit', ['blog' => $id]);
                }
            }
            return redirect($this->moduleRoute)->with("error", "Sorry, Something went wrong please try again");
        } catch (\Exception $e) {
            return redirect($this->moduleRoute)->with('error', $e->getMessage());
        }
    }
}
