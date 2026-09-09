"use client";
import { useEffect, useState } from "react";

const DESKTOP = "(min-width: 1024px)";
const REDUCED = "(prefers-reduced-motion: reduce)";

function compute(): boolean {
  if (typeof window === "undefined") return false;
  const nav = navigator as Navigator & { connection?: { saveData?: boolean } };
  return (
    window.matchMedia(DESKTOP).matches &&
    !window.matchMedia(REDUCED).matches &&
    nav.connection?.saveData !== true
  );
}

export function useVideoAllowed(): boolean {
  const [allowed, setAllowed] = useState(false);
  useEffect(() => {
    const update = () => setAllowed(compute());
    update();
    const mqs = [window.matchMedia(DESKTOP), window.matchMedia(REDUCED)];
    mqs.forEach((m) => m.addEventListener("change", update));
    return () => mqs.forEach((m) => m.removeEventListener("change", update));
  }, []);
  return allowed;
}
