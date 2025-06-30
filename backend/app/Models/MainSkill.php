<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Traits\Uuids;

class MainSkill extends Model
{
    use Uuids;
    protected $table = 'main_skill';
    protected $primaryKey = 'uuid';
}
