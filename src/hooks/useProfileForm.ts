"use client";
import { useState, useEffect, FormEvent } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

export const useProfileForm = () => {
  const { user, updateProfile } = useAuth();
  const [name, setName] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();

  // Sinkronisasi nama awal dari Global State ke Local State
  useEffect(() => {
    if (user) {
      const timer = setTimeout(() => {
        setName(user.fullName);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [user]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      alert("Nama jangan kosong !");
      return;
    }

    setIsSaving(true);

    setTimeout(() => {
      updateProfile(name);
      setIsSaving(false);
      router.push("/dashboard");
    }, 500);
  };

  return {
    name,
    setName,
    isSaving,
    handleSubmit,
    initials: name.charAt(0) || user?.fullName.charAt(0) || "A",
  };
};