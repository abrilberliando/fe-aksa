"use client";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth"; 
import { Button } from "@/components/ui/Button";

export default function LoginPage() {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) return setError("Isi dulu bang, jangan kosong!");
    
    // Lempar data ke logic auth
    login(username, password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-900 p-8 rounded-xl border dark:border-gray-800 shadow-sm">
        
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold dark:text-white uppercase tracking-tight">AKSAMEDIA</h1>
          <p className="mt-2 text-[10px] font-bold text-blue-500 tracking-widest">Hint: admin / pastibisa</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 bg-red-50 dark:bg-red-900/20 text-red-500 text-xs rounded-lg border border-red-100 dark:border-red-900/30">
              {error}
            </div>
          )}
          
          <div className="space-y-1">
            <label className="text-[10px] font-black text-gray-400 uppercase ml-1">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin"
              className="w-full p-3 rounded-lg border dark:bg-gray-800 dark:border-gray-700 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black text-gray-400 uppercase ml-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full p-3 rounded-lg border dark:bg-gray-800 dark:border-gray-700 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>

          <Button type="submit" className="w-full py-6 mt-2 font-bold uppercase tracking-wider">
            Login
          </Button>
        </form>

      </div>
    </div>
  );
}