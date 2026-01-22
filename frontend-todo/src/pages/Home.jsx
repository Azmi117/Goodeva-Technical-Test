import React, { useState, useEffect } from "react";
import axios from "axios";

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  
  // State untuk handle UI input Problem
  const [selectedTodoId, setSelectedTodoId] = useState(null);
  const [problemDesc, setProblemDesc] = useState("");

  // 1. Fetch Data dari Backend (NestJS)
  const fetchTodos = async () => {
    setLoading(true);
    try {
      // Mengirim query search ke backend
      const res = await axios.get(`http://localhost:3000/api/todos?search=${search}`);
      setTodos(res.data);
    } catch (err) {
      console.error("Gagal mengambil data:", err);
    } finally {
      setLoading(false);
    }
  };

  // Trigger fetch setiap kali kata kunci search berubah
  useEffect(() => {
    fetchTodos();
  }, [search]);

  // 2. Fungsi Tambah Todo (POST)
  const handleAddTodo = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    try {
      await axios.post("http://localhost:3000/api/todos", { title });
      setTitle("");
      fetchTodos(); // Refresh list setelah berhasil tambah
    } catch (err) {
      alert("Gagal menambah tugas baru");
    }
  };

  // 3. Fungsi Update Status Berjenjang (PATCH)
  const handleNextStep = async (id, currentStatus) => {
    let nextStatus = "on_going";
    if (currentStatus === "on_going") nextStatus = "completed";
    
    try {
      await axios.patch(`http://localhost:3000/api/todos/${id}`, { status: nextStatus });
      fetchTodos();
    } catch (err) {
      alert("Gagal update status");
    }
  };

  // 4. Fungsi Update Status ke "Problem" dengan Deskripsi
  const handleSubmitProblem = async (id) => {
    if (!problemDesc.trim()) return alert("Tuliskan dulu masalahnya apa!");
    try {
      await axios.patch(`http://localhost:3000/api/todos/${id}`, {
        status: "problem",
        problem_desc: problemDesc,
      });
      setProblemDesc("");
      setSelectedTodoId(null);
      fetchTodos();
    } catch (err) {
      alert("Gagal mengirim laporan masalah");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-6">
      <div className="max-w-5xl mx-auto">
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-black text-slate-800 tracking-tight">GOODEVA TODO AI</h1>
          <p className="text-slate-500 mt-2">Technical Test - Fullstack Management System</p>
        </header>

        {/* Toolbar: Form Input & Search Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <form onSubmit={handleAddTodo} className="flex-1 flex gap-2">
            <input
              className="flex-1 bg-white border border-slate-200 p-3 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 outline-none transition"
              placeholder="Apa tugas baru hari ini?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-blue-200 transition active:scale-95">
              Tambah
            </button>
          </form>

          <div className="relative md:w-1/3">
            <input
              className="w-full bg-white border border-slate-200 p-3 pl-10 rounded-xl shadow-sm outline-none focus:border-blue-500"
              placeholder="Cari tugas..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {/* <span className="absolute left-3 top-3.5 text-slate-400">🔍</span> */}
          </div>
        </div>

        {/* Content Section */}
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-slate-100">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-100 text-slate-600 text-sm font-bold uppercase">
              <tr>
                <th className="p-5 w-16 text-center">#</th>
                <th className="p-5">Detail Tugas</th>
                <th className="p-5">Status</th>
                <th className="p-5 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading && todos.length === 0 ? (
                <tr><td colSpan="4" className="p-10 text-center text-slate-400 italic">Sedang menyinkronkan data...</td></tr>
              ) : todos.length === 0 ? (
                <tr><td colSpan="4" className="p-10 text-center text-slate-400">Belum ada tugas di database.</td></tr>
              ) : (
                todos.map((todo, index) => (
                  <React.Fragment key={todo.id}>
                    <tr className="hover:bg-slate-50 transition-colors">
                      <td className="p-5 text-center text-slate-400 font-medium">{index + 1}</td>
                      <td className="p-5">
                        <p className="font-bold text-slate-800 text-lg">{todo.title}</p>
                        {todo.problem_desc && (
                          <div className="mt-2 text-sm bg-red-50 text-red-600 p-2 rounded-md border border-red-100">
                            <strong>Kendala:</strong> {todo.problem_desc}
                          </div>
                        )}
                        {/* Slot untuk Bonus AI Recommendation */}
                        {todo.ai_recommendation && (
                          <div className="mt-2 text-sm bg-indigo-50 text-indigo-700 p-2 rounded-md border border-indigo-100 italic">
                            ✨ AI Suggestion: {todo.ai_recommendation}
                          </div>
                        )}
                      </td>
                      <td className="p-5">
                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase shadow-sm ${
                          todo.status === 'completed' ? 'bg-emerald-100 text-emerald-700' :
                          todo.status === 'on_going' ? 'bg-sky-100 text-sky-700' :
                          todo.status === 'problem' ? 'bg-rose-100 text-rose-700' : 'bg-slate-100 text-slate-500'
                        }`}>
                          {todo.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="p-5">
                        <div className="flex gap-2 justify-center">
                          {todo.status !== "completed" && (
                            <>
                              <button
                                onClick={() => handleNextStep(todo.id, todo.status)}
                                className="bg-slate-800 hover:bg-black text-white px-4 py-1.5 rounded-lg text-xs font-bold transition shadow-md"
                              >
                                {todo.status === 'created' ? 'Mulai' : 'Selesai'}
                              </button>
                              <button
                                onClick={() => setSelectedTodoId(todo.id)}
                                className="border border-rose-200 text-rose-500 px-4 py-1.5 rounded-lg text-xs font-bold hover:bg-rose-50 transition"
                              >
                                Problem
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>

                    {/* Baris Input Masalah (Kondisional) */}
                    {selectedTodoId === todo.id && (
                      <tr className="bg-rose-50/50">
                        <td colSpan="4" className="p-6">
                          <div className="bg-white p-4 rounded-xl shadow-inner border border-rose-100 flex gap-3 animate-in fade-in slide-in-from-top-2">
                            <input
                              autoFocus
                              className="flex-1 border-b-2 border-slate-200 focus:border-rose-500 outline-none p-2 text-sm"
                              placeholder="Apa hambatan tugas ini? (Contoh: Butuh info tambahan dari tim marketing)"
                              value={problemDesc}
                              onChange={(e) => setProblemDesc(e.target.value)}
                            />
                            <button
                              onClick={() => handleSubmitProblem(todo.id)}
                              className="bg-rose-600 text-white px-6 py-2 rounded-lg text-sm font-bold hover:bg-rose-700 transition"
                            >
                              Laporkan
                            </button>
                            <button
                              onClick={() => { setSelectedTodoId(null); setProblemDesc(""); }}
                              className="text-slate-400 hover:text-slate-600 text-xs font-medium px-2"
                            >
                              Batal
                            </button>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))
              )}
            </tbody>
          </table>
        </div>
        <footer className="mt-8 text-center text-slate-400 text-xs font-medium">
           &copy; 2026 Goodeva Technical Test. Created by Azmi.
        </footer>
      </div>
    </div>
  );
};

export default Home;