<?php

namespace App\Services;

use App\Models\Generation;

class GenerationService
{
  public function fetchAllGeneration()
  {
    return  Generation::all();
  }
}
