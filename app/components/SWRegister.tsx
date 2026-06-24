"use client";

import { useEffect } from "react";

export default function SWRegister() {
  useEffect(() => {
    if (typeof window === "undefined" || !("serviceWorker" in navigator)) return;

    const register = async () => {
      try {
        const registration = await navigator.serviceWorker.register("/sw.js", {
          scope: "/",
        });
        // Auto-update when new SW is installed
        registration.addEventListener("updatefound", () => {
          const installing = registration.installing;
          if (!installing) return;
          installing.addEventListener("statechange", () => {
            if (installing.state === "installed" && navigator.serviceWorker.controller) {
              // New SW ready — user will get fresh content on next reload
              console.log("[PWA] Nueva versión disponible. Recarga para actualizar.");
            }
          });
        });
      } catch (err) {
        console.error("[PWA] Service worker registration failed:", err);
      }
    };

    // Only register in production (avoid dev-server hot-reload conflicts)
    if (process.env.NODE_ENV === "production") {
      register();
    }
  }, []);

  return null;
}
