import React from "react";

export function RangoliStrip() {
  return (
    <div className="w-full my-8 overflow-hidden select-none">
      <div className="flex items-center justify-center gap-4 py-3 border-y-2 border-[#141414] bg-[#F6F3F2]">
        {/* Pattern Cluster Left */}
        <div className="flex items-center space-x-2 text-[#141414] font-black opacity-80 text-sm">
          <span>▲▼▲▼</span>
          <span className="w-2 h-2 rounded-full bg-[#EA4335]"></span>
          <span>◆◇◆</span>
          <span className="w-2 h-2 rounded-full bg-[#4285FA]"></span>
          <span>▲▼▲▼</span>
          <span className="w-2 h-2 rounded-full bg-[#F9AB00]"></span>
          <span>●○●</span>
          <span className="w-2 h-2 rounded-full bg-[#34A853]"></span>
        </div>

        {/* Warli Heritage Text Badge */}
        <span className="font-mono text-[11px] tracking-widest uppercase font-extrabold px-3 py-1 bg-[#FFFFFF] border-2 border-[#141414] rounded-full shadow-[2px_2px_0px_#141414] text-[#141414]">
          नाशिक टेक संस्कृती · WARLI CODING HERITAGE
        </span>

        {/* Pattern Cluster Right */}
        <div className="flex items-center space-x-2 text-[#141414] font-black opacity-80 text-sm hidden sm:flex">
          <span className="w-2 h-2 rounded-full bg-[#EA4335]"></span>
          <span>▲▼▲▼</span>
          <span className="w-2 h-2 rounded-full bg-[#4285FA]"></span>
          <span>◆◇◆</span>
          <span className="w-2 h-2 rounded-full bg-[#F9AB00]"></span>
          <span>▲▼▲▼</span>
          <span className="w-2 h-2 rounded-full bg-[#34A853]"></span>
          <span>●○●</span>
        </div>
      </div>
    </div>
  );
}
