<?php

namespace App\Repositories;

use App\Models\Project;
use App\Utils\Helper;
use Illuminate\Support\Str;

class ProjectRepository extends BaseRepository
{
    public $upload_directory = 'assets/project';

    public function __construct(Project $project)
    {
        parent::__construct($project);
    }

    public function all($filters = [], $paginate = 9)
    {
        $className = class_basename($this->model);
        $alias = Str::slug($className);

        return $this->model
            ->filter($filters)
            ->paginate($paginate, ['*'], $alias)
            ->withQueryString()
            ->onEachSide(0);
    }

    public function find_by_slug($slug)
    {
        return $this->model->where('slug', $slug)->first();
    }

    public function delete_with_image($uuid)
    {
        $project = $this->model->find($uuid);
        Helper::delete_file($project->gambar);
        return $project->delete();
    }
}
