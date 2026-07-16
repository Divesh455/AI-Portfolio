import { NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are an expert Prompt Engineer. Your task is to optimize basic user prompts into production-grade prompts using structured few-shot styling.

You MUST respond with a valid JSON object matching the following structure:
{
  "system": "Brief system role prompt definition specifying the AI persona and context.",
  "task": "Enriched task definition explaining what the AI must do.",
  "examples": "One or two short few-shot input/output formatting examples (use code comments or standard templates).",
  "constraints": "Bullet points listing strict formatting, safety, and execution constraints.",
  "metrics": {
    "clarity": 95, // Integer 80-100 representing prompt clarity.
    "accuracy": 92, // Integer 80-100 representing few-shot accuracy alignment.
    "safety": 98, // Integer 80-100 representing hallucination protection.
    "tokens": 90 // Integer 80-100 representing token efficiency.
  }
}

Do not include any markdown fences (like \`\`\`json) or extra text. Return ONLY the raw JSON string.`;

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();
    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json({ error: "Invalid prompt input" }, { status: 400 });
    }

    // Retrieve and sanitize the API key to strip quotes and spaces
    const rawApiKey = process.env.GEMINI_API_KEY;
    const apiKey = rawApiKey ? rawApiKey.replace(/['" ]/g, "") : undefined;

    if (!apiKey) {
      return NextResponse.json({ error: "Gemini API key is not configured" }, { status: 400 });
    }

    // Call the Gemini API model (gemini-2.5-flash) with structured JSON generation settings
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [{ role: "user", parts: [{ text: `Optimize this prompt: "${prompt}"` }] }],
          systemInstruction: {
            parts: [{ text: SYSTEM_PROMPT }]
          },
          generationConfig: {
            responseMimeType: "application/json",
            temperature: 0.1,
            maxOutputTokens: 800,
          }
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Optimize API request failed:", errorText);
      return NextResponse.json({ error: "Gemini API failed to process prompt optimization" }, { status: 502 });
    }

    const data = await response.json();
    const replyText = data.candidates?.[0]?.content?.parts?.[0]?.text || "";

    if (!replyText) {
      return NextResponse.json({ error: "Empty response received from AI model" }, { status: 502 });
    }

    // Attempt to parse structured JSON from the model response
    const parsedData = JSON.parse(replyText.trim());
    return NextResponse.json(parsedData);
  } catch (error) {
    console.error("Optimize API Handler error:", error);
    return NextResponse.json({ error: "Failed to process prompt optimization" }, { status: 500 });
  }
}
