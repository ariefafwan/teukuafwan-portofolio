<?php

namespace App\Repositories;

use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserRepository extends BaseRepository
{
    public function __construct(User $user)
    {
        parent::__construct($user);
    }

    public function create($userData)
    {
        $userData['password'] = Hash::make($userData['password']);

        return $this->model->create($userData);
    }

    public function update($uuid, array $userData)
    {
        if (isset($userData['password'])) {
            $userData['password'] = Hash::make($userData['password']);
            unset($userData['password_confirmation']);
        }

        $user = $this->model->find($uuid);
        $user->update($userData);

        return $user->fresh();
    }

    public function checkEmailExists($email): bool
    {
        return $this->model->whereEmail($email)->count() > 0;
    }

    public function paginate(int $perPage)
    {
        return $this->model->paginate($perPage);
    }
}
