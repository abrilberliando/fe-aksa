"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { storage } from "@/lib/storage";
import { User } from "@/types";
import Cookies from "js-cookie";
import api from "@/lib/axios";
import { useRouter } from "next/navigation";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (username: string, pass: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // Default true buat initial check
  const router = useRouter();

  /**
   * 1. Fungsi Validasi Session via Endpoint /me
   * Biar data profil sinkron terus sama DB Laravel lu.
   */
  const fetchCurrentUser = async () => {
    const token = Cookies.get("auth_token");
    
    if (!token) {
      setLoading(false);
      setUser(null);
      return;
    }

    try {
      // Hit endpoint /me yang barusan kita buat di backend
      const response = await api.get("/me");
      const userData = response.data.data;
      
      setUser(userData);
      storage.set("user_session", userData); // Sync ke local storage buat backup
    } catch (error) {
      // Jika token expired atau invalid, lakuin pembersihan total
      console.error("Session invalid, logging out...", error);
      storage.remove("user_session");
      Cookies.remove("auth_token");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Jalankan pengecekan tiap kali aplikasi pertama kali dibuka
  useEffect(() => {
    fetchCurrentUser();
  }, []);

  /**
   * 2. Fungsi Login (Task 1)
   */
  const login = async (username: string, pass: string) => {
    setLoading(true);
    try {
      const response = await api.post("/login", {
        username: username,
        password: pass,
      });

      const { token, admin } = response.data.data;

      // Simpan Token di Cookie agar middleware.ts bisa baca
      Cookies.set("auth_token", token, { expires: 1 }); // Expire 1 hari
      
      // Simpan User di State & Storage
      storage.set("user_session", admin);
      setUser(admin);

      router.push("/dashboard");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const msg = error.response?.data?.message || "Login Failed, Check your connection G!";
      alert(msg);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  /**
   * 3. Fungsi Logout (Task 7)
   */
  const logout = async () => {
    setLoading(true);
    try {
      // Revoke token di sisi server Laravel
      await api.post("/logout");
    } catch (error) {
      console.warn("Server logout failed, clearing local session anyway.");
    } finally {
      // Hapus semua jejak digital di browser
      storage.remove("user_session");
      Cookies.remove("auth_token");
      setUser(null);
      router.push("/login");
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, logout, login }}>
      {/* Kalo lagi loading initial check, lu bisa nampilin spinner di sini 
         biar user nggak ngeliat konten dashboard sedetik sebelum ditendang middleware.
      */}
      {!loading ? children : (
        <div className="h-screen w-full flex items-center justify-center bg-white dark:bg-black font-mono text-blue-500 animate-pulse uppercase">
          Synchronizing_Identity...
        </div>
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};