import { Type, Schema } from "@google/genai";
import { SEVERITIES } from "@/config/app.config";

export const roastResponseSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    roast: {
      type: Type.STRING,
      description: "A savage, funny, and technically grounded Hinglish roast of the code.",
    },
    score: {
      type: Type.INTEGER,
      description: "Roast severity score from 0 to 100 (100 = catastrophic code, 10 = clean).",
    },
    scoreLabel: {
      type: Type.STRING,
      description: "Rubber stamp punchline in uppercase Hinglish, e.g. 'ATTENDANCE SHORT, CODE BHI SHORT'.",
    },
    issues: {
      type: Type.ARRAY,
      description: "Structured list of detected problems sorted by severity.",
      items: {
        type: Type.OBJECT,
        properties: {
          line: {
            type: Type.INTEGER,
            description: "1-based line number where the issue occurs.",
          },
          severity: {
            type: Type.STRING,
            enum: [...SEVERITIES],
            description: "Severity level: FATAL BUG, CODE SMELL, or OPTIMIZATION.",
          },
          title: {
            type: Type.STRING,
            description: "Short, snappy issue title in Hinglish.",
          },
          codeSnippet: {
            type: Type.STRING,
            description: "Exact problematic code snippet copied from submission.",
          },
          diagnosis: {
            type: Type.STRING,
            description: "Explanation of why this code fails or smells in Hinglish.",
          },
          expected: {
            type: Type.STRING,
            description: "Specific actionable fix in Hinglish.",
          },
        },
        required: ["line", "severity", "title", "codeSnippet", "diagnosis", "expected"],
      },
    },
    correctedCode: {
      type: Type.STRING,
      description: "Complete, production-ready, beautiful corrected code in the same language without markdown fences.",
    },
    takeaway: {
      type: Type.STRING,
      description: "Sincere, encouraging closing takeaway advice in Hinglish.",
    },
  },
  required: ["roast", "issues", "correctedCode", "takeaway"],
};
