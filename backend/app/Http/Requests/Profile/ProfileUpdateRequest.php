<?php

namespace App\Http\Requests\Profile;

use Illuminate\Contracts\Validation\ValidationRule;
use App\Http\Requests\ApiRequest;

class ProfileUpdateRequest extends ApiRequest
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
            'nama_panggilan' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'deskripsi' => 'required|string|max:65535',
            'resume' => 'nullable|file|mimes:pdf',
            'gambar_profil' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp',
            'avatar' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp',
            'linkedin' => 'nullable|url',
            'github' => 'nullable|url',
            'instagram' => 'nullable|url',
            'kaggle' => 'nullable|url',
        ];
    }
}
