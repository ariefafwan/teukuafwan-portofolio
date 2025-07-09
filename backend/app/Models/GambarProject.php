<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Traits\Uuids;

class GambarProject extends Model
{
    use Uuids;
    protected $table = 'gambar_project';
    protected $primaryKey = 'uuid';
    protected $guarded = [];

    public function dataProject()
    {
        return $this->belongsTo(Project::class, 'project_uuid', 'uuid');
    }
}
