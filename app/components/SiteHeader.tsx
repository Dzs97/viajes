"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";

export default function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="header" id="top">
      <div className="header-inner">
        <Link href="/" className="logo" aria-label="My Travel — Home">
          <span className="logo-mark logo-mark-art">
            {/* Mini ícono SVG: avión sobre castillo y mar */}
            <svg viewBox="0 0 192 192" xmlns="http://www.w3.org/2000/svg">
              <rect width="192" height="192" fill="#c84c2a" />
              <circle cx="148" cy="50" r="22" fill="#fbf6ec" />
              <rect x="48" y="118" width="96" height="28" fill="#1f2a2a" />
              <rect x="40" y="98" width="14" height="48" fill="#1f2a2a" />
              <polygon points="38,98 56,98 47,82" fill="#1f2a2a" />
              <rect x="138" y="98" width="14" height="48" fill="#1f2a2a" />
              <polygon points="136,98 154,98 145,82" fill="#1f2a2a" />
              <rect x="93" y="108" width="6" height="10" fill="#1f2a2a" />
              <polygon points="90,108 102,108 96,99" fill="#1f2a2a" />
              <path
                d="M 0 150 Q 16 146 32 150 T 64 150 T 96 150 T 128 150 T 160 150 T 192 150 L 192 192 L 0 192 Z"
                fill="#b8893a"
              />
              <g transform="translate(70, 56) rotate(-18)">
                <rect x="-22" y="-3" width="46" height="6" rx="3" fill="#fbf6ec" />
                <polygon points="0,-3 10,-20 16,-3" fill="#fbf6ec" />
                <polygon points="0,3 10,20 16,3" fill="#fbf6ec" />
                <polygon points="-22,-3 -30,-12 -16,-3" fill="#fbf6ec" />
                <polygon points="-22,3 -30,12 -16,3" fill="#fbf6ec" />
                <polygon points="24,-3 30,0 24,3" fill="#fbf6ec" />
              </g>
            </svg>
          </span>
          <span>My Travel</span>
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
