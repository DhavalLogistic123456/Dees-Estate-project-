<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Modules\RightsManagement\Database\Seeders\MakeSuperAdminSeeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(MakeSuperAdminSeeder::class);
    }
}
