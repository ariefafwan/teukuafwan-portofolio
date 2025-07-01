<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Traits\Uuids;

class Project extends Model
{
    use Uuids;
    protected $table = 'project';
    protected $primaryKey = 'uuid';
    protected $guarded = [];

    public function dataSkill()
    {
        return $this->belongsTo(Skill::class, 'skill_uuid', 'uuid');
    }

    public function scopeFilter($query, $filters)
    {
        $query->when($filters['search'] ?? false, function ($q) use ($filters) {
            $search = '%' . $filters['search'] . '%';
            $q->where(function ($q) use ($search) {
                $q->where('judul', 'like', $search)
                    ->orWhereHas('dataSkill', function ($query) use ($search) {
                        $query->where('nama', 'like', $search);
                    });
            });
        })->when($filters['status'] ?? false, function ($q) use ($filters) {
            $q->where('status', $filters['status']);
        })->when($filters['skill_uuid'] ?? false, function ($query) use ($filters) {
            $query->where('skill_uuid', $filters['skill_uuid']);
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
