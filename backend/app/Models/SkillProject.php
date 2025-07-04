<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Traits\Uuids;

class SkillProject extends Model
{
    use Uuids;
    protected $table = 'skill_project';
    protected $primaryKey = 'uuid';
    protected $guarded = [];

    public function dataSkill()
    {
        return $this->belongsTo(Skill::class, 'skill_uuid', 'uuid');
    }

    public function dataProject()
    {
        return $this->belongsTo(Project::class, 'project_uuid', 'uuid');
    }
}
