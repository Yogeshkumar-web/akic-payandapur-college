import { Notice } from "@/db/schema";

const categoryStyles: Record<string, string> = {
  Academic: "bg-yellow-50 text-red-800",
  Events: "bg-emerald-50 text-emerald-700",
  Holidays: "bg-amber-50 text-amber-700",
  General: "bg-slate-100 text-slate-700",
};

export default function NoticeCard({ notice }: { notice: Notice; index?: number }) {
  return (
    <article className="group relative rounded-2xl border border-[#EADFD2] bg-white p-5 transition duration-200 hover:-translate-y-1 hover:border-[#D2BFAE] hover:shadow-[0_18px_45px_rgba(95,15,26,0.1)] md:p-6">
      <div className="flex items-start justify-between gap-4">
        <span
          className={`rounded-lg px-2.5 py-1 text-xs font-extrabold ${
            categoryStyles[notice.category] ?? categoryStyles.General
          }`}
        >
          {notice.category}
        </span>
        <time className="shrink-0 text-xs font-bold text-[#7a879c]">
          {new Date(notice.date).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </time>
      </div>
      <h3 className="mt-5 font-[var(--font-inter)] text-lg font-extrabold leading-snug text-[#2B1717]">
        {notice.title}
      </h3>
      <p className="mt-3 line-clamp-3 leading-7 text-[#765F5F]">{notice.content}</p>
      {notice.attachmentUrl ? (
        <a
          href={notice.attachmentUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex min-h-10 items-center gap-2 text-sm font-extrabold text-[#C62828] transition group-hover:gap-3"
        >
          View attachment
          <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="m9 18 6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      ) : null}
    </article>
  );
}
