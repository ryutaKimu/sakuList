<?php

namespace Database\Seeders;

use App\Models\Img;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ImgSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $json = file_get_contents(storage_path('app/data/img.json'));
        $imgs = json_decode($json, true);
        foreach ($imgs as $imgs) {
            Img::create($imgs);
        }
    }
}
