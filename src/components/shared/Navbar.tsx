"use client";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useTheme } from "@/hooks/useTheme";
import Link from "next/link";

export const Navbar = () => {
  const { user, logout, loading } = useAuth();
  const { setTheme, theme } = useTheme();
  
  const [isProfileOpen, setProfileOpen] = useState(false);
  const [isThemeOpen, setThemeOpen] = useState(false);
  
  const profileRef = useRef<HTMLDivElement>(null);
  const themeRef = useRef<HTMLDivElement>(null);

  // Close dropdown logic
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) setProfileOpen(false);
      if (themeRef.current && !themeRef.current.contains(e.target as Node)) setThemeOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const themeIcons = { light: "🌞", dark: "🌑", system: "💻" };

  return (
    <nav className="flex items-center justify-between py-4 transition-all">
      {/* BRAND LOGO */}
      <div className="flex items-center gap-6">
        <Link href="/dashboard" className="group">
          <span className="font-black text-2xl tracking-tighter dark:text-white uppercase italic group-hover:text-blue-600 transition-colors">
            AKSA<span className="text-blue-600 group-hover:dark:text-white">MEDIA</span>
          </span>
          <div className="h-0.5 w-0 group-hover:w-full bg-blue-600 transition-all duration-300"></div>
        </Link>
        
        {/* Decorative Status - ID dari /me */}
        <div className="hidden lg:flex flex-col border-l dark:border-gray-800 pl-6">
          <span className="text-[9px] font-black text-blue-500 uppercase tracking-[0.2em]">Secure_Link</span>
          <span className="text-[10px] font-mono text-gray-400">
            {loading ? "FETCHING..." : `ID: ${user?.id?.slice(0, 8) || "GUEST"}`}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* THEME DROPDOWN */}
        <div className="relative" ref={themeRef}>
          <button 
            onClick={() => { setThemeOpen(!isThemeOpen); setProfileOpen(false); }}
            className="p-2.5 rounded-xl border dark:border-gray-800 bg-gray-50 dark:bg-gray-900 hover:border-blue-500 transition-all shadow-sm"
          >
            <span className="text-lg">{themeIcons[theme as keyof typeof themeIcons]}</span>
          </button>

          {isThemeOpen && (
            <div className="absolute right-0 mt-3 w-40 bg-white dark:bg-gray-950 border dark:border-gray-800 rounded-xl shadow-2xl py-2 overflow-hidden animate-in fade-in slide-in-from-top-2">
              <p className="px-4 py-1 text-[9px] font-black text-gray-500 uppercase">Visual_Mode</p>
              {(['light', 'dark', 'system'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => { setTheme(t); setThemeOpen(false); }}
                  className={`flex w-full px-4 py-2.5 text-xs font-bold uppercase tracking-wider hover:bg-blue-600 hover:text-white transition-colors ${theme === t ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/20' : 'dark:text-gray-400'}`}
                >
                  {t}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* PROFILE DROPDOWN */}
        <div className="relative" ref={profileRef}>
          <button 
            onClick={() => { setProfileOpen(!isProfileOpen); setThemeOpen(false); }}
            className="flex items-center gap-3 pl-3 pr-4 py-1.5 rounded-xl border dark:border-gray-800 bg-gray-50 dark:bg-gray-900 hover:border-blue-500 transition-all shadow-sm group"
          >
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-black text-white text-xs uppercase italic">
              {user?.name?.charAt(0) || "A"}
            </div>
            <div className="hidden sm:flex flex-col items-start leading-tight">
              <span className="text-xs font-black dark:text-white uppercase tracking-tighter">
                {loading ? "..." : (user?.name || "Member")}
              </span>
              <span className="text-[9px] text-gray-500 font-mono">AUTHORIZED</span>
            </div>
            <span className={`text-[10px] text-gray-400 transition-transform duration-300 ${isProfileOpen ? 'rotate-180' : ''}`}>▼</span>
          </button>

          {isProfileOpen && (
            <div className="absolute right-0 mt-3 w-56 bg-white dark:bg-gray-950 border dark:border-gray-800 rounded-xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2">
              <div className="px-5 py-4 border-b dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50">
                <p className="text-[9px] font-black text-blue-500 uppercase tracking-widest mb-1">Session_Identity</p>
                <p className="text-sm font-black truncate dark:text-white uppercase">{user?.name}</p>
                <p className="text-[10px] font-mono text-gray-500">{user?.email}</p>
              </div>
              
              <div className="p-1">
                <Link href="/dashboard/profile" className="flex items-center gap-3 px-4 py-2.5 text-xs font-bold uppercase text-gray-600 dark:text-gray-400 hover:bg-blue-600 hover:text-white rounded-lg transition-colors">
                  <span>👤</span> Profile_Settings
                </Link>
                
                <button 
                  onClick={logout}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold uppercase text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition-colors border-t dark:border-gray-800 mt-1"
                >
                  <span>🚪</span> Terminate_Session
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};