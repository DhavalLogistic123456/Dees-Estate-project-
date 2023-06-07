<?php

namespace Modules\Blog\Entities;

use Illuminate\Database\Eloquent\Model;

class cmspage extends Model
{
    public $fillable = [
        'page_title',
        'url_key',
        'locales',
        'html_content',
        'meta_description',
        'meta_title',
        'meta_keywords',
        'is_published',
        'bloged_at',
    ];
}
