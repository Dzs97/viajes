"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";

export default function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="header" id="top">
      <div className="header-inner">
        <Link href="/" className="logo">
          <span className="logo-mark">3W</span>
          <span>Three Weeks</span>
        </Link>
        <nav className="site-nav" aria-label="Navegación principal">
          <Link
            href="/"
            className="site-nav-link"
            data-active={pathname === "/"}
          >
            Itinerario
          </Link>
          <Link
            href="/basics"
            className="site-nav-link"
            data-active={pathname === "/basics"}
          >
            Basics
          </Link>
        </nav>
        <ThemeToggle />
      </div>
    </header>
  );
}
