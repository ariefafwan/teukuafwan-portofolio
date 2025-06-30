<?php

namespace App\Repositories;

use App\Models\MainSkill;
use App\Utils\Helper;

class MainSkillRepository extends BaseRepository
{
    public $upload_directory = 'assets/MainSKill';

    public function __construct(MainSkill $main_skill)
    {
        parent::__construct($main_skill);
    }

    public function delete_with_image($uuid)
    {
        $data = $this->model->find($uuid);
        Helper::delete_file($data->gambar);
        return $data->delete();
    }
}
