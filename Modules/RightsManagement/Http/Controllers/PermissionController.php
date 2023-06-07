<?php

namespace Modules\RightsManagement\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Permission;

use Config;
use View;
use DataTables;
use Carbon\Carbon;
use Illuminate\Support\Facades\Artisan;

class PermissionController extends Controller
{
    public function __construct(Permission $model)
    {
        $this->moduleName = "Permission";
        $this->moduleRoute = url(config('rightsmanagement.routePrefix') . '/rightsmanagement/permission');
        $this->moduleView = "permission";
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
        $allConfigPermissoins = collect(Config::get("permissionList"));
        $allPermissoins = $allConfigPermissoins->collapse();
        $newPermissions = [];

        if ($allPermissoins->count()) {
            $allStoredPermissions = Permission::orderBy('name')->pluck('name');
            $newPermissions = $allPermissoins->whereNotIn('name', $allStoredPermissions)->values();
        }

        return view("rightsmanagement::admin.permission.create", compact('newPermissions'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $result = array();
        try {
            $names = $request->get('names');

            $isAlreadyFound = Permission::whereIn('name', $names)->first();

            if ($isAlreadyFound) {
                $result['message'] = "There is one permission already exists";
                $result['code'] = 400;
            } else {
                $allConfigPermissoins = collect(Config::get("permissionList"));

                $allConfigPermissoins = $allConfigPermissoins->map(function ($item, $modelName) {
                    $item = collect($item)->map(function ($obj, $key) use ($modelName) {
                        $obj['module_name'] = strtolower($modelName);
                        return $obj;
                    });

                    return $item;
                });

                $allPermissoins = $allConfigPermissoins->collapse();

                $newPermissions = $allPermissoins->whereIn('name', $names);

                $newPermissions = $newPermissions->each(function ($item, $key) {
                    $item['guard_name'] = config('auth.defaults.guard');
                    $item['created_at'] = Carbon::now()->toDateTimeString();
                    $item['updated_at'] = Carbon::now()->toDateTimeString();

                    Permission::create($item);
                });

                $result['message'] = "Permissions added Successfully.";
                $result['code'] = 200;
            }
        } catch (\Exception $e) {
            $result['message'] = $e->getMessage();
            $result['code'] = 400;
        }

        return response()->json($result, $result['code']);
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
        $input = $request->only(['display_name', 'description']);
        try {
            $result = $this->model::find($id);
            if ($result) {
                $isSaved = $result->update($input);
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

        $responseData = $this->model::find($id);

        if ($responseData) {
            $res = $this->model::whereId($id)->delete();
            if ($res) {
                // Clear Permission Cache
                app()->make(\Spatie\Permission\PermissionRegistrar::class)->forgetCachedPermissions();

                $result['message'] = $this->moduleName . " Deleted.";
                $result['code'] = 200;
            } else {
                $result['message'] = "Error while deleting " . $this->moduleName;
                $result['code'] = 400;
            }
        } else {
            $result['message'] = $this->moduleName . " not Found!";
            $result['code'] = 400;
        }

        return response()->json($result, $result['code']);
    }
}
