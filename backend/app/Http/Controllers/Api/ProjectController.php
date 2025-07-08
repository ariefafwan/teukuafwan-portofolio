<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\ApiController;
use App\Http\Requests\Project\ProjectStoreRequest;
use App\Http\Requests\Project\ProjectUpdateRequest;
use App\Models\SkillProject;
use App\Repositories\ProjectRepository;
use App\Repositories\SkillRepository;
use App\Utils\Helper;
use Illuminate\Support\Facades\DB;

class ProjectController extends ApiController
{
    protected $project_repo, $skill_repo;

    public function __construct(ProjectRepository $project_repo, SkillRepository $skill_repo)
    {
        $this->project_repo = $project_repo;
        $this->skill_repo = $skill_repo;
    }

    public function index()
    {
        $filters = request()->all();
        $filters['with'] = ['dataSkill'];
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
            if ($request->hasFile('image')) {
                $data['image'] = Helper::upload_file($request->file('image'), $this->project_repo->upload_directory);
            }

            $skillUuids = $data['skill_uuid'];
            unset($data['skill_uuid']);

            $project = $this->project_repo->create($data);
            foreach ($skillUuids as $skill_uuid) {
                SkillProject::create([
                    'project_uuid' => $project->uuid,
                    'skill_uuid' => $skill_uuid
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
        $data = $this->project_repo->find_by_slug($slug);
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

            if ($request->hasFile('gambar')) {
                Helper::delete_file($project->gambar);
                $data['image'] = Helper::upload_file($request->file('image'), $this->project_repo->upload_directory);
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
            $this->project_repo->delete_with_image($uuid);
            DB::commit();
            return $this->successResponse();
        } catch (\Exception $e) {
            DB::rollBack();
            return $this->errorResponse(message: $e->getMessage());
        }
    }
}
