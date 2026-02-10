"use client";
import { useState, useEffect, FormEvent } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import api from "@/lib/axios"; // Pake api instance kita [cite: 2026-02-10]

export const useProfileForm = () => {
  const { user } = useAuth();
  const [name, setName] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (user?.name) { // Ganti ke .name sesuai /me [cite: 2026-02-10]
      setName(user.name);
    }
  }, [user]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      alert("Identity name required, G!");
      return;
    }

    setIsSaving(true);
    try {
      await api.put("/profile/update", { name }); // Hit real API [cite: 2026-02-10]
      alert("Profile synchronized successfully!");
      router.push("/dashboard");
      window.location.reload(); // Refresh buat trigger /me di AuthProvider [cite: 2026-02-10]
    } catch (error) {
      alert("Update failed. System error.");
    } finally {
      setIsSaving(false);
    }
  };

  return {
    name,
    setName,
    isSaving,
    handleSubmit,
    initials: name.charAt(0) || user?.name?.charAt(0) || "A",
  };
};