<?php

namespace Modules\RightsManagement\Database\Seeders;

use Illuminate\Database\Seeder;
use Modules\RightsManagement\Entities\Admin;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Hash;

class MakeSuperAdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $roleInput = [
            'name' => 'super_admin',
            'display_name' => 'Super Admin',
            'description' => 'Super Admin',
            'guard_name' => 'admin'
        ];
        $roleExists = Role::where('name', $roleInput['name'])->exists();

        if (!$roleExists) {
            $this->command->info("Creating role for super admin...");
            Role::create($roleInput);
            $this->command->info("Super admin created successfully");
        } else {
            $this->command->info("Super admin already exists.");
        }

        $admin = Admin::role($roleInput['name'])->get();

        if (!$admin->count()) {
            $this->command->info("Adding user...");
            $userInput = [
                'name' => 'Super Admin',
                'email' => 'admin@admin.com',
                'password' => Hash::make('123456')
            ];
            $user = Admin::create($userInput);
            $user->assignRole($roleInput['name']);
            $this->command->info("User created successfully");
        } else {
            $this->command->info("User already exists.");
        }
    }
}
