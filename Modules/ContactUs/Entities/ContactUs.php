<?php

namespace Modules\ContactUs\Entities;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Hyn\Tenancy\Traits\UsesSystemConnection;

class ContactUs extends Model {
    use UsesSystemConnection,HasFactory;
}
