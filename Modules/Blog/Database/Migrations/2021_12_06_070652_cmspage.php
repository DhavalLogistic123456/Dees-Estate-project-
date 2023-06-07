<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Cmspage extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('cmspages', function (Blueprint $table) {
            $table->increments('id');
            $table->string('page_title');
            $table->string('url_key');
            $table->string('locales');
            $table->text('html_content')->nullable();
            $table->text('meta_title')->nullable();
            $table->text('meta_keywords')->nullable();
            $table->text('meta_description')->nullable();
            $table->boolean("is_published")->default(true);
            $table->dateTime("bloged_at")->index()->nullable()->comment("Public posted at time, if this is in future then it wont appear yet");
            $table->timestamps();

            // $table->integer('cms_page_id')->unsigned();
            // $table->unique(['cms_page_id', 'url_key', 'locale']);
            // $table->foreign('cms_page_id')->references('id')->on('cms_pages')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('cmspages');
    }
}
