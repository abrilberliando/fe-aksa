"use client";
import { useProfileForm } from "@/hooks/useProfileForm";
import { Button } from "@/components/ui/Button";

export default function ProfilePage() {
  const { name, setName, isSaving, handleSubmit, initials } = useProfileForm();

  return (
    <div className="flex justify-center py-10 px-4">
      <div className="w-full max-w-xl">
        
        {/* Header simpel */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold uppercase dark:text-white">Settings Profile</h1>
        </div>

        {/* Card utama */}
        <div className="bg-white dark:bg-gray-900 border dark:border-gray-800 rounded-xl p-6 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Input Nama */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Nama Lengkap</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nama baru..."
                className="w-full px-4 py-3 rounded-lg border dark:bg-gray-800 dark:border-gray-700 outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium"
              />
            </div>

            {/* Tombol Aksi */}
            <div className="flex gap-3 pt-2">
              <Button 
                type="submit" 
                className="flex-1 py-3 font-bold uppercase text-xs tracking-wider"
                disabled={isSaving}
              >
                {isSaving ? "Saving..." : "Simpan"}
              </Button>
              <Button 
                type="button" 
                variant="ghost" 
                className="px-6 border dark:border-gray-700"
                onClick={() => window.history.back()}
              >
                Batal
              </Button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}