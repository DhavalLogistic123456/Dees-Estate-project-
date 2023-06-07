<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\View;
use Yajra\DataTables\DataTables;

class UserController extends Controller
{
    public function __construct(User $model)
    {
        $this->middleware('permission:user_view', ['only' => ['index', 'getDatatable']]);
        $this->middleware('permission:user_add', ['only' => ['create', 'store']]);
        $this->middleware('permission:user_edit', ['only' => ['edit', 'update']]);
        $this->middleware('permission:user_delete', ['only' => ['destroy']]);

        $this->moduleName = "Users";
        $this->moduleRoute = url(config('settings.ADMIN_PREFIX') . 'users');
        $this->moduleView = "users";
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
        return view("admin.$this->moduleView.index");
    }

    public function getDatatable()
    {
        $result = $this->model->all();
        return DataTables::of($result)->addIndexColumn()->make(true);
    }


    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view("admin.general.create");
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
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:6', 'confirmed'],
        ]);

        $input = $request->only(['name', 'email']);
        $input['password'] = Hash::make($request->password);

        try {
            $status = $this->model->create($input);
            if ($status) {
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
        $data['result'] = $this->model->where('id', $id)->first();
        return view("admin.general.edit", $data);
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
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users,id,' . $id],
        ]);

        $input = $request->only(['name', 'email']);

        try {
            $user = $this->model->where('id', $id)->first();
            if ($user) {
                $status = $user->update($input);
                if ($status) {
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
        $data = $this->model->where('id', $id)->first();
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