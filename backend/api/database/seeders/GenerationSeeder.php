<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class GenerationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $generations = [
            ['generation' => 1],
            ['generation' => 2],
            ['generation' => 3],
            ['generation' => 4]
        ];
        DB::table('generations')->insert($generations);
    }
}
