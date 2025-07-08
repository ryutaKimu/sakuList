<?php

namespace Database\Seeders;

use App\Models\Member;
use Illuminate\Database\Seeder;

class MemberSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $json = file_get_contents(storage_path('app/data/member.json'));
        $members = json_decode($json, true);

        foreach ($members as $member) {
            Member::create($member);
        }
    }
}
