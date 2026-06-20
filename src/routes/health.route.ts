import { Request, Response, Router } from "express";
import { config } from "../config/env";
import { checkAllProviders } from "../core/providerHealth";

export const healthRouter = Router();

healthRouter.get("/health", async (_req: Request, res: Response) => {
  const providers = await checkAllProviders();

  res.json({
    status: "ok",
    service: "synapse-ai-router",
    nodeEnv: config.nodeEnv,
    ollamaHost: config.ollama.host,
    providers,
    cloudFallback: {
      gemini: Boolean(config.gemini.apiKey),
      groq: Boolean(config.groq.apiKey),
    },
  });
});
