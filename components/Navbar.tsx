/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/subjects", label: "Subjects" },
  { href: "/notices", label: "Notice Board" },
  { href: "/resources", label: "Resources" },
  { href: "/contact", label: "Contact" },
  { href: "/gallery", label: "Gallery" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const supabase = createClient();
    let mounted = true;

    void supabase.auth.getSession().then(({ data }) => {
      if (mounted) setUser(data.session?.user ?? null);
    });

    const { data: subscription } = supabase.auth.onAuthStateChange(
      (_event, session) => setUser(session?.user ?? null)
    );

    return () => {
      mounted = false;
      subscription.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.href = "/login";
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[#EADFD2]/80 bg-white/95 backdrop-blur-xl">
      <div className="site-container flex min-h-18 items-center justify-between gap-4 py-3">
        <Link href="/" className="group flex min-w-0 items-center gap-3">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#8B1E2D] text-sm font-black tracking-tight text-white shadow-sm transition group-hover:-translate-y-0.5">
            AK
          </span>
          <span className="min-w-0">
            <span className="block truncate font-[var(--font-inter)] text-lg font-extrabold tracking-[-0.025em] text-[#8B1E2D] sm:text-xl">
              AKIC Payandapur
            </span>
            <span className="hidden truncate text-xs font-semibold text-[#765F5F] sm:block">
              आर्य कृषक इण्टर कॉलेज
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary navigation">
          {navLinks.map((link) => {
            const active =
              pathname === link.href ||
              (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative rounded-lg px-3 py-2 text-sm font-bold transition ${
                  active
                    ? "text-[#8B1E2D]"
                    : "text-[#6F5555] hover:bg-[#FFFDF5] hover:text-[#8B1E2D]"
                }`}
              >
                {link.label}
                {active ? (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-x-3 -bottom-[13px] h-0.5 bg-[#F4B400]"
                  />
                ) : null}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden lg:block">
            {user ? (
              <div className="flex items-center gap-2">
                <Link
                  href="/admin"
                  className="inline-flex min-h-11 items-center rounded-xl border border-[#DCCBBB] px-4 text-sm font-bold text-[#8B1E2D] transition hover:bg-[#FFFDF5]"
                >
                  Admin Panel
                </Link>
                <button
                  onClick={handleLogout}
                  className="inline-flex min-h-11 items-center rounded-xl bg-[#8B1E2D] px-4 text-sm font-bold text-white transition hover:bg-[#A52836]"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="inline-flex min-h-11 items-center rounded-xl bg-[#8B1E2D] px-5 text-sm font-bold !text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#A52836] hover:!text-white hover:shadow-lg"
              >
                Login
              </Link>
            )}
          </div>

          <button
            onClick={() => setIsOpen((open) => !open)}
            className="flex size-11 items-center justify-center rounded-xl border border-[#EADFD2] bg-white text-[#8B1E2D] lg:hidden"
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            <span className="sr-only">{isOpen ? "Close menu" : "Open menu"}</span>
            <span className="relative block h-4 w-5">
              <span
                className={`absolute left-0 top-0 h-0.5 w-5 bg-current transition ${
                  isOpen ? "translate-y-[7px] rotate-45" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-[7px] h-0.5 w-5 bg-current transition ${
                  isOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-[14px] h-0.5 w-5 bg-current transition ${
                  isOpen ? "-translate-y-[7px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            id="mobile-navigation"
            initial={reduceMotion ? false : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={reduceMotion ? undefined : { opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-[#F0E5D8] bg-white lg:hidden"
          >
            <nav className="site-container grid gap-1 py-4" aria-label="Mobile navigation">
              {navLinks.map((link) => {
                const active =
                  pathname === link.href ||
                  (link.href !== "/" && pathname.startsWith(link.href));
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex min-h-12 items-center rounded-xl px-4 font-bold ${
                      active
                        ? "bg-[#FFF7D6] text-[#8B1E2D]"
                        : "text-[#6F5555] hover:bg-[#FFFDF5]"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <div className="mt-3 border-t border-[#F0E5D8] pt-4">
                {user ? (
                  <div className="grid grid-cols-2 gap-3">
                    <Link
                      href="/admin"
                      className="flex min-h-12 items-center justify-center rounded-xl border border-[#DCCBBB] font-bold text-[#8B1E2D]"
                    >
                      Admin Panel
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="min-h-12 rounded-xl bg-[#8B1E2D] font-bold text-white"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <Link
                    href="/login"
                    className="flex min-h-12 items-center justify-center rounded-xl bg-[#8B1E2D] font-bold !text-white hover:!text-white"
                  >
                    Login
                  </Link>
                )}
              </div>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
