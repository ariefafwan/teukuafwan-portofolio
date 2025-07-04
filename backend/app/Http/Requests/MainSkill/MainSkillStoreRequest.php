<?php

namespace App\Http\Requests\MainSkill;

use Illuminate\Contracts\Validation\ValidationRule;
use App\Http\Requests\ApiRequest;

class MainSkillStoreRequest extends ApiRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'nama' => 'required|string|max:255',
            'deskripsi' => 'required|string|max:65535',
            'gambar' => 'required|image|mimes:jpeg,png,jpg,gif,svg,webp',
        ];
    }
}
