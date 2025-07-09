<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Traits\Uuids;
use Cviebrock\EloquentSluggable\Sluggable;

class Project extends Model
{
    use Uuids, Sluggable;
    protected $table = 'project';
    protected $primaryKey = 'uuid';
    protected $guarded = [];

    public function dataSkillProject()
    {
        return $this->hasMany(SkillProject::class, 'project_uuid', 'uuid');
    }

    public function dataSkill()
    {
        return $this->belongsToMany(Skill::class, 'skill_project', 'project_uuid', 'skill_uuid', 'uuid', 'uuid');
    }

    public function dataGambar()
    {
        return $this->hasMany(GambarProject::class, 'project_uuid', 'uuid');
    }

    public function scopeFilter($query, $filters)
    {
        $query->when($filters['search'] ?? false, function ($q) use ($filters) {
            $search = '%' . $filters['search'] . '%';
            $q->where(function ($q) use ($search) {
                $q->where('judul', 'like', $search)
                    ->orWhereHas('dataSkillProject', function ($query) use ($search) {
                        $query->whereHas('dataSkill', function ($q) use ($search) {
                            $q->where('nama', 'like', $search);
                        });
                    });
            });
        })->when($filters['status'] ?? false, function ($q) use ($filters) {
            $q->where('status', $filters['status']);
        })->when($filters['tahun'] ?? false, function ($q) use ($filters) {
            $q->where('tahun', $filters['tahun']);
        })->when($filters['skill_uuid'] ?? false, function ($query) use ($filters) {
            $query->whereHas('dataSkillProject', function ($k) use ($filters) {
                if (is_array($filters['skill_uuid'])) {
                    $k->whereIn('skill_uuid', $filters['skill_uuid']);
                } else {
                    $k->where('skill_uuid', $filters['skill_uuid']);
                }
            });
        })
            ->when($filters['order'] ?? false, function ($q) use ($filters) {
                if ($filters['order'] === 'latest') {
                    $q->orderBy('created_at', 'desc');
                } elseif ($filters['order'] === 'oldest') {
                    $q->orderBy('created_at', 'asc');
                }
            });

        return $query;
    }

    public function sluggable(): array
    {
        return [
            'slug' => [
                'source' => 'judul',
                'onUpdate' => true,
            ]
        ];
    }
}
