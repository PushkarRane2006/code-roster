import { NextRequest, NextResponse } from "next/server";
import { LANGUAGES, ROAST_LEVELS, PERSONAS, DEFAULTS, LIMITS } from "@/config/app.config";
import { RoastRequest } from "@/types/roast";
import { analyzeCode } from "@/lib/gemini";

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON in request body." }, { status: 400 });
  }

  if (typeof body !== "object" || body === null) {
    return NextResponse.json({ error: "Request payload must be an object." }, { status: 400 });
  }

  const raw = body as Record<string, unknown>;
  const code = typeof raw.code === "string" ? raw.code : "";
  const errorMessage = typeof raw.errorMessage === "string" ? raw.errorMessage.trim() : "";

  // 1. Validate empty code
  if (!code.trim()) {
    return NextResponse.json(
      { error: "No code provided. I can't roast the void, bhau!" },
      { status: 400 }
    );
  }

  // 2. Validate code length
  if (code.length > LIMITS.maxCodeLength) {
    return NextResponse.json(
      {
        error: `Code is too long (${code.length.toLocaleString()} characters). Max allowed is ${LIMITS.maxCodeLength.toLocaleString()} characters.`,
      },
      { status: 400 }
    );
  }

  // 3. Validate error message length
  if (errorMessage.length > LIMITS.maxErrorMessageLength) {
    return NextResponse.json(
      {
        error: `Error message is too long (${errorMessage.length.toLocaleString()} characters). Max allowed is ${LIMITS.maxErrorMessageLength.toLocaleString()} characters.`,
      },
      { status: 400 }
    );
  }

  // 4. Validate or fallback language
  const knownLanguages = LANGUAGES.map((l) => l.id);
  const language = knownLanguages.includes(raw.language as (typeof knownLanguages)[number])
    ? (raw.language as RoastRequest["language"])
    : DEFAULTS.language;

  // 5. Validate or fallback roastLevel
  const knownLevels = ROAST_LEVELS.map((r) => r.id);
  const roastLevel = knownLevels.includes(raw.roastLevel as (typeof knownLevels)[number])
    ? (raw.roastLevel as RoastRequest["roastLevel"])
    : DEFAULTS.roastLevel;

  // 6. Validate or fallback persona
  const knownPersonas = PERSONAS.map((p) => p.id);
  const persona = knownPersonas.includes(raw.persona as (typeof knownPersonas)[number])
    ? (raw.persona as RoastRequest["persona"])
    : DEFAULTS.persona;

  const requestPayload: RoastRequest = {
    code,
    language,
    roastLevel,
    persona,
    errorMessage: errorMessage || undefined,
  };

  try {
    const result = await analyzeCode(requestPayload);
    return NextResponse.json(result, { status: 200 });
  } catch (err: unknown) {
    console.error("[Code Roaster API Error]:", err);
    const message = err instanceof Error ? err.message : "Internal Server Error occurred during roast.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
