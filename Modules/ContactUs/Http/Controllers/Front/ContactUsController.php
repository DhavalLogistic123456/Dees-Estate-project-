<?php

namespace Modules\ContactUs\Http\Controllers\Front;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\View;
use Modules\ContactUs\Entities\ContactUs;
use Illuminate\Contracts\Support\Renderable;
use Illuminate\Http\Request;

class ContactUsController extends Controller {
    public function __construct(ContactUs $model) {
        // $this->middleware('permission:contact_us_manage', ['only' => ['index', 'getDatatable']]);

        $this->moduleName = config('contactus.name');
        $this->moduleUrl = url(config('contactus.routePrefix') . '/contactus');
        $this->moduleRoute = config('contactus.frontRoute');
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
    public function view() {
        return view('contactus::front.contact-us');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return Renderable
     */
    public function create(Request $request) {
        // return view('contactus::create');
        // Validation
        $validator = $request->validate([
            'name'                 => 'required|max:191',
            'email'                => 'required|email|regex:/^([a-z0-9\+_\-]+)(\.[a-z0-9\+_\-]+)*@([a-z0-9\-]+\.)+[a-z]{2,6}$/ix',
            'phone'                => 'required|numeric|digits:10',
            'message'              => 'required',
            'g-recaptcha-response' => 'required|recaptcha',
        ], [
            'g-recaptcha-response.recaptcha' => 'Captcha verification failed',
            'g-recaptcha-response.required'  => 'Please complete the captcha',
        ]);

        $contact = new ContactUs();
        // Contact::create($request);
        $contact->name = $request->input('name');
        $contact->email = $request->input('email');
        $contact->phone = $request->input('phone');
        $contact->message = $request->input('message');
        $contact->save();

        if ($request->ajax()) {
            return response()->json(['message_sent' => 'Your Message has been sent successfully!']);
        }

        return back()->with('message_sent', 'Your Message has been sent successfully!');
    }
}
