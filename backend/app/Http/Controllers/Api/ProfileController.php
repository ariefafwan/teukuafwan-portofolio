<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\ApiController;
use App\Http\Requests\Profile\ProfileUpdateRequest;
use App\Repositories\ProfileRepository;
use App\Utils\Helper;
use Illuminate\Support\Facades\DB;

class ProfileController extends ApiController
{
    protected $profile_repo;

    public function __construct(ProfileRepository $profile_repo)
    {
        $this->profile_repo = $profile_repo;
    }

    public function index()
    {
        $data = $this->profile_repo->first();
        return $this
            ->successResponse($data);
    }

    public function update(ProfileUpdateRequest $request)
    {
        $data = $request->validated();

        try {
            DB::beginTransaction();
            $profile = $this->profile_repo->first();

            if ($request->hasFile('gambar')) {
                Helper::delete_file($profile->gambar);
                $data['image'] = Helper::upload_file($request->file('image'), $this->profile_repo->upload_directory);
            }

            $this->profile_repo->update($profile->uuid, $data);
            DB::commit();
            return $this->successResponse();
        } catch (\Exception $e) {
            DB::rollBack();
            return $this->errorResponse(message: $e->getMessage());
        }
    }
}
