<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\ApiController;
use App\Repositories\EducationRepository;
use App\Repositories\MainSkillRepository;
use App\Repositories\ProfileRepository;
use App\Repositories\ProjectRepository;
use App\Repositories\SkillRepository;

class HomeController extends ApiController
{
    protected $education_repo, $project_repo, $profile_repo, $skill_repo, $main_skill_repo;

    public function __construct(
        EducationRepository $education_repo,
        ProjectRepository $project_repo,
        SkillRepository $skill_repo,
        ProfileRepository $profile_repo,
        MainSkillRepository $main_skill_repo
    ) {
        $this->education_repo = $education_repo;
        $this->project_repo = $project_repo;
        $this->skill_repo = $skill_repo;
        $this->profile_repo = $profile_repo;
        $this->main_skill_repo = $main_skill_repo;
    }
    public function index()
    {
        $filters = request()->all();
        $data = [
            'education' => $this->education_repo->get(),
            'profile' => $this->profile_repo->first(),
            'skill' => $this->skill_repo->get(),
            'main_skill' => $this->main_skill_repo->get(),
            'project' => $this->project_repo->all($filters)
        ];

        return $this->successResponse($data);
    }
}
