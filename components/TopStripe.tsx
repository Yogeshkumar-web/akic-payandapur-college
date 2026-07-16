"use client";

export default function TopStripe({
  email = "info@akicpayandapur.com",
  phone = "+91 591 245 6789",
}: {
  socialLinks?: Array<{ name: string; href: string; icon: string }>;
  email?: string;
  phone?: string;
}) {
  return (
    <div className="border-b border-white/10 bg-[#5F0F1A] text-white">
      <div className="site-container flex min-h-9 items-center justify-center gap-5 py-2 text-center text-xs font-semibold text-white/80 sm:justify-end sm:text-sm">
        <a className="transition hover:text-white" href={`tel:${phone.replace(/\s/g, "")}`}>
          {phone}
        </a>
        <span className="hidden h-4 w-px bg-white/25 sm:block" />
        <a className="hidden transition hover:text-white sm:inline" href={`mailto:${email}`}>
          {email}
        </a>
      </div>
    </div>
  );
}
