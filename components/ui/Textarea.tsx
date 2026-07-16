import { TextareaHTMLAttributes } from 'react';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export default function Textarea({ label, error, className = '', ...props }: TextareaProps) {
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={props.id} className="mb-2 block text-sm font-extrabold text-[#542D2D]">
          {label}
        </label>
      )}
      <textarea
        className={`w-full resize-none rounded-xl border bg-white px-4 py-3 text-[#2B1717] outline-none transition placeholder:text-[#A48A7A] focus:border-[#C62828] focus:ring-4 focus:ring-[#C62828]/10 ${
          error ? 'border-red-500' : 'border-[#DCCBBB]'
        } ${className}`}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}

