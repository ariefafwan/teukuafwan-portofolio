<?php

namespace App\Repositories;

use App\Models\GambarProject;
use App\Utils\Helper;

class GambarProjectRepository extends BaseRepository
{
    public $upload_directory = 'assets/project';

    public function __construct(GambarProject $gambar_project)
    {
        parent::__construct($gambar_project);
    }

    public function delete($project_uuid)
    {
        $gambar = $this->model->where('project_uuid', $project_uuid);
        foreach ($gambar->get() as $image) {
            Helper::delete_file($image->gambar);
        }
        return $gambar->delete();
    }
}
