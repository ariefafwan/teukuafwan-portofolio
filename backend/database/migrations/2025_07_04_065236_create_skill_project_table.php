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
        Schema::create('skill_project', function (Blueprint $table) {
            $table->uuid()->primary();
            $table->foreignUuid('skill_uuid')->constrained('skill')->references('uuid')->onDelete('restrict')->onUpdate('cascade');
            $table->foreignUuid('project_uuid')->constrained('project')->references('uuid')->onDelete('restrict')->onUpdate('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('skill_project');
    }
};
