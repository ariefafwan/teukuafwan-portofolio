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
            'resume' => 'nullable|file|mimes:pdf|max:' . env('DOCUMENT_UPLOAD_SIZE'),
            'gambar_profil' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:' . env('IMAGE_UPLOAD_SIZE'),
            'avatar' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:' . env('IMAGE_UPLOAD_SIZE'),
            'linkedin' => 'required|url',
            'github' => 'required|url',
            'instagram' => 'required|url',
            'kaggle' => 'required|url',
        ];
    }
}
