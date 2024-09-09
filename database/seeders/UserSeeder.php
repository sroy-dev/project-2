<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \App\Models\User::factory()->create(
            [
                'email' => 'user1@example.com',
                'password' => Hash::make('12345678'),
            ]
        );

        \App\Models\User::factory()->create(
            [
                'email' => 'user2@example.com',
                'password' => Hash::make('12345678'),
            ]
        );

        \App\Models\User::factory()->create(
            [
                'email' => 'user3@example.com',
                'password' => Hash::make('12345678'),
            ]
        );
    }
}
