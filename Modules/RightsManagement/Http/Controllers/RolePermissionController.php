<?php

namespace Modules\RightsManagement\Http\Controllers;

use App\Http\Controllers\Controller;

use Illuminate\Http\Request;

use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

use View;
use DataTables;

class RolePermissionController extends Controller
{
    public function __construct()
    {
        $this->moduleName = "Role Permission";
        $this->moduleRoute = url(config('rightsmanagement.routePrefix') . '/rightsmanagement/role-permission');
        $this->moduleView = "role-permission";

        View::share('module_name', $this->moduleName);
        View::share('module_route', $this->moduleRoute);
        View::share('module_view', $this->moduleView);
    }

    public function index()
    {
        return view("rightsmanagement::admin.$this->moduleView.index");
    }

    public function getDatatable(Request $request)
    {
        $result = Role::with(['permissions']);
        return DataTables::of($result)->addIndexColumn()->make(true);
    }

    public function edit($id)
    {
        $roles = Role::with(['permissions'])->find($id);
        $permissions = Permission::all();

        $permissions = $permissions->groupBy('module_name');
        $viewData = [
            'result' => $roles,
            'permissions' => $permissions
        ];

        return view("rightsmanagement::admin.general.edit", $viewData);
    }

    public function update(Request $request, $id)
    {
        try {
            $role = Role::find($id);
            $permissions = [];

            if ($request->permission) {
                $permissions = $request->permission;
            }

            $role->syncPermissions($permissions);

            return redirect($this->moduleRoute)->with("Permission successfully updated.");
        } catch (\Exception $e) {
            return redirect($this->moduleRoute)->with('error', $e->getMessage());
        }
    }
}
