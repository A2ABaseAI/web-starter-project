import { useEffect, useState } from "react";
export type Theme = "light" | "dark";
export function useTheme(): [Theme, (t: Theme) => void, () => void] {
  const getInitial = (): Theme => {
    const ls = localStorage.getItem("theme");
    if (ls === "light" || ls === "dark") return ls;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  };
  const [theme, setTheme] = useState<Theme>(getInitial);
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark"); else root.classList.remove("dark");
    localStorage.setItem("theme", theme);
  }, [theme]);
  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => {
      const ls = localStorage.getItem("theme");
      if (!ls) setTheme(media.matches ? "dark" : "light");
    };
    media.addEventListener?.("change", handler);
    return () => media.removeEventListener?.("change", handler);
  }, []);
  const toggle = () => setTheme(theme === "dark" ? "light" : "dark");
  return [theme, setTheme, toggle];
}
