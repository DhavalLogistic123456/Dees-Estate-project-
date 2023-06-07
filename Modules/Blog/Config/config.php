<?php

return [
    'name' => 'Blog',
    'category_name' => 'Blog category',
    'routePrefix' => 'admins', // no trailing slash required
    'authGuard' => 'admin',
    'defaultLayout' => 'admin.layouts.app', // no trailing fullstop required
    'front_defaultLayout' => 'front.layouts.app', // no trailing fullstop required

    'blog_prefix' => "blog", // used in routes.php. If you want to your http://yoursite.com/latest-news (or anything else), then enter that here. Default: blog
    'admin_prefix' => "blog_admin", // similar to above, but used for the admin panel for the blog. Default: blog_admin

    'per_page' => 10, // how many posts to show per page on the blog index page. Default: 10


    'image_upload_enabled' => true, // true or false, if image uploading is allowed.
    'blog_upload_dir' => "blog_images", // this should be in public_path() (i.e. /public/blog_images), and should be writable


    'memory_limit' => '2048M', // This is used when uploading images :
    // @ini_set('memory_limit', config("blogetc.memory_limit"));
    // See PHP.net for detailso
    // Set to false to not set any value.


    //if true it will echo out  (with {!! !!}) the blog post with NO escaping! This is not safe if you don't trust your blog post writers! Understand the risks by leaving this to true
    // (you should disable this (set to false) if you don't trust your blog writers).
    // This will apply to all posts (past and future).
    // Do not set to true if you don't trust your blog post writers. They could put in any HTML or JS code.
    'echo_html' => true, // default true

    // If strip_html is true, it'll run strip_tags() before escaping and echoing.
    // It doesn't add any security advantage, but avoids any html tags appearing if you have disabled echoing plain html.
    //  Only works if echo_html is false.
    'strip_html' => false, // Default: false.

    //  Only works if echo_html if false. If auto_nl2br is true, the output will be run through nl2br after escaping.
    'auto_nl2br' => true, // Default: true.

    // use the ckeditor WYWIWYG (rich text editor) for formatting your HTML blog posts.
    // This will load scripts from https://cdn.ckeditor.com/4.10.0/standard/ckeditor.js
    // echo_html must be set to true for this to have an effect.
    'use_wysiwyg' => true, // Default: true


    'image_quality' => 80, // what image quality to use when saving images. higher = better + bigger sizes. Around 80 is normal.


    'image_sizes' => [

        // if you set 'enabled' to false, it will clear any data for that field the next time any row is updated. However it will NOT delete the .jpg file on your file server.
        // I recommend that you only change the enabled field before any images have been uploaded!

        // Also, if you change the w/h (which are obviously in pixels :) ), it won't change any previously uploaded images.

        // There must be only three sizes - image_large, image_medium, image_thumbnail.


        'image_large' => [ // this key must start with 'image_'. This is what the DB column must be named
            'w' => 1000, // width in pixels
            'h' => 700, //height
            'basic_key' => "large", // same as the main key, but WITHOUT 'image_'.
            'name' => "Large", // description, used in the admin panel
            'enabled' => true, // see note above
            'crop' => true, // if true then we will crop and resize to exactly w/h. If false then it will maintain proportions, with a max width of 'w' and max height of 'h'
        ],
        'image_medium' => [ // this key must start with 'image_'. This is what the DB column must be named
            'w' => 600, // width in pixels
            'h' => 400, //height
            'basic_key' => "medium", // same as the main key, but WITHOUT 'image_'.
            'name' => "Medium", // description, used in the admin panel
            'enabled' => true, // see note above
            'crop' => true, // if true then we will crop and resize to exactly w/h. If false then it will maintain proportions, with a max width of 'w' and max height of 'h'. If you use these images as part of your website template then you should probably have this to true.
        ],
        'image_thumbnail' => [ // this key must start with 'image_'. This is what the DB column must be named
            'w' => 150, // width in pixels
            'h' => 150, //height
            'basic_key' => "thumbnail", // same as the main key, but WITHOUT 'image_'.
            'name' => "Thumbnail", // description, used in the admin panel
            'enabled' => true, // see note above
        ],

        // you can add more fields here, but make sure that you create the relevant database columns too!
        // They must be in the same format as the default ones - image_xxxxx (and this db column must exist on the blog_etc_posts table)

        /*
        'image_custom_example_size' => [ // << MAKE A DB COLUM WITH THIS NAME.
                                         //   You can name it whatever you want, but it must start with image_
            'w' => 123,                  // << DEFINE YOUR CUSTOM WIDTH/HEIGHT
            'h' => 456,
            'basic_key' =>
                  "custom_example_size", // << THIS SHOULD BE THE SAME AS THE KEY, BUT WITHOUT THE image_
            'name' => "Test",            // A HUMAN READABLE NAME
            'enabled' => true,           // see note above about enabled/disabled
            ],
        */
        // Create the custom db table by doing
        //  php artisan make:migration --table=blog_etc_posts AddCustomBlogImageSize
        //   then adding in the up() method:
        //       $table->string("image_custom_example_size")->nullable();
        //    and in the down() method:
        //        $table->dropColumn("image_custom_example_size"); for the down()
        // then run
        //   php artisan migrate
    ],


    'captcha' => [
        'captcha_enabled' => true, // true = we should use a captcha, false = turn it off. If comments are disabled this makes no difference.
        'captcha_type' => \WebDevEtc\BlogEtc\Captcha\Basic::class, // this should be a class that implements the \WebDevEtc\BlogEtc\Interfaces\CaptchaInterface interface
        'basic_question' => "What is the opposite of white?", // a simple captcha question to always ask (if captcha_type is set to 'basic'
        'basic_answers' => "black,dark", // comma separated list of possible answers. Don't worry about case.
    ],

    ////////// RSS FEED

    'rssfeed' => [

        'should_shorten_text' => true, // boolean. Default: true. Should we shorten the text in rss feed?
        'text_limit' => 100, // max length of description text in the rss feed
        'posts_to_show_in_rss_feed' => 10,  // how many posts should we show in the rss feed
        'cache_in_minutes' => 60, // how long (in minutes) to cache the RSS blog feed for.
        'description' => "Our blog post RSS feed", //description for the RSS feed
        'language' => "en", // see https://www.w3.org/TR/REC-html40/struct/dirlang.html#langcodes
    ],

    'search' => [
        'search_enabled' => false, // is search enabled? By default this is disabled, but you can easily turn it on.
    ],


];
