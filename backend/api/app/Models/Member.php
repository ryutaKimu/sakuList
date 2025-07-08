<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Member extends Model
{
    const GENERATION_ALL = 0;
    const GENERATION_GRADUATED = 100;
    const MBTI_ALL = "すべて";

    protected $fillable = [
        'name',
        'furigana',
        'birthday',
        'generation',
        'prefecture',
        'img_path',
        'mbti',
        'graduated'
    ];

    public function mbti()
    {
        return $this->belongsTo(Mbti::class);
    }

    public function generation()
    {
        return $this->belongsTo(Generation::class);
    }

    public function imgs()
    {
        return $this->hasMany(Img::class);
    }
}
