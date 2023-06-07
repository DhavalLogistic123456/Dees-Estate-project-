<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateBlogsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('blogs', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger("user_id")->index()->nullable();
            $table->string("slug")->unique();
            $table->text("blog_author")->nullable();
            $table->string("title")->nullable()->default("New blog post");
            $table->mediumText("description")->nullable();
            $table->string('featured_image')->nullable();
            $table->string('featured_image_thumb')->nullable();
            $table->string("seo_title")->nullable();
            $table->text("meta_description")->nullable();
            $table->text("blog_meta_keyword")->nullable();
            $table->boolean("is_published")->default(true);
            $table->dateTime("bloged_at")->index()->nullable()->comment("Public posted at time, if this is in future then it wont appear yet");
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('blogs');
    }
}
