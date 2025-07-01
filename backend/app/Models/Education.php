<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Traits\Uuids;

class Education extends Model
{
    use Uuids;
    protected $table = 'education';
    protected $primaryKey = 'uuid';
    protected $guarded = [];
}
