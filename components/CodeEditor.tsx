"use client";

import React, { useRef, useState } from "react";
import { LANGUAGES, LIMITS } from "@/config/app.config";
import { LanguageId } from "@/types/roast";

interface CodeEditorProps {
  code: string;
  onChange: (code: string) => void;
  language: LanguageId;
  errorLine?: number;
  onLoadSample: () => void;
}

export function CodeEditor({
  code,
  onChange,
  language,
  errorLine,
  onLoadSample,
}: CodeEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const gutterRef = useRef<HTMLDivElement>(null);
  const [cursorPos, setCursorPos] = useState({ line: 1, col: 1 });

  const lines = code.split("\n");
  const lineCount = Math.max(lines.length, 12);
  const lineNumbers = Array.from({ length: lineCount }, (_, i) => i + 1);

  const languageLabel = LANGUAGES.find((l) => l.id === language)?.label || language;

  const handleScroll = () => {
    if (textareaRef.current && gutterRef.current) {
      gutterRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  };

  const updateCursorPosition = () => {
    if (!textareaRef.current) return;
    const pos = textareaRef.current.selectionStart;
    const textBefore = code.slice(0, pos);
    const line = textBefore.split("\n").length;
    const col = pos - textBefore.lastIndexOf("\n");
    setCursorPos({ line, col });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab" && !e.shiftKey) {
      e.preventDefault();
      const textarea = textareaRef.current;
      if (!textarea) return;

      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const spaces = "    "; // 4 spaces

      const newCode = code.substring(0, start) + spaces + code.substring(end);
      onChange(newCode);

      // Restore cursor position
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 4;
        updateCursorPosition();
      }, 0);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#FFFFFF]">
      {/* 40px Header Strip */}
      <div className="h-10 px-4 border-b-2 border-[#141414] bg-[#F6F3F2] flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[10px] text-[#66625B] font-bold tracking-wider">
            INPUT // SRC
          </span>
          <span className="font-bold text-[#141414]">YOUR CODE</span>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onLoadSample}
            className="font-mono text-xs font-bold text-[#141414] hover:text-[#4C80F0] underline underline-offset-2 transition-colors cursor-pointer"
          >
            SAMPLE BUG
          </button>
          <span className="text-[#827563]">|</span>
          <button
            type="button"
            onClick={() => onChange("")}
            className="font-mono text-xs font-bold text-[#D9503F] hover:underline underline-offset-2 transition-colors cursor-pointer"
          >
            CLEAR
          </button>
        </div>
      </div>

      {/* Editor Body: Gutter + Textarea */}
      <div className="relative flex-grow flex min-h-[380px] bg-[#171717] overflow-hidden">
        {/* macOS Window Chrome Pills in Top Right of Editor */}
        <div className="absolute top-2.5 right-3 z-10 flex items-center space-x-1.5 opacity-60">
          <span className="w-2.5 h-2.5 rounded-full bg-[#D9503F]"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-[#EDB13E]"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-[#4FA35A]"></span>
        </div>

        {/* Line Numbers Gutter */}
        <div
          ref={gutterRef}
          aria-hidden="true"
          className="w-12 py-3 bg-[#111111] select-none text-right font-mono text-xs text-[#66625B] overflow-hidden border-r border-[#333333]"
        >
          {lineNumbers.map((num) => {
            const isError = errorLine === num;
            return (
              <div
                key={num}
                className={`px-2 leading-6 transition-colors ${
                  isError
                    ? "bg-[#D9503F] text-[#FFFFFF] font-bold"
                    : "hover:text-[#F7F3EA]"
                }`}
              >
                {String(num).padStart(2, "0")}
              </div>
            );
          })}
        </div>

        {/* Code Textarea */}
        <textarea
          ref={textareaRef}
          value={code}
          onChange={(e) => onChange(e.target.value)}
          onScroll={handleScroll}
          onSelect={updateCursorPosition}
          onClick={updateCursorPosition}
          onKeyUp={updateCursorPosition}
          onKeyDown={handleKeyDown}
          maxLength={LIMITS.maxCodeLength}
          placeholder="// Paste your code here, or click 'SAMPLE BUG' above..."
          spellCheck={false}
          autoCapitalize="off"
          autoComplete="off"
          className="flex-grow p-3 font-mono text-xs text-[#F7F3EA] bg-transparent leading-6 resize-none focus:outline-none whitespace-pre overflow-auto z-0"
        />
      </div>

      {/* Footer Status Bar Overlay */}
      <div className="h-8 px-4 border-t-2 border-[#141414] bg-[#F6F3F2] flex items-center justify-between font-mono text-[11px] text-[#66625B]">
        <div className="flex items-center gap-2">
          <span>{languageLabel} · Auto-detected</span>
          <span className="hidden sm:inline">|</span>
          <span className="hidden sm:inline">
            Ln {cursorPos.line}, Col {cursorPos.col}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden md:inline">UTF-8 · Tab Size: 4</span>
          <span>
            {code.length.toLocaleString()} / {LIMITS.maxCodeLength.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
}
