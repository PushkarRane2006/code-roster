import { GoogleGenAI } from "@google/genai";
import { AI, SAMPLE } from "@/config/app.config";
import { RoastRequest, RoastResult } from "@/types/roast";
import { ROAST_SYSTEM_INSTRUCTION, buildUserPrompt } from "@/lib/prompt";
import { roastResponseSchema } from "@/lib/schema";

function friendlyErrorMessage(status: number | undefined, errorMsg: string): string {
  if (status === 400) {
    return "Invalid request to Gemini. Check your input formatting or model settings in config/app.config.ts.";
  }
  if (status === 401 || status === 403) {
    return "Invalid or unauthorized Gemini API Key. Verify GEMINI_API_KEY in your .env.local file.";
  }
  if (status === 404) {
    return `Gemini model '${AI.model}' was not found. Please verify available models in your region.`;
  }
  if (status === 429) {
    return "Gemini API rate limit exceeded! Bhai, thoda ruk, roast ko bhi marinate hone do 🌶️. Try again in 30 seconds.";
  }
  if (status === 503 || status === 500) {
    return "Bhau, Gemini ne chai break le li ☕ (Server overloaded). Please retry in a moment.";
  }
  return errorMsg || "Something went wrong while generating the roast. Please try again.";
}

export async function analyzeCode(request: RoastRequest): Promise<RoastResult> {
  const apiKey = process.env.GEMINI_API_KEY?.trim();

  if (!apiKey) {
    // If running with offline sample or API key missing during workshop demo
    if (request.code === SAMPLE.code) {
      return getOfflineSampleRoast();
    }
    throw new Error(
      "GEMINI_API_KEY is missing. Copy .env.example to .env.local, add your key from https://aistudio.google.com/apikey, and restart the server."
    );
  }

  const ai = new GoogleGenAI({ apiKey });
  const contents = buildUserPrompt(request);

  let lastError: unknown = null;
  const modelsToTry = [AI.model, AI.fallbackModel];

  for (const model of modelsToTry) {
    for (let attempt = 1; attempt <= AI.maxAttempts; attempt++) {
      try {
        const response = await ai.models.generateContent({
          model,
          contents,
          config: {
            systemInstruction: ROAST_SYSTEM_INSTRUCTION,
            responseMimeType: "application/json",
            responseSchema: roastResponseSchema,
            temperature: 0.8,
          },
        });

        const rawText = response.text;
        if (!rawText) {
          throw new Error("Received empty response from Gemini API.");
        }

        const parsed = JSON.parse(rawText) as Partial<RoastResult>;

        return {
          roast: parsed.roast?.trim() || "Yeh code dekh ke compiler bhi maun vrat le chuka hai 💀.",
          score: typeof parsed.score === "number" ? parsed.score : 72,
          scoreLabel: parsed.scoreLabel?.trim() || "ATTENDANCE SHORT, CODE BHI SHORT",
          issues: Array.isArray(parsed.issues) ? parsed.issues : [],
          correctedCode: parsed.correctedCode?.trim() || request.code,
          takeaway:
            parsed.takeaway?.trim() ||
            "Chinta mat kar bhau. Code bhi gym jaisa hai — practice karoge toh better hoga 🚀.",
        };
      } catch (err: unknown) {
        lastError = err;
        const errObj = err as { status?: number; statusCode?: number; message?: string };
        const status = errObj.status ?? errObj.statusCode;

        // If rate limited or server overloaded and attempts left, back off and retry
        if ((status === 503 || status === 429 || !status) && attempt < AI.maxAttempts) {
          await new Promise((res) => setTimeout(res, attempt * 1200));
          continue;
        }

        // If 404 on model, break attempt loop to try fallback model
        if (status === 404) {
          break;
        }

        throw new Error(friendlyErrorMessage(status, errObj.message || String(err)));
      }
    }
  }

  const errObj = lastError as { status?: number; statusCode?: number; message?: string };
  throw new Error(friendlyErrorMessage(errObj?.status ?? errObj?.statusCode, errObj?.message || String(lastError)));
}

function getOfflineSampleRoast(): RoastResult {
  return {
    roast: "Yeh code nahi, Panchavati Express ki general boghi hai bhau! Condition check karne ke bajaye assignment kar diya, aur float me string jod ke auto me rocket lagane nikal pade 🤦🔥.",
    score: 72,
    scoreLabel: "ATTENDANCE SHORT, CODE BHI SHORT",
    issues: [
      {
        line: 5,
        severity: "FATAL BUG",
        title: "Assignment inside condition",
        codeSnippet: `if passenger_type = "student":`,
        diagnosis: "Bhau, single '=' variable define karta hai, comparison nahi! SyntaxError aayega turant.",
        expected: "Use double equals '==' for equality comparison: `if passenger_type == \"student\":`",
      },
      {
        line: 12,
        severity: "FATAL BUG",
        title: "TypeError: Float + String",
        codeSnippet: `return total + " INR"`,
        diagnosis: "Python number aur string ko implicitly add nahi karta. Yeh JavaScript nahi hai bhau 😅.",
        expected: "Use f-string formatting: `return f\"{total:.2f} INR\"`",
      },
      {
        line: 1,
        severity: "CODE SMELL",
        title: "Missing Type Annotations",
        codeSnippet: `def calculate_fare(distance, passenger_type):`,
        diagnosis: "Function signature me types specify nahi kiye. Sharma ji ka beta hamesha typed Python likhta hai.",
        expected: "Add type hints: `def calculate_fare(distance: float, passenger_type: str) -> str:`",
      },
    ],
    correctedCode: `def calculate_fare(distance: float, passenger_type: str) -> str:
    """Calculates discounted fare for Panchavati Express passengers."""
    base_fare: float = 20.0
    
    # Corrected comparison check
    if passenger_type == "student":
        discount = 0.5
    else:
        discount = 0.0

    total: float = (base_fare + distance * 12.0) * (1.0 - discount)
    return f"{total:.2f} INR"
`,
    takeaway: "Chinta mat kar bhau. Code bhi gym jaisa hai — repeat karoge toh muscle memory banegi 🚀.",
  };
}
