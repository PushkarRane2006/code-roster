import React from "react";
import { RoastIssue, Severity } from "@/types/roast";

interface IssueCardProps {
  index: number;
  issue: RoastIssue;
}

const severityConfig: Record<Severity, { bg: string; text: string; border: string }> = {
  "FATAL BUG": {
    bg: "bg-[#FFDAD4]",
    text: "text-[#93000a]",
    border: "border-[#D9503F]",
  },
  "CODE SMELL": {
    bg: "bg-[#F7E3A8]",
    text: "text-[#5f4100]",
    border: "border-[#EDB13E]",
  },
  OPTIMIZATION: {
    bg: "bg-[#EAF5EC]",
    text: "text-[#1b6b30]",
    border: "border-[#4FA35A]",
  },
};

export function IssueCard({ index, issue }: IssueCardProps) {
  const badge = severityConfig[issue.severity] || severityConfig["FATAL BUG"];
  const formattedIndex = String(index).padStart(2, "0");

  return (
    <div className="bg-[#FFFFFF] rounded-xl border-2 border-[#141414] shadow-[3px_3px_0px_#141414] p-4 mb-3 transition-all hover:shadow-[4px_4px_0px_#141414] hover:-translate-x-0.5 hover:-translate-y-0.5">
      {/* Top Header Row */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
        <div className="flex items-center gap-2">
          {/* Index Chip */}
          <span className="font-mono text-xs font-black px-1.5 py-0.5 rounded bg-[#141414] text-[#FFFFFF]">
            {formattedIndex}
          </span>

          {/* Line Pill */}
          <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-full border border-[#141414] bg-[#F6F3F2] text-[#141414]">
            LINE {issue.line}
          </span>

          {/* Severity Badge */}
          <span
            className={`font-mono text-[10px] font-black uppercase px-2 py-0.5 rounded-full border ${badge.border} ${badge.bg} ${badge.text}`}
          >
            {issue.severity}
          </span>
        </div>

        {/* Issue Title */}
        <span className="font-bold text-xs text-[#141414] text-right">
          {issue.title}
        </span>
      </div>

      {/* Code Snippet */}
      {issue.codeSnippet && (
        <div className="mb-3 bg-[#171717] rounded-lg p-2.5 border-l-4 border-l-[#D9503F] border border-[#333333] overflow-x-auto">
          <pre className="font-mono text-xs text-[#F7F3EA] leading-relaxed">
            <code>{issue.codeSnippet}</code>
          </pre>
        </div>
      )}

      {/* Diagnosis & Expected Fix */}
      <div className="space-y-1.5 text-xs">
        <div className="flex items-start gap-1.5 text-[#93000a]">
          <span className="font-bold shrink-0">✕ Diagnosis:</span>
          <span className="text-[#141414] leading-relaxed">{issue.diagnosis}</span>
        </div>

        <div className="flex items-start gap-1.5 text-[#1b6b30]">
          <span className="font-bold shrink-0">✓ Expected:</span>
          <span className="text-[#141414] leading-relaxed">{issue.expected}</span>
        </div>
      </div>
    </div>
  );
}
