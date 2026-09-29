import React from "react";

interface ErrorStateProps {
  error?: string;
  onRetry: () => void;
}

export function ErrorState({ error, onRetry }: ErrorStateProps) {
  const fallbackMessage = "An unknown error occurred during code evaluation. Please retry.";

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center min-h-[380px]">
      {/* Error Icon Box */}
      <div className="w-16 h-16 rounded-2xl border-3 border-[#D9503F] bg-[#FFDAD4] shadow-[4px_4px_0px_#141414] flex items-center justify-center mb-4">
        <span className="font-mono text-2xl font-black text-[#D9503F]">!</span>
      </div>

      <h3 className="font-mono text-sm font-black uppercase tracking-wider text-[#D9503F] mb-2">
        ROAST // INTERRUPTED
      </h3>

      <p className="text-xs text-[#504535] max-w-sm mb-6 leading-relaxed">
        {error || fallbackMessage}
      </p>

      <button
        type="button"
        onClick={onRetry}
        className="px-5 py-2.5 rounded-full border-2 border-[#141414] bg-[#EDB13E] text-xs font-mono font-bold text-[#141414] shadow-[3px_3px_0px_#141414] hover:shadow-[4px_4px_0px_#141414] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer flex items-center gap-1.5"
      >
        <span>RETRY ANALYSIS</span>
        <span>↵</span>
      </button>
    </div>
  );
}
