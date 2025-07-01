<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('profile', function (Blueprint $table) {
            $table->uuid('uuid')->primary();
            $table->string('nama');
            $table->string('nama_panggilan');
            $table->string('moto_profesional');
            $table->string('email');
            $table->text('deskripsi');
            $table->string('resume');
            $table->string('gambar_profil');
            $table->string('avatar');
            $table->string('linkedin');
            $table->string('github');
            $table->string('instagram');
            $table->string('kaggle');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('profile');
    }
};
