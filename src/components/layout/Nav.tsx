"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { navLinks, site } from "@/data/site";
import { cn } from "@/lib/utils";


/** Highlights the nav link for the section currently in view (home page only). */
function useActiveSection(enabled: boolean) {
  const [active, setActive] = useState("");

  useEffect(() => {
    if (!enabled) return;
    const elements = navLinks
      .map((l) => document.getElementById(l.id))
      .filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [enabled]);

  return active;
}

export function Nav() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const activeSection = useActiveSection(isHome);
  const active = isHome ? activeSection : pathname.startsWith("/projects") ? "projects" : "";

  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the menu on route change.
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  // Mobile menu: lock scroll, close on Escape, return focus to the button.
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const button = menuButton.current;
    panel.current?.querySelector<HTMLElement>("a")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
      button?.focus();
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300",
        // no backdrop-filter while the menu is open: it would become the containing block of the fixed panel and collapse it
        open ? "border-line bg-bg" : scrolled ? "border-line bg-bg/90 backdrop-blur-md" : "border-transparent",
      )}
    >
      <nav aria-label="Main" className="container-page flex h-16 items-center justify-between gap-6">
        <Link href="/" className="group flex items-center" aria-label={`${site.name}, home`}>
          <Image
            src="/brand/logo-as.png"
            alt=""
            width={325}
            height={243}
            priority
            className="h-14 w-auto transition-transform duration-300 group-hover:-rotate-2"
          />
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => {
            const isActive = active === link.id;
            return (
              <li key={link.id}>
                <Link
                  href={link.href}
                  aria-current={isActive ? (isHome ? "location" : "page") : undefined}
                  className={cn(
                    "relative py-1 text-sm transition-colors",
                    "after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:bg-accent after:transition-transform after:duration-300",
                    isActive ? "text-fg after:scale-x-100" : "text-fg-muted after:scale-x-0 hover:text-fg hover:after:scale-x-100",
                  )}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <button
          ref={menuButton}
          type="button"
          className="inline-flex size-10 items-center justify-center rounded-full border border-line-strong text-fg md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-4" aria-hidden="true" /> : <Menu className="size-4" aria-hidden="true" />}
        </button>
      </nav>

      {open && (
        <div ref={panel} id="mobile-menu" className="fade-up fixed inset-x-0 bottom-0 top-16 overflow-y-auto bg-bg md:hidden">
          <ul className="container-page flex flex-col pt-6">
            {navLinks.map((link) => (
              <li key={link.id} className="border-b border-line">
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  aria-current={active === link.id ? "page" : undefined}
                  className={cn("block py-5 font-display text-3xl font-bold tracking-tight", active === link.id ? "text-accent" : "text-fg")}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
