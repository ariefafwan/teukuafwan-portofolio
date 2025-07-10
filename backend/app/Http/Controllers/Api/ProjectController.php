<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\ApiController;
use App\Http\Requests\Project\ProjectStoreRequest;
use App\Http\Requests\Project\ProjectUpdateRequest;
use App\Models\SkillProject;
use App\Repositories\GambarProjectRepository;
use App\Repositories\ProjectRepository;
use App\Repositories\SkillProjectRepository;
use App\Repositories\SkillRepository;
use App\Utils\Helper;
use Illuminate\Support\Facades\DB;

class ProjectController extends ApiController
{
    protected $project_repo, $skill_repo, $gambar_project_repo, $skill_project_repo;

    public function __construct(ProjectRepository $project_repo, SkillRepository $skill_repo, GambarProjectRepository $gambar_project_repo, SkillProjectRepository $skill_project_repo)
    {
        $this->project_repo = $project_repo;
        $this->skill_repo = $skill_repo;
        $this->gambar_project_repo = $gambar_project_repo;
        $this->skill_project_repo = $skill_project_repo;
    }

    public function index()
    {
        $filters = request()->all();
        $filters['with'] = ['dataSkill', 'dataGambar'];
        $project = $this->project_repo->all($filters);
        $skill = $this->skill_repo->get();
        return $this
            ->successResponse(['project' => $project, 'skill' => $skill]);
    }

    public function store(ProjectStoreRequest $request)
    {
        $data = $request->validated();
        DB::beginTransaction();
        try {
            $skillUuids = $data['skill_uuid'];
            $gambar = $data['gambar'];
            unset($data['skill_uuid']);
            unset($data['gambar']);

            $project = $this->project_repo->create($data);
            foreach ($skillUuids as $skill_uuid) {
                $this->skill_project_repo->create([
                    'project_uuid' => $project->uuid,
                    'skill_uuid' => $skill_uuid
                ]);
            }

            foreach ($gambar as $image) {
                $UploadGambar = Helper::upload_file($image, $this->gambar_project_repo->upload_directory);
                $gambar = $this->gambar_project_repo->create([
                    'gambar' => $UploadGambar,
                    'project_uuid' => $project->uuid
                ]);
            }
            DB::commit();
            return $this->successResponse();
        } catch (\Exception $e) {
            DB::rollBack();
            return $this->errorResponse(message: $e->getMessage());
        }
    }

    public function show($slug)
    {
        $data = $this->project_repo->find_by_slug($slug)->load('dataSkill', 'dataGambar');
        return $this
            ->successResponse($data);
    }

    public function edit($uuid)
    {
        $data = $this->project_repo->find($uuid)->load('dataSkill');
        return $this
            ->successResponse($data);
    }

    public function update(ProjectUpdateRequest $request, $uuid)
    {
        $data = $request->validated();

        try {
            DB::beginTransaction();
            $project = $this->project_repo->find($uuid);

            $skillUuids = $data['skill_uuid'];
            $gambar = $data['gambar'] ?? null;
            unset($data['skill_uuid']);
            unset($data['gambar']);

            $this->skill_project_repo->delete($project->uuid);

            foreach ($skillUuids as $skill_uuid) {
                $this->skill_project_repo->create([
                    'project_uuid' => $project->uuid,
                    'skill_uuid' => $skill_uuid
                ]);
            }

            if (isset($gambar)) {
                $this->gambar_project_repo->delete($project->uuid);
                foreach ($gambar as $image) {
                    $UploadGambar = Helper::upload_file($image, $this->gambar_project_repo->upload_directory);
                    $gambar = $this->gambar_project_repo->create([
                        'gambar' => $UploadGambar,
                        'project_uuid' => $project->uuid
                    ]);
                }
            }

            $this->project_repo->update($project->uuid, $data);

            DB::commit();
            return $this->successResponse();
        } catch (\Exception $e) {
            DB::rollBack();
            return $this->errorResponse(message: $e->getMessage());
        }
    }

    public function destroy($uuid)
    {
        try {
            DB::beginTransaction();
            $this->project_repo->delete($uuid);
            DB::commit();
            return $this->successResponse();
        } catch (\Exception $e) {
            DB::rollBack();
            return $this->errorResponse(message: $e->getMessage());
        }
    }
}
