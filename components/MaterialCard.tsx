import { StudyMaterial } from "@/db/schema";

export default function MaterialCard({ material }: { material: StudyMaterial }) {
  return (
    <article className="group flex flex-col gap-5 rounded-2xl border border-[#EADFD2] bg-white p-5 transition duration-200 hover:-translate-y-0.5 hover:border-[#D2BFAE] hover:shadow-[0_16px_35px_rgba(95,15,26,0.09)] sm:flex-row sm:items-center sm:justify-between md:p-6">
      <div className="min-w-0">
        <div className="mb-3 flex flex-wrap gap-2 text-xs font-extrabold uppercase tracking-[0.08em] text-[#C62828]">
          <span>Class {material.class}</span>
          <span className="text-[#a6b4c8]">•</span>
          <span>{material.subject}</span>
        </div>
        <h3 className="font-[var(--font-inter)] text-lg font-extrabold text-[#2B1717]">
          {material.title}
        </h3>
        {material.description ? (
          <p className="mt-2 max-w-2xl leading-7 text-[#765F5F]">{material.description}</p>
        ) : null}
      </div>
      <a
        href={material.fileUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-[#8B1E2D] px-5 text-sm font-bold text-white transition hover:bg-[#A52836]"
      >
        Download
        <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 3v12m0 0 4-4m-4 4-4-4M5 21h14" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
    </article>
  );
}
