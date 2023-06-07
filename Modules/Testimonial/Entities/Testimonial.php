<?php

namespace Modules\Testimonial\Entities;

use Illuminate\Database\Eloquent\Model;

class Testimonial extends Model
{
    protected $guarded = ['id'];

    public function getUserPhotoAttribute($value)
    {
        return ($value) ? $value : url('assets/admin/images/default.jpg');
    }
}
