import fs from "fs";
import { analyzeCode } from "../lib/gemini";
import { AI, SAMPLE } from "../config/app.config";

if (fs.existsSync(".env.local")) {
  process.loadEnvFile?.(".env.local");
}

async function main() {
  console.log("=========================================");
  console.log(`Checking Code Roaster API (${AI.model})...`);
  console.log("=========================================\n");

  try {
    const result = await analyzeCode({
      language: SAMPLE.language,
      code: SAMPLE.code,
      roastLevel: "sharp",
      persona: "standup",
      errorMessage: SAMPLE.errorMessage,
    });

    console.log("✅ API Check Succeeded!\n");
    console.log(`Roast Score: ${result.score ?? "N/A"}/100 [${result.scoreLabel ?? "ROASTED"}]`);
    console.log(`Roast: "${result.roast}"\n`);
    console.log(`Issues Found: ${result.issues.length}`);
    result.issues.forEach((issue, idx) => {
      console.log(`  ${idx + 1}. [${issue.severity}] Line ${issue.line}: ${issue.title}`);
    });
    console.log(`\nTakeaway: ${result.takeaway}\n`);
    console.log("=========================================");
  } catch (error: unknown) {
    console.error("❌ API Check Failed:");
    console.error(error instanceof Error ? error.message : error);
    process.exit(1);
  }
}

main();
