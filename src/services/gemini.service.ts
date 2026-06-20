import axios from "axios";
import { config } from "../config/env";

const GEMINI_MODEL = "gemini-3.5-flash";
const CLOUD_TIMEOUT_MS = 15_000;

export async function callGemini(prompt: string): Promise<string> {
  if (!config.gemini.apiKey) {
    throw new Error("[Gemini] GEMINI_API_KEY belum dikonfigurasi.");
  }

  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

  try {
    const response = await axios.post(
      endpoint,
      {
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 4096,
          topP: 0.95,
          topK: 40,
        },
      },
      {
        params: { key: config.gemini.apiKey },
        timeout: CLOUD_TIMEOUT_MS,
      },
    );

    const candidates = response.data?.candidates;
    if (!candidates || candidates.length === 0) {
      throw new Error(
        `[Gemini] Tidak ada response dari model. Response: ${JSON.stringify(response.data)}`,
      );
    }

    const content = candidates[0]?.content?.parts?.[0]?.text;
    if (!content || typeof content !== "string") {
      throw new Error(
        `[Gemini] Format response tidak valid. Dapat: ${JSON.stringify(candidates[0])}`,
      );
    }

    return content;
  } catch (error) {
    const err = error as Error & {
      response?: { status: number; data?: unknown };
    };

    let detail = err.message;

    if (err.response?.status === 400) {
      detail = "[Gemini] Request format tidak valid.";
    } else if (err.response?.status === 401) {
      detail = "[Gemini] API key invalid atau expired.";
    } else if (err.response?.status === 429) {
      detail = "[Gemini] Rate limit tercapai.";
    } else if (err.response?.status === 500) {
      detail = "[Gemini] Server error.";
    } else if (err.message.includes("timeout")) {
      detail = "[Gemini] Request timeout.";
    }

    throw new Error(`[Gemini] ${detail}`);
  }
}
