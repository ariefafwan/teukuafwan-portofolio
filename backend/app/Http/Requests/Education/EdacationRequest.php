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
            'name' => 'required|string|max:255',
            'tipe' => 'required|in:sekolah,sarjana,master,doktor',
            'jurusan' => 'nullable|string|max:255',
            'tahun_masuk' => 'required|date_format:Y',
            'tahun_lulus' => 'required|date_format:Y',
            'nilai_kelulusan' => 'nullable|numeric|digits_between:0,100',
            'gelar' => 'nullable|string|max:255',
        ];
    }
}
