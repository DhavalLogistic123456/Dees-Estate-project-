<?php

namespace Modules\Testimonial\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\View;
use Modules\Testimonial\Entities\Testimonial;
use Yajra\DataTables\Facades\DataTables;

class TestimonialController extends Controller
{
    public function __construct(Testimonial $model)
    {
        $this->middleware('permission:testimonial_view', ['only' => ['index', 'getDatatable']]);
        $this->middleware('permission:testimonial_add', ['only' => ['create', 'store']]);
        $this->middleware('permission:testimonial_edit', ['only' => ['edit', 'update']]);
        $this->middleware('permission:testimonial_delete', ['only' => ['destroy']]);

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
        return view("testimonial::admin.$this->moduleView.index");
    }

    public function getDatatable(Request $request)
    {
        $result = $this->model::all();
        return DataTables::of($result)->addIndexColumn()->make(true);
    }

    public function create()
    {
        return view("testimonial::admin.general.create");
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'title' => ['required', 'string', 'min:1', 'max:255'],
            'description' => ['required', 'string', 'min:1', 'max:10000'],
            'user_name' => ['required', 'string', 'min:1'],
            'user_designation' => ['required', 'string'],
            'file' => ['nullable', 'string'],
            'user_photo' => ['nullable', 'string'],
        ]);

        $input = $request->only(['title', 'description', 'user_name', 'user_designation', 'file', 'user_photo']);

        try {
            $data = $this->model::create($input);
            if ($data) {
                return redirect($this->moduleRoute)->with("success", $this->moduleName . " Created Successfully");
            }
            return redirect($this->moduleRoute)->with("error", "Sorry, Something went wrong please try again");
        } catch (\Exception $e) {
            return redirect($this->moduleRoute)->with('error', $e->getMessage());
        }
    }

    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     * @param int $id
     * @return Response
     */
    public function edit($id)
    {
        $result = $this->model::find($id);
        if ($result) {
            return view("testimonial::admin.general.edit", compact("result"));
        }
        return redirect($this->moduleRoute)->with("error", "Sorry, $this->moduleName not found");
    }

    public function update(Request $request, $id)
    {
        $this->validate($request, [
            'title' => ['required', 'string', 'min:1', 'max:255'],
            'description' => ['required', 'string', 'min:1', 'max:10000'],
            'user_name' => ['required', 'string', 'min:1'],
            'user_designation' => ['required', 'string'],
            'file' => ['nullable', 'string'],
            'user_photo' => ['nullable', 'string'],
        ]);

        $input = $request->only(['title', 'description', 'user_name', 'user_designation', 'file', 'user_photo']);

        try {
            $data = $this->model::find($id);
            if ($data) {
                $isSaved = $data->update($input);
                if ($isSaved) {
                    return redirect($this->moduleRoute)->with("success", $this->moduleName . " Updated Successfully");
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
