<?php

namespace App\Services;

use App\Models\Mbti;

class MbtiService
{

  public function fetchMembersByMbti()
  {
    $mbti = Mbti::all();
    return $mbti;
  }
}
