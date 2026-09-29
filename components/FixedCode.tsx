"use client";

import React, { useState } from "react";
import { LANGUAGES } from "@/config/app.config";
import { LanguageId } from "@/types/roast";
import { SectionHeader } from "./SectionHeader";

interface FixedCodeProps {
  sectionNumber: number;
  language: LanguageId;
  code: string;
  onApply: (code: string) => void;
}

export function FixedCode({ sectionNumber, language, code, onApply }: FixedCodeProps) {
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "failed">("idle");

  const ext = LANGUAGES.find((l) => l.id === language)?.extension || "txt";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopyStatus("copied");
    } catch {
      setCopyStatus("failed");
    } finally {
      setTimeout(() => setCopyStatus("idle"), 2000);
    }
  };

  const copyLabel =
    copyStatus === "copied"
      ? "✓ COPIED TO CLIPBOARD"
      : copyStatus === "failed"
      ? "✕ COPY BLOCKED, SELECT MANUALLY"
      : "📋 COPY FIXED CODE";

  return (
    <div className="mb-6 animate-in fade-in duration-200">
      <SectionHeader
        number={sectionNumber}
        title="Redemption Arc"
        meta="Ab asli fix dekh, bhau"
      >
        <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#EAF5EC] border border-[#4FA35A] text-[#1b6b30]">
          CORRECTED CODE
        </span>
      </SectionHeader>

      <div className="rounded-xl border-2 border-[#141414] bg-[#171717] shadow-[3px_3px_0px_#141414] overflow-hidden">
        {/* Editor Strip Header */}
        <div className="h-8 px-3 border-b border-[#333333] bg-[#222222] flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#4FA35A]"></span>
            <span className="font-mono text-xs font-bold text-[#F7F3EA]">
              solution.{ext}
            </span>
          </div>

          <span className="font-mono text-[10px] font-bold text-[#4FA35A]">
            READY TO APPLY
          </span>
        </div>

        {/* Code Content */}
        <div className="p-3.5 overflow-x-auto max-h-[320px]">
          <pre className="font-mono text-xs text-[#F7F3EA] leading-relaxed">
            <code>{code}</code>
          </pre>
        </div>
      </div>

      {/* Action Buttons Below Code */}
      <div className="flex flex-wrap items-center gap-3 mt-3">
        <button
          type="button"
          onClick={handleCopy}
          className="px-4 py-2 rounded-full border-2 border-[#141414] bg-[#FFFFFF] hover:bg-[#141414] hover:text-[#FFFFFF] text-xs font-mono font-bold shadow-[2px_2px_0px_#141414] transition-all cursor-pointer"
        >
          {copyLabel}
        </button>

        <button
          type="button"
          onClick={() => onApply(code)}
          className="px-5 py-2 rounded-full border-2 border-[#141414] bg-[#4FA35A] hover:bg-[#3d8346] text-[#FFFFFF] text-xs font-mono font-bold shadow-[3px_3px_0px_#141414] hover:shadow-[4px_4px_0px_#141414] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer flex items-center gap-1.5"
        >
          <span>APPLY TO EDITOR</span>
          <span>↵</span>
        </button>
      </div>
    </div>
  );
}
