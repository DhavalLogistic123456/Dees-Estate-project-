<?php

namespace Modules\ContactUs\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\View;
use Modules\ContactUs\Entities\ContactUs;
use Illuminate\Contracts\Support\Renderable;
use Illuminate\Http\Request;
use Yajra\DataTables\Facades\DataTables;

class ContactUsController extends Controller {
    public function __construct(ContactUs $model) {
        $this->middleware('permission:contact_us_manage', ['only' => ['index', 'getDatatable', 'create', 'store', 'edit', 'update', 'destroy']]);

        $this->moduleName = config('contactus.name');
        $this->moduleUrl = url(config('contactus.routePrefix') . '/contactus');
        $this->moduleRoute = config('contactus.adminRoute');
        $this->moduleView = 'contactus';
        $this->model = $model;

        View::share('module_name', $this->moduleName);
        View::share('module_route', $this->moduleRoute);
        View::share('module_url', $this->moduleUrl);
        View::share('module_view', $this->moduleView);
    }

    /**
     * Display a listing of the resource.
     *
     * @return Renderable
     */
    public function index() {
        return view('contactus::admin.index');
    }

    public function getDatatable(Request $request) {
        $data = ContactUs::get();

        return DataTables::of($data)
            ->addIndexColumn()
            ->make(true);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     *
     * @return Renderable
     */
    public function store(Request $request) {
    }

    /**
     * Show the specified resource.
     *
     * @param int $id
     *
     * @return Renderable
     */
    public function show($id) {
        return view('contactus::show');
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param int $id
     *
     * @return Renderable
     */
    public function edit($id) {
        return view('contactus::edit');
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param int     $id
     *
     * @return Renderable
     */
    public function update(Request $request, $id) {
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     *
     * @return Renderable
     */
    public function destroy(ContactUs $contactUs) {
        $result = ['status' => false, 'code' => 400, 'message' => 'Something went wrong please try again later.'];
        $deleteContactUs = $contactUs->delete();
        if ($deleteContactUs) {
            $result['status'] = true;
            $result['code'] = 200;
            $result['message'] = 'Contact Us Deleted Successfully';
        }
        return response()->json($result, $result['code']);
    }

    // public function contact()
    // {
    //     return view('front.contact-us');
    // }
}
