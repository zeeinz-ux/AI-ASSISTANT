import axios from "axios";
import { config } from "../config/env";

const GROQ_MODEL = "llama-3.3-70b-versatile";
const CLOUD_TIMEOUT_MS = 15_000;

export async function callGroq(prompt: string): Promise<string> {
  if (!config.groq.apiKey) {
    throw new Error("[Groq] GROQ_API_KEY belum dikonfigurasi.");
  }

  const endpoint = "https://api.groq.com/openai/v1/chat/completions";

  try {
    const response = await axios.post(
      endpoint,
      {
        model: GROQ_MODEL,
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 4096,
        top_p: 0.95,
      },
      {
        headers: {
          Authorization: `Bearer ${config.groq.apiKey}`,
          "Content-Type": "application/json",
        },
        timeout: CLOUD_TIMEOUT_MS,
      },
    );

    const choices = response.data?.choices;

    if (!choices?.length) {
      throw new Error(
        `[Groq] Tidak ada response dari model. Response: ${JSON.stringify(response.data)}`,
      );
    }

    const content = choices[0]?.message?.content;

    if (!content || typeof content !== "string") {
      throw new Error(
        `[Groq] Format response tidak valid. Dapat: ${JSON.stringify(choices[0])}`,
      );
    }

    return content;
  } catch (error) {
    const err = error as Error & {
      response?: {
        status: number;
        data?: {
          error?: {
            message?: string;
            code?: string;
          };
        };
      };
    };

    const groqError = err.response?.data?.error;
    let detail = err.message;

    if (groqError?.code === "model_decommissioned") {
      detail = "[Groq] Model sudah dipensiunkan.";
    } else if (err.response?.status === 400) {
      detail = `[Groq] Request tidak valid. ${groqError?.message ?? ""}`;
    } else if (err.response?.status === 401) {
      detail = "[Groq] API key invalid atau expired.";
    } else if (err.response?.status === 429) {
      detail = "[Groq] Rate limit tercapai.";
    } else if (err.response?.status === 500) {
      detail = "[Groq] Server error.";
    } else if (err.message.includes("timeout")) {
      detail = "[Groq] Request timeout.";
    }

    throw new Error(`[Groq] ${detail}`);
  }
}
