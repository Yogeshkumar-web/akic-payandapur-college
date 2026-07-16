"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NoticeCard from "@/components/NoticeCard";
import MotionReveal from "@/components/MotionReveal";
import { Notice } from "@/db/schema";

const categories = ["All", "Academic", "Events", "Holidays", "General"];

export default function NoticesPage() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await fetch("/api/notices");
        if (response.ok) setNotices(await response.json());
      } catch (error) {
        console.error("Error fetching notices:", error);
      } finally {
        setLoading(false);
      }
    };
    void fetchNotices();
  }, []);

  const filteredNotices =
    selectedCategory === "All"
      ? notices
      : notices.filter((notice) => notice.category === selectedCategory);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        <section className="page-heading">
          <div className="site-container">
            <MotionReveal>
              <h1>Notice Board</h1>
              <p className="section-copy mt-4 max-w-2xl">
                Stay informed with the latest academic updates, events, holidays, and
                general announcements.
              </p>
            </MotionReveal>
          </div>
        </section>

        <section className="site-container py-10 md:py-16">
          <div className="mb-9 flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none]">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`min-h-11 shrink-0 rounded-xl border px-5 text-sm font-extrabold transition ${
                  selectedCategory === category
                    ? "border-[#8B1E2D] bg-[#8B1E2D] text-white"
                    : "border-[#EADFD2] bg-white text-[#765F5F] hover:border-[#CDB6A4] hover:text-[#8B1E2D]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="flex min-h-64 flex-col items-center justify-center text-[#765F5F]">
              <div className="size-10 animate-spin rounded-full border-4 border-[#EADFD2] border-t-[#C62828]" />
              <p className="mt-4 font-bold">Loading notices...</p>
            </div>
          ) : filteredNotices.length > 0 ? (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {filteredNotices.map((notice, index) => (
                <MotionReveal key={notice.id} delay={(index % 3) * 0.06}>
                  <NoticeCard notice={notice} />
                </MotionReveal>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-[#D2BFAE] bg-[#FFFDF5] px-5 py-16 text-center">
              <h2 className="font-[var(--font-inter)] text-xl font-extrabold text-[#2B1717]">
                No notices found
              </h2>
              <p className="mt-2 text-[#765F5F]">
                There are no announcements in this category right now.
              </p>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
