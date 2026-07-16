import { ReactNode } from "react";

export default function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-[#EADFD2] bg-white p-5 shadow-[0_10px_30px_rgba(95,15,26,0.07)] md:p-7 ${className}`}
    >
      {children}
    </div>
  );
}
