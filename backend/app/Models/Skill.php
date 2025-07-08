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

    public function dataSkillProject()
    {
        return $this->hasMany(SkillProject::class, 'skill_uuid', 'uuid');
    }

    public function dataProject()
    {
        return $this->belongsToMany(Project::class, 'skill_project', 'skill_uuid', 'project_uuid', 'uuid', 'uuid');
    }
}
