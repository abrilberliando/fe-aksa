"use client";
import { useDashboard } from "@/hooks/useDashboard";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";

export default function DashboardPage() {
  const {
    data, totalPages, pageParam, searchParam, 
    isModalOpen, setIsModalOpen, editingItem, 
    formData, setFormData, updateParams, 
    openModal, handleSave, handleDelete
  } = useDashboard();

  return (
    <div className="space-y-6">
      {/* Judul & Tombol Gas */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold dark:text-white uppercase">Dashboard Crew</h2>
        </div>
        <Button onClick={() => openModal()} className="w-full md:w-auto">
          + Tambah Member
        </Button>
      </div>

      {/* Input cari-cari member */}
      <input
        type="text"
        placeholder="Cari nama atau role..."
        value={searchParam}
        onChange={(e) => updateParams(1, e.target.value)}
        className="w-full p-3 rounded-lg border bg-white dark:bg-gray-900 dark:border-gray-800 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
      />

      {/* List member - aman buat layar kecil */}
      <div className="border dark:border-gray-800 rounded-xl overflow-hidden bg-white dark:bg-gray-900 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 dark:bg-gray-800 text-gray-400 uppercase font-bold text-[10px] tracking-wider">
              <tr>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y dark:divide-gray-800">
              {data.length > 0 ? (
                data.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors">
                    <td className="px-6 py-4 font-semibold dark:text-white">{item.name}</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 rounded-md bg-blue-50 dark:bg-blue-900/20 text-blue-600 text-[10px] font-black uppercase">
                        {item.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500">{item.email}</td>
                    <td className="px-6 py-4 text-right space-x-3 text-lg">
                      <button onClick={() => openModal(item)} className="hover:opacity-60">✏️</button>
                      <button onClick={() => handleDelete(item.id)} className="hover:opacity-60">🗑️</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-6 py-10 text-center text-gray-400 font-medium">Kosong melompong, G. 🌵</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Navigasi halaman */}
        <div className="p-4 border-t dark:border-gray-800 flex justify-between items-center bg-gray-50/30">
          <span className="text-[10px] font-black text-gray-400 uppercase">
            Page {pageParam} / {totalPages || 1}
          </span>
          <div className="flex gap-2">
            <Button variant="ghost" disabled={pageParam <= 1} onClick={() => updateParams(pageParam - 1, searchParam)}>
              Prev
            </Button>
            <Button variant="ghost" disabled={pageParam >= totalPages} onClick={() => updateParams(pageParam + 1, searchParam)}>
              Next
            </Button>
          </div>
        </div>
      </div>

      {/* Modal Input/Edit */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingItem ? "EDIT MEMBER" : "ADD MEMBER"}>
        <form onSubmit={handleSave} className="space-y-4 pt-2">
          {[
            { label: "Nama Lengkap", key: "name", type: "text" },
            { label: "Role / Posisi", key: "role", type: "text" },
            { label: "Email Address", key: "email", type: "email" },
          ].map((f) => (
            <div key={f.key} className="flex flex-col gap-1">
              <label className="text-[10px] font-black text-gray-400 uppercase ml-1">{f.label}</label>
              <input 
                required
                type={f.type}
                className="p-3 rounded-lg border dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                value={formData[f.key as keyof typeof formData]}
                onChange={(e) => setFormData({...formData, [f.key]: e.target.value})}
              />
            </div>
          ))}
          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>Batal</Button>
            <Button type="submit" className="px-6">Simpan</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}