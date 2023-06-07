<?php

namespace Modules\Blog\Entities;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class BlogCategory extends Model
{
    use SoftDeletes;

    public $fillable = [
        'name',
        'slug',
        'description',
        'seo_title',
        'meta_description',
    ];

    public function blogs()
    {
        return $this->belongsToMany(Blogs::class, 'blog_categories_mappings');
    }
}
