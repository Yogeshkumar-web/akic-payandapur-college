import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline";
  fullWidth?: boolean;
}

export default function Button({
  children,
  variant = "primary",
  fullWidth = false,
  className = "",
  ...props
}: ButtonProps) {
  const variants = {
    primary:
      "bg-[#8B1E2D] text-white border-[#8B1E2D] hover:bg-[#A52836] hover:-translate-y-0.5 hover:shadow-lg",
    secondary:
      "bg-[#FFF7D6] text-[#8B1E2D] border-[#F1D6A8] hover:bg-[#FFE9A8]",
    outline:
      "bg-white text-[#8B1E2D] border-[#DCCBBB] hover:border-[#8B1E2D] hover:bg-[#FFFDF5]",
  };

  return (
    <button
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border px-5 py-2.5 text-sm font-bold transition duration-200 disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-50 ${
        variants[variant]
      } ${fullWidth ? "w-full" : ""} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
