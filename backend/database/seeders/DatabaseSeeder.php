<?php

namespace Database\Seeders;

use App\Models\Profile;
use App\Models\Skill;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory()->create([
            'name' => 'admin',
            'email' => 'admin@teukuafwan.com',
        ]);

        Profile::create([
            'nama' => 'Teuku M Arief Afwan',
            'moto_profesional' => 'Code Enthusiast',
            'nama_panggilan' => 'Teuku Afwan',
            'email' => 'tmariefafwan@gmail.com',
            'deskripsi' => 'I am Afwan, 23 years old, a Bachelor of Engineering, Majoring in Information Systems with a GPA of 3.62 & Postgraduate Student Majoring in Information Systems. Mastering Web development, using PHP Framework Laravel & Javascript (Vue Js, Nuxt Js, React) as my main programming, also proficient in predictive data processing and analysis with Python, also AI Development. I am also able to work well together, committed and responsible.',
            'resume' => 'assets/profile/1752056671_8b9c8ea3-ec7d-4da9-a0cb-54f3c415a6b6.pdf',
            'gambar_profil' => 'assets/profile/1752056671_ddf7a2e5-430e-4b82-9570-64dab862a93d.png',
            'linkedin' => 'https://www.linkedin.com/in/teuku-m-arief-afwan/',
            'github' => 'https://github.com/ariefafwan',
            'instagram' => 'https://www.instagram.com/teukuafwan/',
            'kaggle' => 'https://www.kaggle.com/teukumariefafwan',
        ]);

        Skill::create([
            'nama' => 'Laravel',
        ]);
        Skill::create([
            'nama' => 'Vue Js',
        ]);
        Skill::create([
            'nama' => 'Nuxt Js',
        ]);
    }
}
