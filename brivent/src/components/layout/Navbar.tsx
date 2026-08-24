"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { mainNav, primaryNavCta } from "@/data/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 backdrop-blur-md border-b transition-colors duration-300 ${
        scrolled
          ? "bg-white/90 border-border"
          : "bg-white/60 border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/logos/brivent/img.png"
            alt="Brivent"
            width={64}
            height={64}
            className="w-16 h-16 object-contain"
            priority
          />
          <span className="text-2xl font-bold tracking-tight text-foreground">
            {/* brivent<span className="text-flamingo">.</span> */}
          </span>
        </Link>

        <div className="hidden lg:flex items-center gap-7">
          {mainNav.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm transition-colors ${
                pathname === link.href
                  ? "text-accent font-medium"
                  : "text-muted hover:text-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={primaryNavCta.href}
            className="px-5 py-2.5 bg-accent text-white text-sm font-semibold rounded-lg hover:bg-accent-dark transition-colors whitespace-nowrap"
          >
            {primaryNavCta.label}
          </Link>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-foreground"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isOpen && (
        <div className="lg:hidden bg-white border-b border-border px-6 py-4 flex flex-col gap-4">
          {mainNav.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-muted hover:text-accent transition-colors text-sm"
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={primaryNavCta.href}
            className="px-5 py-2.5 bg-accent text-white font-semibold rounded-lg text-center text-sm"
            onClick={() => setIsOpen(false)}
          >
            {primaryNavCta.label}
          </Link>
        </div>
      )}
    </nav>
  );
}