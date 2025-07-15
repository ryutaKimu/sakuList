<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MemberResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $memberData = [
            'id' => $this->id,
            'name' => $this->name,
            'furigana' => $this->furigana,
            'birthday' => $this->birthday,
            'generation' => $this->generation?->generation,
            'prefecture' => $this->prefecture,
            'img_url' => $this->imgs->map(fn($img) => asset($img->img_path)),
            'mbti_code' => $this->mbti?->mbti_code,
            'mbti_label' => $this->mbti?->mbti_label,
            'graduated' => $this->graduated
        ];

        return $memberData;
    }
}
