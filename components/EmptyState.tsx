import React from "react";

interface EmptyStateProps {
  onLoadSample?: () => void;
}

export function EmptyState({ onLoadSample }: EmptyStateProps) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center min-h-[360px]">
      {/* Illustrated Icon Box */}
      <div className="w-16 h-16 rounded-2xl border-2 border-[#141414] bg-[#FFFFFF] shadow-[3px_3px_0px_#141414] flex items-center justify-center mb-4">
        <span className="font-mono text-2xl font-black text-[#66625B]">?_?</span>
      </div>

      <h3 className="font-mono text-sm font-black uppercase tracking-wider text-[#141414] mb-2">
        Awaiting Code Submission
      </h3>

      <p className="text-xs text-[#504535] max-w-xs mb-5 leading-relaxed">
        Your code is suspiciously quiet. Paste your snippet on the left, pick your spice, then hit{" "}
        <strong className="text-[#141414]">Roast Me</strong> or press{" "}
        <kbd className="font-mono bg-[#141414] text-[#FFFFFF] px-1 py-0.5 rounded text-[10px]">
          Ctrl+Enter
        </kbd>
        .
      </p>

      {onLoadSample && (
        <button
          type="button"
          onClick={onLoadSample}
          className="px-4 py-2 rounded-full border-2 border-[#141414] bg-[#EDB13E] text-xs font-bold text-[#141414] shadow-[3px_3px_0px_#141414] hover:shadow-[4px_4px_0px_#141414] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer flex items-center gap-1.5"
        >
          <span>TRY SAMPLE BUG</span>
          <span>→</span>
        </button>
      )}
    </div>
  );
}
