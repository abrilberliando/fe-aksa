"use client";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useTheme } from "@/hooks/useTheme";
import Link from "next/link";

export const Navbar = () => {
  const { user, logout } = useAuth();
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
    <nav className="flex items-center justify-between px-6 py-4 bg-white dark:bg-black sticky top-0 z-50">
      {/* LOGO */}
      <Link href="/" className="font-bold text-xl tracking-tight dark:text-white">
        AKSAMEDIA
      </Link>

      <div className="flex items-center gap-4">
        {/* THEME DROPDOWN */}
        <div className="relative" ref={themeRef}>
          <button 
            onClick={() => { setThemeOpen(!isThemeOpen); setProfileOpen(false); }}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 transition-colors"
          >
            {themeIcons[theme as keyof typeof themeIcons]}
          </button>

          {isThemeOpen && (
            <div className="absolute right-0 mt-2 w-36 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg shadow-lg py-1">
              {(['light', 'dark', 'system'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => { setTheme(t); setThemeOpen(false); }}
                  className={`flex w-full px-4 py-2 text-sm capitalize hover:bg-gray-100 dark:hover:bg-gray-700 ${theme === t ? 'font-bold text-blue-600' : ''}`}
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
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <span className="text-sm font-medium dark:text-gray-200">{user?.fullName}</span>
            <span className={`text-[10px] transition-transform ${isProfileOpen ? 'rotate-180' : ''}`}>▼</span>
          </button>

          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg shadow-lg overflow-hidden">
              <div className="px-4 py-3 border-b dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                <p className="text-xs text-gray-500 uppercase font-semibold">Account</p>
                <p className="text-sm font-medium truncate dark:text-white">{user?.fullName}</p>
              </div>
              
              <Link href="/dashboard/profile" className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-300">
                Edit Profile
              </Link>
              
              <button 
                onClick={logout}
                className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 border-t dark:border-gray-700"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};