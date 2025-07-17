<?php

namespace App\Services;

use App\Models\Member;

class MemberService
{
  /**
   * @param int $generationId
   * @return collection 
   */

  public function searchMembersByGeneration(int $generationId)
  {
    $query = Member::with(['generation', 'mbti', 'imgs']);

    //全ての期生を表示
    if ($generationId === Member::GENERATION_ALL) {
      $query
        ->orderBy('generation_id', 'asc')
        ->orderBy('furigana', 'asc');
    } elseif ($generationId === Member::GENERATION_GRADUATED) {
      //期生順に卒業生のみ表示
      $query
        ->where('graduated', true)
        ->orderBy('generation_id', 'asc')
        ->orderBy('furigana', 'asc');
    } else {
      $query
        ->where('generation_id', $generationId)
        ->orderBy('furigana', 'asc');
    }


    return $query->get();
  }

  public function searchMember($id)
  {
    $member = Member::find($id);
    return $member;
  }

  /**
   * @param string $mbtiCode
   * @return collection 
   */
  public function searchMemberByMbti($mbtiCode)
  {
    $query = Member::with(['imgs', 'generation', 'mbti']);
    if ($mbtiCode === Member::MBTI_ALL) {
      $query->orderBy('generation_id', 'asc')->orderBy('furigana', 'asc');
    } else {
      $query->whereHas('mbti', function ($q) use ($mbtiCode) {
        $q->where('mbti_code', $mbtiCode);
      })
        ->orderBy('furigana', 'asc');
    }

    return $query->get();
  }

  /**
   * @param int $id
   * @return Model $member
   */

  public function displayMemberDetail(int $id)
  {
    $member = Member::find($id);
    return $member;
  }
}
