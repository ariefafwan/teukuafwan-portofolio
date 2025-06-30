<?php

namespace App\Repositories;

use App\Models\Education;

class EducationRepository extends BaseRepository
{
    public function __construct(Education $education)
    {
        parent::__construct($education);
    }
}
