<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\ApiController;
use App\Http\Requests\Skill\SkillRequest;
use App\Repositories\SkillRepository;
use Illuminate\Support\Facades\DB;

class SkillController extends ApiController
{
    protected $skill_repo;

    public function __construct(SkillRepository $skill_repo)
    {
        $this->skill_repo = $skill_repo;
    }

    public function index()
    {
        $data = $this->skill_repo->get();
        return $this
            ->successResponse($data);
    }

    public function show($uuid)
    {
        $data = $this->skill_repo->find($uuid);
        return $this
            ->successResponse($data);
    }

    public function store(SkillRequest $request)
    {
        $data = $request->validated();
        DB::beginTransaction();
        try {
            $this->skill_repo->create($data);
            DB::commit();
            return $this->successResponse();
        } catch (\Exception $e) {
            DB::rollBack();
            return $this->errorResponse(message: $e->getMessage());
        }
    }

    public function update(SkillRequest $request, $uuid)
    {
        $data = $request->validated();

        try {
            DB::beginTransaction();
            $this->skill_repo->update($uuid, $data);
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
            $this->skill_repo->delete($uuid);
            DB::commit();
            return $this->successResponse();
        } catch (\Exception $e) {
            DB::rollBack();
            return $this->errorResponse(message: $e->getMessage());
        }
    }
}
