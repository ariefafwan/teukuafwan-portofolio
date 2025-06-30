<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\ApiController;
use App\Http\Requests\Project\ProjectStoreRequest;
use App\Http\Requests\Project\ProjectUpdateRequest;
use App\Repositories\ProjectRepository;
use App\Utils\Helper;
use Illuminate\Support\Facades\DB;

class ProjectController extends ApiController
{
    protected $project_repo;

    public function __construct(ProjectRepository $project_repo)
    {
        $this->project_repo = $project_repo;
    }

    public function index()
    {
        $filters = request()->all();
        $data = $this->project_repo->all($filters);
        return $this
            ->successResponse($data);
    }

    public function store(ProjectStoreRequest $request)
    {
        $data = $request->validated();
        DB::beginTransaction();
        try {
            if ($request->hasFile('image')) {
                $data['image'] = Helper::upload_file($request->file('image'), $this->project_repo->upload_directory);
            }
            $this->project_repo->create($data);
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
