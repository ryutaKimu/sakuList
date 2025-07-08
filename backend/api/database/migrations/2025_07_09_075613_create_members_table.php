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
        Schema::create('members', function (Blueprint $table) {
            $table->id();
            $table->string("name")->nullable(false);
            $table->string("furigana")->nullable(false);
            $table->date("birthday")->nullable(false);
            $table->string("prefecture")->nullable(true);
            $table->text("introduce")->nullable(true);
            $table->boolean("graduated")->default(false);
            $table->foreignId("mbti_id")->constrained();
            $table->foreignId("generation_id")->constrained();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('members');
    }
};
