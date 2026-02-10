"use client";
import { useEffect, useState } from "react";

type Theme = "dark" | "light" | "system";

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>("system");

  // Load theme dari LocalStorage pas awal mount
  useEffect(() => {
    const timer = setTimeout(() => {
      const storedTheme = localStorage.getItem("theme_preference") as Theme;
      if (storedTheme) {
        setTheme(storedTheme);
      }
    }, 0);
    
    return () => clearTimeout(timer);
  }, []);

  // Terapkan class ke HTML tag
  useEffect(() => {
    const root = window.document.documentElement;
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const applyTheme = () => {
      root.classList.remove("light", "dark");

      if (theme === "system") {
        const systemTheme = mediaQuery.matches ? "dark" : "light";
        root.classList.add(systemTheme);
      } else {
        root.classList.add(theme);
      }
    };

    applyTheme();

    // Simpan ke storage biar nggak ilang pas refresh
    if (theme !== "system") {
      localStorage.setItem("theme_preference", theme);
    } else {
      localStorage.removeItem("theme_preference");
    }

    mediaQuery.addEventListener("change", applyTheme);
    return () => mediaQuery.removeEventListener("change", applyTheme);
  }, [theme]);

  return { theme, setTheme };
};