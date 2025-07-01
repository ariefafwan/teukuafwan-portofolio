<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Traits\Uuids;

class Skill extends Model
{
    use Uuids;
    protected $table = 'skill';
    protected $primaryKey = 'uuid';
    protected $guarded = [];

    public function dataProject()
    {
        return $this->hasMany(Project::class, 'skill_uuid', 'uuid');
    }
}
