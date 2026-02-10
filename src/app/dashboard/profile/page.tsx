"use client";
import { useProfileForm } from "@/hooks/useProfileForm";
import { Button } from "@/components/ui/Button";

export default function ProfilePage() {
  const { name, setName, isSaving, handleSubmit, initials } = useProfileForm();

  return (
    <div className="flex justify-center py-10 px-4">
      <div className="w-full max-w-xl">
        
        {/* Header - Hacker Vibe */}
        <div className="mb-8">
          <h1 className="text-3xl font-black uppercase dark:text-white tracking-tighter italic">Personnel Settings</h1>
          <p className="text-[10px] font-mono text-blue-500 font-bold uppercase mt-1">Identity_Override_Console</p>
        </div>

        {/* Card Utama */}
        <div className="bg-white dark:bg-gray-950 border-2 dark:border-gray-800 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
          {/* Decorative Background Element */}
          <div className="absolute top-0 right-0 p-4 opacity-10 font-black text-6xl italic select-none">
            {initials}
          </div>

          <form onSubmit={handleSubmit} className="relative z-10 space-y-8">
            <div className="flex items-center gap-6 mb-4">
              <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center text-2xl font-black text-white italic shadow-lg shadow-blue-500/20">
                {initials}
              </div>
              <div>
                <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Personnel Initials</p>
                <p className="text-sm font-mono dark:text-gray-400">STATUS: AUTHENTICATED</p>
              </div>
            </div>

            {/* Input Nama */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-gray-500 ml-1 tracking-widest">Update Display Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter new identity..."
                className="w-full px-5 py-4 rounded-xl border-2 dark:bg-gray-900 dark:border-gray-800 outline-none focus:ring-2 focus:ring-blue-600 transition-all font-bold tracking-tight dark:text-white"
              />
            </div>

            {/* Tombol Aksi */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button 
                type="submit" 
                className="flex-1 py-4 font-black uppercase italic tracking-widest bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/20"
                disabled={isSaving}
              >
                {isSaving ? "EXECUTING..." : "Save Identity"}
              </Button>
              <Button 
                type="button" 
                variant="ghost" 
                className="px-8 py-4 border-2 dark:border-gray-800 font-black uppercase text-xs"
                onClick={() => window.history.back()}
              >
                Abort
              </Button>
            </div>
          </form>
        </div>

        {/* Security Footer */}
        <div className="mt-6 text-center">
          <p className="text-[9px] font-mono text-gray-500 uppercase tracking-[0.3em]">
            Warning: Identity changes are logged by system_admin
          </p>
        </div>
      </div>
    </div>
  );
}