# GOODEVA TODO AI - Technical Test

# Screenshot UI
<img width="2557" height="1024" alt="image" src="https://github.com/user-attachments/assets/d7dbb704-bcff-44fa-ae0f-83cdb7b75853" />


Aplikasi manajemen tugas (Fullstack) yang dilengkapi dengan sistem **AI Suggestion**. Aplikasi ini dibangun untuk memenuhi kriteria Technical Test, mencakup fitur CRUD, pencarian, dan integrasi OpenAI.

## 🚀 Fitur Utama
- **Full CRUD Management**: Tambah, lihat, update status, dan hapus tugas.
- **Pencarian Real-time**: Filter tugas berdasarkan judul langsung dari frontend.
- **Status Berjenjang**: Alur tugas dari `created` -> `on_going` -> `completed`.
- **AI Recommendation**: Memberikan solusi otomatis menggunakan OpenAI GPT-3.5 Turbo saat tugas memiliki kendala (*status problem*).

## 🛠️ Tech Stack
- **Backend**: NestJS, Prisma ORM, PostgreSQL.
- **Frontend**: React (Vite), Tailwind CSS, Axios.
- **Database**: PostgreSQL.
- **AI**: OpenAI SDK.

## 📦 Struktur Direktori
```text
.
├── backend-todo/      # NestJS Application (API)
├── frontend-todo/     # React Application (UI)
└── README.md          # Dokumentasi Utama


⚙️ Panduan Instalasi & Setup:

1. Prasyarat
    - Node.js (v22.17.1)
    - PostgreSQL terinstal dan berjalan
    - OpenAI API Key

2. Konfigurasi Backend
    - Masuk ke folder backend, command: cd backend-todo
    - Install dependensi, command: npm install
    - Buat file .env di dalam folder backend-todo/ (isi nya dapat dilihat pada .env.example)
    - Jalankan migrasi database, command: npx prisma migrate dev --name init
    - Generate Prisma client, command: npx prisma generate
    - Jalankan server, command: npm run start:dev

3. Konfigurasi Frontend
    - Masuk ke folder frontend, command: cd frontend-todo
    - Install dependensi, command: npm install
    - Jalankan aplikasi, command: npm run dev


🤖 Cara Kerja AI
Saat user menekan tombol "Problem" dan mengirimkan deskripsi kendala, backend akan memicu AiService untuk meminta saran solusi ke OpenAI. Saran tersebut akan disimpan di kolom ai_recommendation dan ditampilkan dengan ikon ✨ di dashboard utama.

🔒 Keamanan (Git)
File .env sudah masuk dalam .gitignore di tingkat root dan folder masing-masing untuk mencegah kebocoran kredensial database dan API Key.

© 2026 Goodeva Technical Test. Created by Azmi.
