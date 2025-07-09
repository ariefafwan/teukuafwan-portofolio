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
        $filters['with'] = ['dataSkill', 'dataGambar'];
        $data = [
            'educations' => $this->education_repo->get(),
            'profile' => $this->profile_repo->first(),
            'skills' => $this->skill_repo->get(),
            'main_skills' => $this->main_skill_repo->get(),
            'projects' => $this->project_repo->all($filters)
        ];

        return $this->successResponse($data);
    }

    public function profile()
    {
        $profile = $this->profile_repo->first();
        return $this->successResponse($profile);
    }

    public function projects()
    {
        $filters = request()->all();
        $filters['with'] = ['dataSkill', 'dataGambar'];
        $data = [
            'projects' => $this->project_repo->all($filters),
            'skills' => $this->skill_repo->get(),
            'profile' => $this->profile_repo->first(),
        ];
        return $this->successResponse($data);
    }

    public function show_project($slug)
    {
        $data = [
            'project' => $this->project_repo->find_by_slug($slug)->load('skills'),
            'profile' => $this->profile_repo->first(),
        ];
        return $this->successResponse($data);
    }
}
