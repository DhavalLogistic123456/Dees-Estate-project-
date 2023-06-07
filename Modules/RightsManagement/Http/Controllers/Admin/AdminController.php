<?php

namespace Modules\RightsManagement\Http\Controllers\Admin;

use App\Http\Controllers\Controller;

use Modules\RightsManagement\Entities\Admin;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\View;
use Yajra\DataTables\DataTables;

class AdminController extends Controller
{
    public function __construct(Admin $model)
    {
        $this->middleware('permission:admin_view', ['only' => ['index', 'getDatatable']]);
        $this->middleware('permission:admin_add', ['only' => ['create', 'store']]);
        $this->middleware('permission:admin_edit', ['only' => ['edit', 'update']]);
        $this->middleware('permission:admin_delete', ['only' => ['destroy']]);

        $this->moduleName = "Admins";
        $this->moduleRoute = url(config('rightsmanagement.routePrefix') . '/admins');
        $this->moduleView = "admins";
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
        $authUser = Auth::guard('admin')->user();
        $result = $this->model::with('roles')->where('id', '!=', $authUser->id)->get();
        return DataTables::of($result)->addIndexColumn()->make(true);
    }


    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $authUser = Auth::guard('admin')->user();
        $roles = Role::select('*');
        if (!$authUser->hasRole('super_admin')) {
            $roles = $roles->where('name', '!=', 'super_admin');
        }
        $data["roles"]  = $roles->get();
        return view("rightsmanagement::admin.general.create", $data);
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
            'email' => ['required', 'string', 'email', 'max:255', 'unique:admins'],
            'password' => ['required', 'string', 'min:6', 'confirmed'],
            'roles' => ['required'],
        ]);

        $input = $request->only(['name', 'email']);
        $input['password'] = Hash::make($request->password);

        try {
            $admin = $this->model::create($input);
            if ($admin) {
                $admin->syncRoles($request->roles);
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
        $admin = $this->model::with(['roles'])->find($id);
        $roles = Role::select('*');
        $authUser = Auth::guard('admin')->user();
        if (!$authUser->hasRole('super_admin')) {
            $roles = $roles->where('name', '!=', 'super_admin');
        }
        $data['roles'] = $roles->get();
        $data['result'] = $admin;
        return view("rightsmanagement::admin.general.edit", $data);
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
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:admins,id,' . $id],
            'roles' => ['required'],
        ]);

        $input = $request->only(['name', 'email']);

        try {
            $admin = $this->model::whereId($id)->first();
            if ($admin) {
                $status = $admin->update($input);
                if ($status) {
                    $admin->syncRoles($request->roles);
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
        $response = [];
        $data = $this->model::find($id);
        if ($data) {
            $data->delete();
            $response['message'] = $this->moduleName . " Deleted.";
            $response['status'] = true;
        } else {
            $response['message'] = $this->moduleName . " not Found!";
            $response['status'] = false;
        }
        return response()->json($response);
    }
}
