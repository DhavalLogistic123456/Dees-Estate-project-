<?php

namespace Modules\Blog\Entities;

use Illuminate\Database\Eloquent\Model;

class Blog extends Model
{
    protected $indexContentColumns = ['description', 'short_description', 'meta_description'];
    protected $indexTitleColumns = ['title', 'sub_title', 'seo_title',];

    public $casts = [
        'is_published' => 'boolean',
    ];

    public $dates = [
        'bloged_at'
    ];

    public $fillable = [
        'slug',
        'title',
        'sub_title',
        'description',
        'short_description',
        'seo_title',
        'meta_description',
        'featured_image',
        'featured_image_thumb',
        'is_published',
        'bloged_at',
        'blog_author',
        'blog_meta_keyword',
    ];

    public function author()
    {
        return $this->belongsTo(Admin::class);
    }

    public function categories()
    {
        return $this->belongsToMany(BlogCategory::class, 'blog_categories_mappings');
    }
}
