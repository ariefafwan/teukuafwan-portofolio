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
        Schema::create('education', function (Blueprint $table) {
            $table->uuid('uuid')->primary();
            $table->enum('tipe', ['Sekolah', 'Sarjana', 'Master', 'Doktor'])->unique();
            $table->string('nama');
            $table->string('jurusan')->nullable();
            $table->date('masuk');
            $table->date('lulus')->nullable();
            $table->decimal('nilai_kelulusan', 3, 2)->nullable();
            $table->string('gelar')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('education');
    }
};
