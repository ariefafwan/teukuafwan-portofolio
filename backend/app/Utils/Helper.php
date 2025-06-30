<?php

namespace App\Utils;

use Carbon\Carbon;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class Helper
{
    public static function upload_file($file, $dir)
    {
        if (!$file instanceof \Illuminate\Http\UploadedFile) {
            throw new \InvalidArgumentException('File harus berupa instance dari UploadedFile.');
        }
        $originalName = $file->getClientOriginalName();
        if (preg_match('/\.php$/i', $originalName) || preg_match('/[<>:"\/|?*\x00-\x1F]/', $originalName)) {
            throw new \Exception('Nama file atau ekstensi mengandung karakter yang tidak didukung');
        }
        $safeName = time() . '_' . Str::uuid() . '.' . $file->getClientOriginalExtension();
        $path = $file->storeAs($dir, $safeName);
        return $path;
    }
    public static function delete_file($file)
    {
        $url = Storage::url('/');
        $file = str_replace($url, '', $file);
        if (Storage::exists($file)) {
            Storage::delete($file);
        }
    }

    public static function url_file($path)
    {
        return $path && Storage::exists($path) ? Storage::url($path) : null;
    }

    public static function format_currency($string)
    {
        return 'IDR ' . number_format(ceil(floatval($string)), 0, ',', '.');
    }

    public static function date_format($string, $with_hour = true)
    {
        $format = 'd M Y';
        if ($with_hour) {
            $format = 'd M Y H:i';
        }
        return Carbon::parse($string)->format($format);
    }
}
