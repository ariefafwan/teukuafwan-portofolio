<?php

namespace App\Http\Requests\Project;

use Illuminate\Contracts\Validation\ValidationRule;
use App\Http\Requests\ApiRequest;

class ProjectUpdateRequest extends ApiRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'judul' => 'required|string|max:255',
            'skill_uuid' => 'required|array',
            'skill_uuid.*' => 'string|exists:skill,uuid',
            'status' => 'required|in:Repository,Published',
            'gambar' => 'nullable|array',
            'gambar.*' => 'image|mimes:jpeg,png,jpg',
            'link' => 'required|url',
            'tahun' => 'required|date_format:Y',
            'deskripsi' => 'required|string|max:65535',
        ];
    }
}
