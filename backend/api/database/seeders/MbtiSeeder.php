<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MbtiSeeder extends Seeder
{
    public function run(): void
    {
        $mbtis = [
            ['mbti_code' => '不明', 'mbti_label' => ''],
            ['mbti_code' => 'INTP', 'mbti_label' => '(論理学者)'],
            ['mbti_code' => 'INFP', 'mbti_label' => '(仲介者)'],
            ['mbti_code' => 'INFJ', 'mbti_label' => '(提唱者)'],
            ['mbti_code' => 'INTJ', 'mbti_label' => '(建築家)'],
            ['mbti_code' => 'ISTP', 'mbti_label' => '(巨匠)'],
            ['mbti_code' => 'ISFP', 'mbti_label' => '(冒険家)'],
            ['mbti_code' => 'ISTJ', 'mbti_label' => '(管理者)'],
            ['mbti_code' => 'ISFJ', 'mbti_label' => '(擁護者)'],
            ['mbti_code' => 'ENTP', 'mbti_label' => '(討論者)'],
            ['mbti_code' => 'ENFP', 'mbti_label' => '(運動家)'],
            ['mbti_code' => 'ENFJ', 'mbti_label' => '(主人公)'],
            ['mbti_code' => 'ENTJ', 'mbti_label' => '(指揮官)'],
            ['mbti_code' => 'ESTP', 'mbti_label' => '(起業家)'],
            ['mbti_code' => 'ESFP', 'mbti_label' => '(エンターテイナー)'],
            ['mbti_code' => 'ESTJ', 'mbti_label' => '(幹部)'],
            ['mbti_code' => 'ESFJ', 'mbti_label' => '(領事官)'],
        ];

        DB::table('mbtis')->insert($mbtis);
    }
}
