"use client";

import React, { useState } from "react";
import { ReportState, RoastLevel, LanguageId, RoastResult } from "@/types/roast";
import { ROAST_LEVELS } from "@/config/app.config";
import { EmptyState } from "./EmptyState";
import { LoadingState } from "./LoadingState";
import { ErrorState } from "./ErrorState";
import { ScoreStamp } from "./ScoreStamp";
import { SectionHeader } from "./SectionHeader";
import { IssueCard } from "./IssueCard";
import { ErrorExplainer } from "./ErrorExplainer";
import { FixedCode } from "./FixedCode";

interface RoastReportProps {
  state: ReportState;
  roastLevel: RoastLevel;
  language: LanguageId;
  result: RoastResult | null;
  errorMsg?: string;
  errorMessageProvided?: string;
  onRetry: () => void;
  onApplyFix: (code: string) => void;
  onLoadSample?: () => void;
  onNewCode?: () => void;
}

export function RoastReport({
  state,
  roastLevel,
  language,
  result,
  errorMsg,
  errorMessageProvided,
  onRetry,
  onApplyFix,
  onLoadSample,
  onNewCode,
}: RoastReportProps) {
  const [copiedShare, setCopiedShare] = useState(false);

  const levelInfo = ROAST_LEVELS.find((l) => l.id === roastLevel);

  const handleShare = async () => {
    if (!result) return;
    const shareText = `🔥 My code just got roasted at Code Roaster (DevFest Nashik 2026)!\n\nScore: ${result.score ?? 72}/100 [${result.scoreLabel ?? "ROASTED"}]\n"${result.roast}"\n\nTry it yourself: https://devfest26.gdgnashik.com`;
    try {
      if (navigator.share) {
        await navigator.share({
          title: "Code Roaster Critique",
          text: shareText,
        });
      } else {
        await navigator.clipboard.writeText(shareText);
        setCopiedShare(true);
        setTimeout(() => setCopiedShare(false), 2000);
      }
    } catch {
      // User cancelled share
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#FFFFFF]">
      {/* 40px Header Strip */}
      <div className="h-10 px-4 border-b-2 border-[#141414] bg-[#F6F3F2] flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#D9503F] animate-pulse"></span>
          <span className="font-mono text-[10px] text-[#66625B] font-bold tracking-wider">
            AUDIT // REPORT
          </span>
        </div>

        <div className="font-bold text-[#141414]">Roast Report</div>

        <div>
          {state === "results" && result && (
            <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded-full border border-[#D9503F] bg-[#FFDAD4] text-[#93000a]">
              {result.issues.length} {result.issues.length === 1 ? "ISSUE" : "ISSUES"} FOUND
            </span>
          )}
        </div>
      </div>

      {/* Main Body */}
      <div className="flex-grow p-4 sm:p-6 overflow-y-auto max-h-[680px]">
        {state === "empty" && <EmptyState onLoadSample={onLoadSample} />}

        {state === "loading" && <LoadingState />}

        {state === "error" && <ErrorState error={errorMsg} onRetry={onRetry} />}

        {state === "results" && result && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Top Score Badge & Savage Headline Row */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-4 rounded-2xl border-2 border-[#141414] bg-[#F8F4EC] shadow-[3px_3px_0px_#141414]">
              {/* Savage Quote Headline */}
              <div className="flex-1">
                <span className="font-mono text-[9px] font-black tracking-widest text-[#827563] uppercase block mb-1">
                  CRITIQUE // VERDICT
                </span>
                <p className="text-sm sm:text-base font-black italic text-[#141414] leading-snug">
                  &ldquo;{result.roast}&rdquo;
                </p>
              </div>

              {/* Rubber Stamp Score */}
              <div className="shrink-0 self-center md:self-auto">
                <ScoreStamp
                  score={result.score ?? 72}
                  label={result.scoreLabel || "ATTENDANCE SHORT, CODE BHI SHORT"}
                />
              </div>
            </div>

            {/* Optional Error Explainer */}
            {errorMessageProvided && (
              <ErrorExplainer errorText={errorMessageProvided} />
            )}

            {/* Section: Issues Breakdown */}
            <div>
              <SectionHeader
                number={1}
                title="What's Wrong"
                meta={`${result.issues.length} ${
                  result.issues.length === 1 ? "ISSUE" : "ISSUES"
                }`}
              />

              {result.issues.length === 0 ? (
                <div className="p-4 rounded-xl border-2 border-[#4FA35A] bg-[#EAF5EC] text-xs font-bold text-[#1b6b30] flex items-center gap-2">
                  <span>✓</span>
                  <span>No critical issues found. Suspiciously clean code, bhau!</span>
                </div>
              ) : (
                <div className="space-y-3">
                  {result.issues.map((issue, idx) => (
                    <IssueCard key={idx} index={idx + 1} issue={issue} />
                  ))}
                </div>
              )}
            </div>

            {/* Section: Redemption Arc (Corrected Code) */}
            {result.correctedCode && (
              <FixedCode
                sectionNumber={2}
                language={language}
                code={result.correctedCode}
                onApply={onApplyFix}
              />
            )}

            {/* Section: Takeaway */}
            {result.takeaway && (
              <div className="p-4 rounded-xl border-2 border-[#141414] bg-[#FEF7E6] shadow-[2px_2px_0px_#141414]">
                <div className="flex items-center gap-1.5 mb-1.5">
                  <span className="text-sm">💡</span>
                  <span className="font-mono text-xs font-black uppercase tracking-wider text-[#141414]">
                    TAKEAWAY // SIKH
                  </span>
                </div>
                <p className="text-xs text-[#141414] leading-relaxed font-medium">
                  {result.takeaway}
                </p>
              </div>
            )}

            {/* Action Bar */}
            <div className="pt-2 border-t-2 border-[#141414] flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={handleShare}
                  className="px-4 py-2 rounded-full border-2 border-[#141414] bg-[#EDB13E] text-xs font-bold text-[#141414] shadow-[2px_2px_0px_#141414] hover:shadow-[3px_3px_0px_#141414] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <span>{copiedShare ? "✓ COPIED LINK" : "SHARE ROAST"}</span>
                  <span>→</span>
                </button>

                <button
                  type="button"
                  onClick={onRetry}
                  className="px-4 py-2 rounded-full border-2 border-[#141414] bg-[#FFFFFF] hover:bg-[#F6F3F2] text-xs font-bold text-[#141414] shadow-[2px_2px_0px_#141414] transition-all cursor-pointer"
                >
                  ROAST AGAIN, SPICIER →
                </button>
              </div>

              {onNewCode && (
                <button
                  type="button"
                  onClick={onNewCode}
                  className="px-3 py-2 rounded-full border border-[#141414] bg-[#F6F3F2] hover:bg-[#FFFFFF] text-xs font-bold text-[#66625B] hover:text-[#141414] transition-all cursor-pointer"
                >
                  [ NEW CODE ]
                </button>
              )}
            </div>

            {/* Sincere Encouragement Note */}
            <p className="text-[11px] font-mono text-center text-[#66625B] pt-2">
              Chinta mat kar. Code bhi gym jaisa hai — repeat karoge toh better hoga 🚀
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
