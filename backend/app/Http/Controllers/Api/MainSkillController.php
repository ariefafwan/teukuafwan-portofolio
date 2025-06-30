<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\ApiController;
use App\Http\Requests\MainSkill\MainSkillStoreRequest;
use App\Http\Requests\MainSkill\MainSkillUpdateRequest;
use App\Repositories\MainSkillRepository;
use App\Utils\Helper;
use Illuminate\Support\Facades\DB;

class MainSkillController extends ApiController
{
    protected $main_skill_repo;

    public function __construct(MainSkillRepository $main_skill_repo)
    {
        $this->main_skill_repo = $main_skill_repo;
    }

    public function index()
    {
        $data = $this->main_skill_repo->get();
        return $this
            ->successResponse($data);
    }

    public function store(MainSkillStoreRequest $request)
    {
        $data = $request->validated();
        DB::beginTransaction();
        try {
            if ($request->hasFile('image')) {
                $data['image'] = Helper::upload_file($request->file('image'), $this->main_skill_repo->upload_directory);
            }
            $this->main_skill_repo->create($data);
            DB::commit();
            return $this->successResponse();
        } catch (\Exception $e) {
            DB::rollBack();
            return $this->errorResponse(message: $e->getMessage());
        }
    }

    public function update(MainSkillUpdateRequest $request, $uuid)
    {
        $data = $request->validated();

        try {
            DB::beginTransaction();
            $main_skill = $this->main_skill_repo->find($uuid);
            if ($request->hasFile('gambar')) {
                Helper::delete_file($main_skill->gambar);
                $data['image'] = Helper::upload_file($request->file('image'), $this->main_skill_repo->upload_directory);
            }
            $this->main_skill_repo->update($uuid, $data);
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
            $this->main_skill_repo->delete_with_image($uuid);
            DB::commit();
            return $this->successResponse();
        } catch (\Exception $e) {
            DB::rollBack();
            return $this->errorResponse(message: $e->getMessage());
        }
    }
}
