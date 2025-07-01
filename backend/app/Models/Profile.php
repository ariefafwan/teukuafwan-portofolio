<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Traits\Uuids;

class Profile extends Model
{
    use Uuids;
    protected $table = 'profile';
    protected $primaryKey = 'uuid';
    protected $guarded = [];
}
