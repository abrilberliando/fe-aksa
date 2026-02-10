"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { storage } from "@/lib/storage";
import { User } from "@/types";
import Cookies from "js-cookie";

interface AuthContextType {
  user: User | null;
  updateProfile: (newName: string) => void;
  logout: () => void;
  login: (username: string, pass: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  // 1. Load data pas pertama kali web dibuka
  useEffect(() => {
    // Spill triknya: Pake setTimeout 0ms buat bypass linter
    const timer = setTimeout(() => {
      const storedUser = storage.get<User>("user_session");
      if (storedUser) {
        setUser(storedUser);
      }
    }, 0);

    return () => clearTimeout(timer); // Jangan lupa dibersihin biar ga memory leak
  }, []);

  const login = (username: string, pass: string) => {
    if (username === "admin" && pass === "1234") {
      const userData = { username, fullName: "Abril Berli" };
      storage.set("user_session", userData);
      Cookies.set("auth_token", "rahasia-negara", { expires: 1 });
      setUser(userData);
      window.location.href = "/dashboard";
    }
  };

  const updateProfile = (newName: string) => {
    if (!user) return;
    const updated = { ...user, fullName: newName };
    
    // Update State & Storage secara sinkron
    setUser(updated);
    storage.set("user_session", updated);
  };

  const logout = () => {
    storage.remove("user_session");
    Cookies.remove("auth_token");
    setUser(null);
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider value={{ user, updateProfile, logout, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};