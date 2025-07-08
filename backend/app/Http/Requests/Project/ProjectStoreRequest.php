<?php

namespace App\Http\Requests\Project;

use Illuminate\Contracts\Validation\ValidationRule;
use App\Http\Requests\ApiRequest;

class ProjectStoreRequest extends ApiRequest
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
            'skill_uuid.*' => 'required|exists:skill,uuid',
            'status' => 'required|in:Repository,Published',
            'gambar' => 'required|image|mimes:jpeg,png,jpg,gif,svg,webp',
            'link' => 'required|url',
            'tahun' => 'required|date_format:Y',
            'deskripsi' => 'required|string|max:65535',
        ];
    }
}
