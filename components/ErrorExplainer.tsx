import React from "react";

interface ErrorExplainerProps {
  errorText: string;
}

export function ErrorExplainer({ errorText }: ErrorExplainerProps) {
  if (!errorText) return null;

  return (
    <div className="bg-[#EFF2FB] rounded-xl border-2 border-[#141414] shadow-[3px_3px_0px_#141414] p-4 mb-4">
      <div className="flex items-center gap-2 mb-1.5">
        <span className="font-mono text-xs font-black uppercase tracking-wider text-[#4C80F0]">
          ERROR // WHAT HAPPENED
        </span>
      </div>

      <div className="text-xs text-[#141414] leading-relaxed">
        <span className="font-bold text-[#D9503F]">Yeh error ka matlab: </span>
        <span>{errorText}</span>
      </div>
    </div>
  );
}
