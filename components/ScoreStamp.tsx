import React from "react";

interface ScoreStampProps {
  score: number;
  label?: string;
}

export function ScoreStamp({ score, label }: ScoreStampProps) {
  // Score interpretation: higher = more roasted/disastrous
  const getStampTheme = (val: number) => {
    if (val >= 70) {
      return {
        bg: "bg-[#EDB13E]",
        text: "text-[#141414]",
        border: "border-[#141414]",
        badge: "bg-[#D9503F] text-[#FFFFFF]",
      };
    }
    if (val >= 40) {
      return {
        bg: "bg-[#F7E3A8]",
        text: "text-[#141414]",
        border: "border-[#141414]",
        badge: "bg-[#EDB13E] text-[#141414]",
      };
    }
    return {
      bg: "bg-[#EFF2FB]",
      text: "text-[#141414]",
      border: "border-[#141414]",
      badge: "bg-[#4FA35A] text-[#FFFFFF]",
    };
  };

  const theme = getStampTheme(score);
  const displayLabel = label || "ATTENDANCE SHORT, CODE BHI SHORT";

  return (
    <div
      className={`inline-flex flex-col sm:flex-row items-center gap-3 p-3 sm:px-4 rounded-xl border-3 ${theme.border} ${theme.bg} shadow-[4px_4px_0px_#141414] -rotate-2 select-none`}
    >
      <div className="flex items-baseline gap-1">
        <span className="text-3xl font-black font-mono tracking-tight text-[#141414]">
          {score}
        </span>
        <span className="text-xs font-mono font-bold text-[#66625B]">/ 100</span>
      </div>

      <div className="h-6 w-[2px] bg-[#141414]/30 hidden sm:block"></div>

      <div className="flex flex-col text-center sm:text-left">
        <span className="font-mono text-[9px] font-black uppercase tracking-widest text-[#141414]/70">
          ROAST SCORE
        </span>
        <span className="font-mono text-xs font-extrabold uppercase tracking-tight text-[#141414]">
          {displayLabel}
        </span>
      </div>
    </div>
  );
}
