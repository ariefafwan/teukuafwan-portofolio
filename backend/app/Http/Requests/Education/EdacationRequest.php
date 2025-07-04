<?php

namespace App\Http\Requests\Education;

use Illuminate\Contracts\Validation\ValidationRule;
use App\Http\Requests\ApiRequest;

class EdacationRequest extends ApiRequest
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
            'tipe' => 'required|in:Sekolah,Sarjana,Master,Doktor',
            'jurusan' => 'nullable|string|max:255',
            'tahun_masuk' => 'required|date_format:Y',
            'tahun_lulus' => 'nullable|date_format:Y|after:tahun_masuk',
            'nilai_kelulusan' => 'nullable|numeric|between:0.00,99.99',
            'gelar' => 'nullable|string|max:255',
        ];
    }
}
