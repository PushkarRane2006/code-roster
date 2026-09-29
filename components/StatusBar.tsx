import React from "react";
import { APP, AI } from "@/config/app.config";

interface StatusBarProps {
  isRoasting: boolean;
}

export function StatusBar({ isRoasting }: StatusBarProps) {
  return (
    <footer className="w-full border-t-2 border-[#141414] bg-[#F6F3F2] py-2 px-4 select-none">
      {/* Main Status Row */}
      <div className="flex items-center justify-between font-mono text-[11px] text-[#66625B]">
        <div className="flex items-center gap-2">
          <span>STATUS:</span>
          {isRoasting ? (
            <span className="font-bold text-[#EDB13E] flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#EDB13E] animate-ping inline-block"></span>
              PROCESSING...
            </span>
          ) : (
            <span className="font-bold text-[#4FA35A] flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#4FA35A] inline-block"></span>
              ONLINE ({AI.modelLabel.toUpperCase()})
            </span>
          )}

          <span className="hidden sm:inline text-[#827563]">|</span>
          <span className="hidden sm:inline font-bold text-[#141414]">
            ENGINE: GOOGLE GEMINI
          </span>
        </div>

        <div className="font-mono text-[11px] font-bold tracking-widest text-[#141414]">
          {APP.name.toUpperCase()} {APP.version} // LIVE
        </div>
      </div>

      {/* Mandatory Workshop Tagline */}
      <div className="mt-1 text-center font-mono text-[10px] text-[#66625B] tracking-wider">
        Made at GDG Nashik Pre-DevFest Workshop
      </div>
    </footer>
  );
}
