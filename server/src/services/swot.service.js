import { ApiError } from "../utils/ApiError.js";

export async function generateSwotFromAI(idea) {
  const provider = process.env.AI_PROVIDER || "openai";

  if (provider !== "openai") {
    throw new ApiError(500, "AI_PROVIDER not supported (use openai)");
  }

  if (!process.env.OPENAI_API_KEY) {
    throw new ApiError(500, "OPENAI_API_KEY missing in .env");
  }

  const prompt = `
Return STRICT JSON only (no markdown) with keys:
strengths, weaknesses, opportunities, threats.
Each should be an array of 5-8 short bullet strings.

Startup idea details:
Title: ${idea.title}
Summary: ${idea.summary || ""}
Problem: ${idea.problem || ""}
Solution: ${idea.solution || ""}
Target Customer: ${idea.targetCustomer || ""}
Location/Market: ${idea.location || ""}
Uniqueness: ${idea.uniqueness || ""}
Resources: ${idea.resources || ""}
Challenges/Risks: ${idea.challenges || ""}
Opportunities: ${idea.opportunities || ""}
Revenue Model: ${idea.revenueModel || ""}
Next 1 month goal: ${idea.nextMonthGoal || ""}
`;

  const resp = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL || "gpt-4.1-mini",
      input: prompt
    })
  });

  if (!resp.ok) {
    const text = await resp.text();
    throw new ApiError(502, `AI API failed: ${text}`);
  }

  const data = await resp.json();
  const outputText = data.output?.[0]?.content?.[0]?.text || "";

  let parsed;
  try {
    parsed = JSON.parse(outputText);
  } catch {
    throw new ApiError(502, "AI returned non-JSON output");
  }

  for (const k of ["strengths", "weaknesses", "opportunities", "threats"]) {
    if (!Array.isArray(parsed[k])) throw new ApiError(502, `AI JSON missing ${k}`);
  }

  return parsed;
}