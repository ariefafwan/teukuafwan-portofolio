<?php

namespace App\Repositories;

use App\Models\Profile;

class ProfileRepository extends BaseRepository
{
    public $upload_directory = 'assets/profile';

    public function __construct(Profile $profile)
    {
        parent::__construct($profile);
    }
}
