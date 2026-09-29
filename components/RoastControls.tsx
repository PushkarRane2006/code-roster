"use client";

import React from "react";
import { ROAST_LEVELS, PERSONAS, LANGUAGES } from "@/config/app.config";
import { RoastLevel, PersonaId, LanguageId } from "@/types/roast";

interface RoastControlsProps {
  roastLevel: RoastLevel;
  onRoastLevelChange: (level: RoastLevel) => void;
  persona: PersonaId;
  onPersonaChange: (persona: PersonaId) => void;
  language: LanguageId;
  onLanguageChange: (language: LanguageId) => void;
  onRoast: () => void;
  isRoasting: boolean;
  errorDrawerOpen: boolean;
  onToggleErrorDrawer: () => void;
}

export function RoastControls({
  roastLevel,
  onRoastLevelChange,
  persona,
  onPersonaChange,
  language,
  onLanguageChange,
  onRoast,
  isRoasting,
  errorDrawerOpen,
  onToggleErrorDrawer,
}: RoastControlsProps) {
  return (
    <div className="p-4 sm:p-5 border-b-2 border-[#141414] bg-[#F6F3F2] flex flex-wrap items-center justify-between gap-4">
      {/* Left Cluster: Spice Segmented Control + Persona + Language */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Roast Level Segmented Control */}
        <div className="flex items-center bg-[#FFFFFF] p-1 rounded-full border border-[#141414] shadow-[2px_2px_0px_#141414]">
          <span className="font-mono text-[10px] text-[#66625B] px-2 font-bold tracking-wider">
            SPICE:
          </span>
          {ROAST_LEVELS.map((level) => {
            const isSelected = roastLevel === level.id;
            return (
              <button
                key={level.id}
                type="button"
                onClick={() => onRoastLevelChange(level.id)}
                title={level.description}
                className={`px-3 py-1 text-xs font-bold rounded-full transition-all cursor-pointer ${
                  isSelected
                    ? "bg-[#EDB13E] text-[#141414] border border-[#141414] shadow-[2px_2px_0px_#141414] -translate-y-0.5"
                    : "text-[#66625B] hover:text-[#141414]"
                }`}
              >
                {level.shortLabel} {level.emoji}
              </button>
            );
          })}
        </div>

        {/* Persona Select */}
        <div className="relative">
          <select
            value={persona}
            onChange={(e) => onPersonaChange(e.target.value as PersonaId)}
            className="appearance-none flex items-center gap-2 pl-3.5 pr-8 py-1.5 rounded-full bg-[#FFFFFF] border border-[#141414] shadow-[2px_2px_0px_#141414] text-xs font-bold text-[#141414] hover:bg-[#F0EDEC] transition-all cursor-pointer focus:outline-none"
          >
            {PERSONAS.map((p) => (
              <option key={p.id} value={p.id}>
                {p.emoji} {p.label}
              </option>
            ))}
          </select>
          <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs pointer-events-none text-[#66625B]">
            ▼
          </span>
        </div>

        {/* Language Select */}
        <div className="relative">
          <select
            value={language}
            onChange={(e) => onLanguageChange(e.target.value as LanguageId)}
            className="appearance-none flex items-center gap-2 pl-3.5 pr-8 py-1.5 rounded-full bg-[#FFFFFF] border border-[#141414] shadow-[2px_2px_0px_#141414] text-xs font-bold text-[#141414] hover:bg-[#F0EDEC] transition-all cursor-pointer focus:outline-none"
          >
            {LANGUAGES.map((l) => (
              <option key={l.id} value={l.id}>
                {l.label} (.{l.extension})
              </option>
            ))}
          </select>
          <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs pointer-events-none text-[#66625B]">
            ▼
          </span>
        </div>

        {/* Error Message Toggle */}
        <button
          type="button"
          onClick={onToggleErrorDrawer}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
            errorDrawerOpen
              ? "bg-[#141414] text-[#FFFFFF] border-2 border-[#141414]"
              : "border-2 border-dashed border-[#141414] bg-[#FFFFFF] text-[#66625B] hover:text-[#141414] hover:border-solid"
          }`}
        >
          <span>{errorDrawerOpen ? "−" : "+"}</span>
          <span>ERROR MESSAGE</span>
        </button>
      </div>

      {/* Right Primary Action CTA */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onRoast}
          disabled={isRoasting}
          className={`font-black text-sm px-6 py-2.5 rounded-full border-2 border-[#141414] transition-all flex items-center gap-2 cursor-pointer ${
            isRoasting
              ? "bg-[#F7E3A8] text-[#141414] cursor-not-allowed opacity-80 animate-pulse shadow-[2px_2px_0px_#141414]"
              : "bg-[#EDB13E] text-[#141414] shadow-[4px_4px_0px_#141414] hover:shadow-[5px_5px_0px_#141414] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_#141414]"
          }`}
        >
          {isRoasting ? (
            <>
              <span className="inline-block animate-spin">☕</span>
              <span>ANALYZING CODE...</span>
            </>
          ) : (
            <>
              <span>Roast Me / भाजून काढ</span>
              <span className="text-base">🔥</span>
              <span className="text-xs bg-[#141414] text-[#FFFFFF] px-1.5 py-0.5 rounded font-mono hidden md:inline-block">
                Ctrl ⏎
              </span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
