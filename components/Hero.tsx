import React from "react";
import { APP, AI } from "@/config/app.config";

export function Hero() {
  return (
    <section className="text-center max-w-3xl mx-auto pt-24 pb-8 px-4">
      {/* Eyebrow Badge */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border-2 border-[#141414] bg-[#FFDAD4] text-[#410000] font-mono text-xs font-bold tracking-wider mb-4 shadow-[2px_2px_0px_#141414]">
        <span className="text-sm animate-pulse">🔥</span>
        <span>{APP.eyebrow}</span>
      </div>

      {/* Main Title */}
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#141414] tracking-tight mb-3">
        {APP.name}{" "}
        <span className="text-[#141414] px-3 py-1 bg-[#EDB13E] rounded-2xl border-2 border-[#141414] shadow-[4px_4px_0px_#141414] inline-block -rotate-2">
          {APP.edition}
        </span>
      </h1>

      {/* Subhead */}
      <p className="text-base sm:text-lg text-[#504535] font-medium mb-4 max-w-xl mx-auto">
        {APP.subTagline}
      </p>

      {/* Tagline Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFFFFF] border-2 border-[#141414] text-xs sm:text-sm font-semibold text-[#141414] shadow-[3px_3px_0px_#141414]">
        <span className="text-[#4C80F0] text-base">✦</span>
        <span>Desi debugging, powered by {AI.modelLabel}</span>
        <span className="bg-[#4FA35A]/20 text-[#1b6b30] text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full border border-[#4FA35A]/40">
          DevFest Nashik 2026
        </span>
      </div>
    </section>
  );
}
