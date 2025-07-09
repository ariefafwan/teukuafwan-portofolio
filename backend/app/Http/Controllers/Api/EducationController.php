<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\ApiController;
use App\Http\Requests\Education\EducationRequest;
use App\Repositories\EducationRepository;
use Illuminate\Support\Facades\DB;

class EducationController extends ApiController
{
    protected $education_repo;

    public function __construct(EducationRepository $education_repo)
    {
        $this->education_repo = $education_repo;
    }

    public function index()
    {
        $data = $this->education_repo->get();
        return $this
            ->successResponse($data);
    }

    public function show($uuid)
    {
        $data = $this->education_repo->find($uuid);
        return $this
            ->successResponse($data);
    }

    public function store(EducationRequest $request)
    {
        $data = $request->validated();
        DB::beginTransaction();
        try {
            $education = $this->education_repo->where('tipe', $data['tipe'])->get();
            if ($education->count() > 0) {
                return $this->errorResponse(message: 'Data sudah ada');
            }
            $data = $this->education_repo->create($data);
            DB::commit();
            return $this->successResponse();
        } catch (\Exception $e) {
            DB::rollBack();
            return $this->errorResponse(message: $e->getMessage());
        }
    }

    public function update(EducationRequest $request, $uuid)
    {
        $data = $request->validated();

        try {
            DB::beginTransaction();
            $this->education_repo->update($uuid, $data);
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
            $this->education_repo->delete($uuid);
            DB::commit();
            return $this->successResponse();
        } catch (\Exception $e) {
            DB::rollBack();
            return $this->errorResponse(message: $e->getMessage());
        }
    }
}
