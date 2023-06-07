<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateBlogCategoriesMappingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('blog_categories_mappings', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger("blog_id")->index();
            $table->unsignedInteger("blog_category_id")->index();

            $table->foreign('blog_id')->references('id')->on('blogs')->onDelete("cascade");
            $table->foreign('blog_category_id')->references('id')->on('blog_categories')->onDelete("cascade");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('blog_categories_mappings');
    }
}
