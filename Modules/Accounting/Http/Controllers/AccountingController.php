<?php

namespace Modules\Accounting\Http\Controllers;

use Illuminate\Contracts\Support\Renderable;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

class AccountingController extends Controller
{
    public function index()
    {
        return view('accounting::index');
    }
}
