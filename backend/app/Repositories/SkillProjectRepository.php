<?php

namespace App\Repositories;

use App\Models\SkillProject;

class SkillProjectRepository extends BaseRepository
{
    public $upload_directory = 'assets/project';

    public function __construct(SkillProject $skill_project)
    {
        $this->model = $skill_project;
    }

    public function delete($project_uuid)
    {
        $skill_project = $this->model->where('project_uuid', $project_uuid);
        return $skill_project->delete();
    }
}
