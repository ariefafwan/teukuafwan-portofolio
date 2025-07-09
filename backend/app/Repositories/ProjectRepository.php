<?php

namespace App\Repositories;

use App\Models\GambarProject;
use App\Models\Project;
use App\Utils\Helper;
use Illuminate\Support\Str;

class ProjectRepository extends BaseRepository
{
    protected $gambar_project_repo, $skill_project_repo;

    public function __construct(Project $project, GambarProjectRepository $gambar_project_repo, SkillProjectRepository $skill_project_repo)
    {
        parent::__construct($project);
        $this->gambar_project_repo = $gambar_project_repo;
        $this->skill_project_repo = $skill_project_repo;
    }

    public function all($filters = [])
    {
        $className = class_basename($this->model);
        $alias = Str::slug($className);
        $with = $filters['with'] ?? [];

        return $this->model
            ->with($with)
            ->filter($filters)
            ->paginate($filters['paginate'] ?? 9, ['*'], $alias)
            ->withQueryString()
            ->onEachSide(0);
    }

    public function find_by_slug($slug)
    {
        return $this->model->where('slug', $slug)->first();
    }

    public function delete($uuid)
    {
        $this->gambar_project_repo->delete($uuid);
        return $this->model->where('uuid', $uuid)->delete();
    }
}
