import React from "react";

interface SectionHeaderProps {
  number: number;
  title: string;
  meta?: string;
  children?: React.ReactNode;
}

export function SectionHeader({ number, title, meta, children }: SectionHeaderProps) {
  const formattedNumber = String(number).padStart(2, "0");

  return (
    <div className="flex items-center justify-between pb-2 mb-3 border-b-2 border-[#141414]">
      <div className="flex items-center gap-2">
        <span className="font-mono text-xs font-black tracking-widest text-[#141414]">
          {formattedNumber} // {title.toUpperCase()}
        </span>
      </div>

      <div className="flex items-center gap-2">
        {meta && (
          <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#FFFFFF] border border-[#141414] text-[#66625B]">
            {meta}
          </span>
        )}
        {children}
      </div>
    </div>
  );
}
