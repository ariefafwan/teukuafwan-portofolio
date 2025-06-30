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
            'skill_uuid' => 'required|exists:skills,uuid',
            'status' => 'required|in:repository,published',
            'gambar' => 'nullable|image|mimes:jpeg,png,jpg|max:' . env('IMAGE_UPLOAD_SIZE'),
            'link' => 'required|url',
            'tahun' => 'required|date_format:Y',
            'deskripsi' => 'required|string|max:65535',
        ];
    }
}
