import Link from "next/link";

const links = [
  ["Home", "/"],
  ["Subjects", "/subjects"],
  ["Notice Board", "/notices"],
  ["Resources", "/resources"],
  ["Gallery", "/gallery"],
  ["Contact", "/contact"],
];

export default function Footer() {
  return (
    <footer className="mt-0 bg-[#5F0F1A] text-white">
      <div className="site-container grid gap-10 py-14 md:grid-cols-[1.35fr_0.8fr_1fr] md:py-18">
        <div>
          <div className="flex items-center gap-3">
            <span className="flex size-12 items-center justify-center rounded-xl bg-white text-sm font-black text-[#8B1E2D]">
              AK
            </span>
            <div>
              <h2 className="font-[var(--font-inter)] text-xl font-extrabold">
                AKIC Payandapur
              </h2>
              <p className="text-sm font-semibold text-white/65">
                आर्य कृषक इण्टर कॉलेज
              </p>
            </div>
          </div>
          <p className="mt-5 max-w-sm leading-7 text-white/65">
            Dilari Road Payandapur, Moradabad - 244602. A Government Inter College
            committed to quality education.
          </p>
        </div>

        <div>
          <h3 className="font-[var(--font-inter)] font-bold">Quick Links</h3>
          <ul className="mt-5 grid grid-cols-2 gap-x-5 gap-y-3 md:grid-cols-1">
            {links.map(([label, href]) => (
              <li key={href}>
                <Link
                  href={href}
                  className="inline-flex min-h-8 items-center text-sm font-semibold text-white/65 transition hover:translate-x-1 hover:text-white"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-[var(--font-inter)] font-bold">Contact Us</h3>
          <ul className="mt-5 space-y-4 text-sm leading-6 text-white/65">
            <li>AKIC Payandapur, Uttar Pradesh - 244602</li>
            <li>
              <a className="transition hover:text-white" href="mailto:akicpayandapur@gmail.com">
                akicpayandapur@gmail.com
              </a>
            </li>
            <li>
              <a className="transition hover:text-white" href="tel:+917500188177">
                +91 7500188177
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="site-container py-5 text-center text-xs text-white/50 sm:text-sm">
          © {new Date().getFullYear()} AKIC Payandapur. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
