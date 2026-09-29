"use client";

import React from "react";
import { LIMITS } from "@/config/app.config";

interface ErrorMessageInputProps {
  value: string;
  onChange: (value: string) => void;
  onClose: () => void;
}

export function ErrorMessageInput({ value, onChange, onClose }: ErrorMessageInputProps) {
  return (
    <div className="p-4 sm:p-5 bg-[#EFF2FB] border-b-2 border-[#141414] animate-in fade-in slide-in-from-top-2 duration-150">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-[#D9503F] text-sm">⚠️</span>
          <label className="font-mono text-xs font-bold uppercase tracking-wider text-[#141414]">
            Attach Terminal Traceback / Compiler Error (Optional)
          </label>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="text-xs font-bold px-2 py-0.5 rounded-full border border-[#141414] bg-[#FFFFFF] hover:bg-[#FFDAD4] text-[#141414] transition-colors cursor-pointer"
        >
          Dismiss ✕
        </button>
      </div>

      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        maxLength={LIMITS.maxErrorMessageLength}
        placeholder={`Traceback (most recent call last):\n  File "main.py", line 5, in calculate_fare\n    if passenger_type = "student":\n                      ^\nSyntaxError: invalid syntax`}
        rows={3}
        className="w-full font-mono text-xs p-3 rounded-xl border-2 border-[#141414] bg-[#FFFFFF] text-[#141414] placeholder:text-[#827563] shadow-[2px_2px_0px_#141414] focus:outline-none focus:ring-2 focus:ring-[#EDB13E] resize-none"
      />

      <div className="flex justify-end mt-1">
        <span className="font-mono text-[10px] text-[#66625B]">
          {value.length.toLocaleString()} / {LIMITS.maxErrorMessageLength.toLocaleString()} chars
        </span>
      </div>
    </div>
  );
}
