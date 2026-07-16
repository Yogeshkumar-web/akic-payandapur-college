import Image from "next/image";

export default function CollegeBranding({
  leftLogoUrl = "/maa.png",
  rightImageUrl = "/up-board-logo.png",
}: {
  leftLogoUrl?: string;
  rightImageUrl?: string;
}) {
  return (
    <section className="border-b border-[#F0E5D8] bg-white">
      <div className="site-container grid items-center gap-5 py-6 sm:grid-cols-[88px_1fr_88px] md:py-8">
        <div className="hidden aspect-square items-center justify-center rounded-2xl bg-[#FFFDF5] p-2 sm:flex">
          <Image
            width={120}
            height={120}
            src={leftLogoUrl}
            alt="Maa Saraswati"
            className="h-full w-full object-contain"
            priority
          />
        </div>
        <div className="text-center">
          <h1 className="font-[var(--font-inter)] text-3xl font-black tracking-[-0.04em] text-[#8B1E2D] sm:text-4xl lg:text-5xl">
            AKIC Payandapur
          </h1>
          <p className="mt-2 text-xl font-extrabold leading-tight text-[#8d2635] sm:text-2xl lg:text-3xl">
            आर्य कृषक इण्टर कॉलेज
          </p>
          <p className="mt-1 font-bold text-[#765F5F]">पायन्दापुर, मुरादाबाद</p>
        </div>
        <div className="hidden aspect-square items-center justify-center rounded-2xl border border-[#F0E5D8] bg-white p-3 sm:flex">
          <Image
            width={120}
            height={120}
            src={rightImageUrl}
            alt="UP Board Logo"
            className="h-full w-full object-contain"
            priority
          />
        </div>
      </div>
    </section>
  );
}
