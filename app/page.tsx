import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NoticeCard from "@/components/NoticeCard";
import Button from "@/components/ui/Button";
import TopStripe from "@/components/TopStripe";
import CollegeBranding from "@/components/CollegeBranding";
import MainImages from "@/components/MainImages";
import MotionReveal from "@/components/MotionReveal";
import ContactForm from "@/components/ContactForm";
import { Notice } from "@/db/schema";

export const dynamic = "force-dynamic";

async function getLatestNotices() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const response = await fetch(`${baseUrl}/api/notices`, { cache: "no-store" });
    if (!response.ok) return [];
    const notices = await response.json();
    return notices.slice(0, 3);
  } catch (error) {
    console.error("Error fetching notices:", error);
    return [];
  }
}

const stats = [
  { value: "300+", label: "Students" },
  { value: "16+", label: "Teachers" },
  { value: "95%", label: "Pass Rate" },
  { value: "25+", label: "Years of Excellence" },
];

export default async function Home() {
  const latestNotices = await getLatestNotices();

  return (
    <>
      <TopStripe />
      <CollegeBranding />
      <Navbar />
      <main className="overflow-hidden bg-white">
        <section className="site-container pt-5 md:pt-8">
          <MotionReveal>
            <div className="relative h-[58vw] min-h-[310px] max-h-[650px] overflow-hidden rounded-2xl border border-[#EADFD2] shadow-[0_24px_70px_rgba(95,15,26,0.16)] md:rounded-[2rem]">
              <MainImages />
            </div>
          </MotionReveal>
        </section>

        <section className="site-container relative z-10 -mt-2 md:-mt-10">
          <MotionReveal delay={0.08}>
            <div className="grid grid-cols-2 overflow-hidden rounded-2xl border border-[#EADFD2] bg-white shadow-[0_18px_55px_rgba(95,15,26,0.12)] md:grid-cols-4 md:rounded-3xl">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className={`px-4 py-6 text-center md:px-6 md:py-8 ${
                    index % 2 === 0 ? "border-r border-[#F0E5D8]" : ""
                  } ${index < 2 ? "border-b border-[#F0E5D8] md:border-b-0" : ""} ${
                    index === 1 ? "md:border-r" : ""
                  }`}
                >
                  <strong className="block font-[var(--font-inter)] text-3xl font-black tracking-[-0.04em] text-[#8B1E2D] md:text-4xl">
                    {stat.value}
                  </strong>
                  <span className="mt-1 block text-sm font-bold text-[#765F5F] md:text-base">
                    {stat.label}
                  </span>
                  <span className="mx-auto mt-4 block h-0.5 w-8 bg-[#F4B400]" />
                </div>
              ))}
            </div>
          </MotionReveal>
        </section>

        <section className="section-shell">
          <div className="site-container">
            <MotionReveal className="mb-8 flex items-end justify-between gap-4 md:mb-10">
              <div>
                <h2 className="section-title">Latest Announcements</h2>
                <p className="section-copy mt-3">Important updates from the college notice board.</p>
              </div>
              <Link
                href="/notices"
                className="hidden min-h-11 items-center gap-2 text-sm font-extrabold text-[#C62828] sm:inline-flex"
              >
                View All
                <span aria-hidden>→</span>
              </Link>
            </MotionReveal>

            {latestNotices.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-3 md:gap-6">
                {latestNotices.map((notice: Notice, index: number) => (
                  <MotionReveal key={notice.id} delay={index * 0.08}>
                    <NoticeCard notice={notice} />
                  </MotionReveal>
                ))}
              </div>
            ) : (
              <MotionReveal>
                <div className="rounded-2xl border border-dashed border-[#D2BFAE] bg-[#FFFDF5] p-10 text-center text-[#765F5F]">
                  No announcements at the moment. Check back later.
                </div>
              </MotionReveal>
            )}
            <Link
              href="/notices"
              className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-extrabold text-[#C62828] sm:hidden"
            >
              View All Announcements →
            </Link>
          </div>
        </section>

        <section className="bg-[#FFFDF5]">
          <div className="site-container grid items-center gap-10 py-16 md:grid-cols-2 md:py-24 lg:gap-16">
            <MotionReveal className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-[0_20px_55px_rgba(95,15,26,0.14)] md:rounded-3xl">
              <Image
                src="/college_gate.jpg"
                alt="AKIC Payandapur college gate"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                quality={90}
              />
            </MotionReveal>
            <MotionReveal delay={0.08}>
              <h2 className="section-title">About Our Institution</h2>
              <p className="section-copy mt-6">
                AKIC Payandapur was founded in 1994, we are committed to providing
                quality education and fostering holistic development. Our institution
                combines traditional values with modern teaching methodologies to
                prepare students for the challenges of tomorrow.
              </p>
              <Link href="/contact" className="mt-7 inline-flex">
                <Button>
                  Learn More
                  <span aria-hidden>→</span>
                </Button>
              </Link>
            </MotionReveal>
          </div>
        </section>

        <section className="bg-white">
          <div className="site-container py-16 md:py-24">
            <MotionReveal className="mb-10 max-w-3xl md:mb-14">
              <h2 className="section-title">Contact Our College</h2>
              <p className="section-copy mt-4">
                Admission, academics, study resources, or any other query ke liye
                college se contact karein. Our team will respond as soon as possible.
              </p>
            </MotionReveal>

            <div className="grid overflow-hidden rounded-3xl border border-[#EADFD2] bg-white shadow-[0_24px_70px_rgba(95,15,26,0.1)] lg:grid-cols-[0.82fr_1.18fr]">
              <MotionReveal className="bg-[#8B1E2D] p-6 text-white sm:p-8 md:p-10">
                <h3 className="font-[var(--font-inter)] text-2xl font-extrabold">
                  Get in Touch
                </h3>
                <p className="mt-3 max-w-sm leading-7 text-white/75">
                  Visit the college campus or reach us by phone and email during
                  working hours.
                </p>

                <div className="mt-9 space-y-7">
                  <div className="flex gap-4">
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#F4B400] text-[#5F0F1A]">
                      <svg
                        viewBox="0 0 24 24"
                        className="size-5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <circle cx="12" cy="10" r="2.5" />
                      </svg>
                    </span>
                    <div>
                      <p className="font-extrabold">College Address</p>
                      <p className="mt-1 leading-6 text-white/70">
                        AKIC Payandapur, Moradabad
                        <br />
                        Uttar Pradesh - 244602
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#F4B400] text-[#5F0F1A]">
                      <svg
                        viewBox="0 0 24 24"
                        className="size-5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.62 2.63a2 2 0 0 1-.45 2.11L8 9.73a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.85.29 1.73.5 2.63.62A2 2 0 0 1 22 16.92Z"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <div>
                      <p className="font-extrabold">Phone</p>
                      <a
                        href="tel:+917500188177"
                        className="mt-1 block text-white/70 transition hover:text-white"
                      >
                        +91 7500188177
                      </a>
                      <a
                        href="tel:+916395446776"
                        className="mt-1 block text-white/70 transition hover:text-white"
                      >
                        +91 6395446776
                      </a>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#F4B400] text-[#5F0F1A]">
                      <svg
                        viewBox="0 0 24 24"
                        className="size-5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          d="m4 4 8 7 8-7M4 4h16v16H4V4Z"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <div>
                      <p className="font-extrabold">Email</p>
                      <a
                        href="mailto:akicpayandapur@gmail.com"
                        className="mt-1 block break-all text-white/70 transition hover:text-white"
                      >
                        akicpayandapur@gmail.com
                      </a>
                    </div>
                  </div>
                </div>

                <Link
                  href="/contact"
                  className="mt-10 inline-flex min-h-11 items-center gap-2 font-extrabold text-[#F4B400] transition hover:gap-3"
                >
                  View full contact page
                  <span aria-hidden>→</span>
                </Link>
              </MotionReveal>

              <MotionReveal delay={0.08} className="p-6 sm:p-8 md:p-10">
                <h3 className="font-[var(--font-inter)] text-2xl font-extrabold text-[#5F0F1A]">
                  Send Us a Message
                </h3>
                <p className="mt-2 mb-7 text-[#765F5F]">
                  Form fill karein aur apna message college administration ko send
                  karein.
                </p>
                <ContactForm />
              </MotionReveal>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
