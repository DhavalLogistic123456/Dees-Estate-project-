<?php

namespace Modules\RightsManagement\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;

use View;
use DataTables;

class RolesController extends Controller
{
    public function __construct(Role $model)
    {
        $this->moduleName = "Roles";
        $this->moduleRoute = url(config('rightsmanagement.routePrefix') . '/rightsmanagement/roles');
        $this->moduleView = "roles";
        $this->model = $model;

        View::share('module_name', $this->moduleName);
        View::share('module_route', $this->moduleRoute);
        View::share('module_view', $this->moduleView);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view("rightsmanagement::admin.$this->moduleView.index");
    }

    public function getDatatable(Request $request)
    {
        $result = $this->model::all();
        return DataTables::of($result)->addIndexColumn()->make(true);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view("rightsmanagement::admin.general.create");
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            'name' => ['required', 'string', 'max:255'],
            'display_name' => ['required', 'string', 'max:255']
        ]);

        $input = $request->only(['name', 'display_name', 'description']);

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

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $result = $this->model::find($id);
        if ($result) {
            return view("rightsmanagement::admin.general.edit", compact("result"));
        }
        return redirect($this->moduleRoute)->with("error", "Sorry, $this->moduleName not found");
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $this->validate($request, [
            'display_name' => ['required', 'string', 'max:255']
        ]);
        $input = $request->only(['display_name', 'description']);
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

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $result = [];

        $data = $this->model::find($id);

        if ($data) {
            $data = $this->model::whereId($id)->delete();
            if ($data) {
                $result['message'] = $this->moduleName . " Deleted.";
                $result['status'] = true;
            } else {
                $result['message'] = "Error while deleting " . $this->moduleName;
                $result['status'] = false;
            }
        } else {
            $result['message'] = $this->moduleName . " not Found!";
            $result['status'] = false;
        }

        return response()->json($result);
    }
}
