"use client";

import React, { useState, useEffect, useCallback } from "react";
import { DEFAULTS, SAMPLE } from "@/config/app.config";
import { RoastLevel, PersonaId, LanguageId, ReportState, RoastResult } from "@/types/roast";
import { requestRoast } from "@/lib/api";
import { RoastControls } from "./RoastControls";
import { ErrorMessageInput } from "./ErrorMessageInput";
import { CodeEditor } from "./CodeEditor";
import { RoastReport } from "./RoastReport";
import { StatusBar } from "./StatusBar";

export function Workspace() {
  const [roastLevel, setRoastLevel] = useState<RoastLevel>(DEFAULTS.roastLevel);
  const [persona, setPersona] = useState<PersonaId>(DEFAULTS.persona);
  const [language, setLanguage] = useState<LanguageId>(DEFAULTS.language);
  const [code, setCode] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [errorDrawerOpen, setErrorDrawerOpen] = useState<boolean>(false);

  const [reportState, setReportState] = useState<ReportState>("empty");
  const [roastResult, setRoastResult] = useState<RoastResult | null>(null);
  const [roastedCode, setRoastedCode] = useState<string>("");
  const [apiError, setApiError] = useState<string>("");

  const isRoasting = reportState === "loading";

  // ErrorLine is active only if the code in editor exactly matches the snapshot of roasted code
  const errorLine =
    reportState === "results" && code === roastedCode
      ? roastResult?.issues?.[0]?.line
      : undefined;

  const handleRoast = useCallback(async () => {
    if (isRoasting) return;

    if (!code.trim()) {
      setApiError("No code provided. I can't roast the void, bhau! Paste code or click 'SAMPLE BUG'.");
      setReportState("error");
      return;
    }

    setReportState("loading");
    setApiError("");

    try {
      const result = await requestRoast({
        code,
        language,
        roastLevel,
        persona,
        errorMessage: errorMessage.trim() || undefined,
      });

      setRoastResult(result);
      setRoastedCode(code);
      setReportState("results");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to generate roast critique.";
      setApiError(msg);
      setReportState("error");
    }
  }, [code, language, roastLevel, persona, errorMessage, isRoasting]);

  const handleLoadSample = useCallback(() => {
    setLanguage(SAMPLE.language as LanguageId);
    setCode(SAMPLE.code);
    setErrorMessage(SAMPLE.errorMessage);
    setErrorDrawerOpen(true);
  }, []);

  const handleApplyFix = useCallback((fixedCode: string) => {
    setCode(fixedCode);
  }, []);

  const handleNewCode = useCallback(() => {
    setCode("");
    setErrorMessage("");
    setReportState("empty");
    setRoastResult(null);
    setRoastedCode("");
  }, []);

  // Global Keyboard Shortcut: Ctrl+Enter or Cmd+Enter to roast
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        handleRoast();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleRoast]);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 pb-12 z-10">
      {/* Outer Bento Tool Card */}
      <section className="bg-[#FFFFFF] border-2 border-[#141414] rounded-[22px] shadow-[4px_4px_0px_#141414] overflow-hidden flex flex-col transition-all">
        {/* Control Bar Header */}
        <RoastControls
          roastLevel={roastLevel}
          onRoastLevelChange={setRoastLevel}
          persona={persona}
          onPersonaChange={setPersona}
          language={language}
          onLanguageChange={setLanguage}
          onRoast={handleRoast}
          isRoasting={isRoasting}
          errorDrawerOpen={errorDrawerOpen}
          onToggleErrorDrawer={() => setErrorDrawerOpen((prev) => !prev)}
        />

        {/* Collapsible Error Traceback Drawer */}
        {errorDrawerOpen && (
          <ErrorMessageInput
            value={errorMessage}
            onChange={setErrorMessage}
            onClose={() => setErrorDrawerOpen(false)}
          />
        )}

        {/* Split-Pane: Left Editor (52%) | Right Roast Report (48%) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[560px]">
          {/* Left Pane: Code Editor */}
          <div className="lg:col-span-6 border-b-2 lg:border-b-0 lg:border-r-2 border-[#141414]">
            <CodeEditor
              code={code}
              onChange={setCode}
              language={language}
              errorLine={errorLine}
              onLoadSample={handleLoadSample}
            />
          </div>

          {/* Right Pane: Roast Report */}
          <div className="lg:col-span-6 bg-[#FFFFFF]">
            <RoastReport
              state={reportState}
              roastLevel={roastLevel}
              language={language}
              result={roastResult}
              errorMsg={apiError}
              errorMessageProvided={errorMessage}
              onRetry={handleRoast}
              onApplyFix={handleApplyFix}
              onLoadSample={handleLoadSample}
              onNewCode={handleNewCode}
            />
          </div>
        </div>

        {/* Bottom Station Status Bar */}
        <StatusBar isRoasting={isRoasting} />
      </section>
    </div>
  );
}
