import { Request, Response, Router } from "express";
import { decideRoute } from "../core/router";
import {
  executeWithFallback,
  ProviderFallbackError,
} from "../core/providerFallback";
import {
  ChatRequestBody,
  ChatResponseBody,
  ContinueChatRequest,
  ContinueChatResponse,
} from "../types";
import { buildContext } from "../core/contextBuilder";
import { logger } from "../utils/logger";
import { analyzeImports } from "../core/importGraph";
import { resolveRelatedFiles } from "../core/relatedFiles";
import { loadRelatedFiles } from "../core/fileReader";
import { rankImports } from "../core/relevance";
import { getProjectContext } from "../core/projectContext";
import { selectPromptMode } from "../core/promptSelector";
import { SYSTEM_PROMPTS } from "../core/systemPrompts";
import { classifyDebugError } from "../core/debugClassifier";
import { DEBUG_PROMPTS } from "../core/debugPrompts";
import { classifyRefactorRequest } from "../core/refactorClassifier";
import { REFACTOR_PROMPTS } from "../core/refactorPrompts";
import { getProjectSummary } from "../core/projectSummary";

export const chatRouter = Router();

function extractPrompt(
  body: ContinueChatRequest & Partial<ChatRequestBody>,
): { userPrompt: string; isContinueRequest: boolean } | null {
  if (
    body?.messages &&
    Array.isArray(body.messages) &&
    body.messages.length > 0
  ) {
    const reversedMessages = [...body.messages].reverse();

    const latestUserMessage = reversedMessages.find((message: any) => {
      return (
        message?.role === "user" &&
        typeof message?.content === "string" &&
        message.content.trim() !== ""
      );
    });

    if (latestUserMessage) {
      return {
        userPrompt: latestUserMessage.content,
        isContinueRequest: true,
      };
    }

    const latestTextMessage = reversedMessages.find((message: any) => {
      return (
        typeof message?.content === "string" && message.content.trim() !== ""
      );
    });

    if (latestTextMessage) {
      return {
        userPrompt: latestTextMessage.content,
        isContinueRequest: true,
      };
    }
  }

  if (typeof body?.prompt === "string" && body.prompt.trim() !== "") {
    return {
      userPrompt: body.prompt,
      isContinueRequest: false,
    };
  }

  return null;
}

chatRouter.post(
  "/chat",
  async (req: Request<{}, {}, ContinueChatRequest>, res: Response) => {
    const start = Date.now();
    const body = req.body as ContinueChatRequest & Partial<ChatRequestBody>;
    console.log("FILE PATH:", body.filePath);
    console.log("WORKSPACE:", body.workspace);
    console.log("LANGUAGE:", body.language);
    console.log("SELECTED CODE:", body.selectedCode);
    console.log("MESSAGES:", body.messages?.length);

    console.log("\n===== REQUEST BODY =====");
    console.log(JSON.stringify(body, null, 2));
    console.log("========================\n");

    const extracted = extractPrompt(body);
    if (!extracted) {
      res.status(400).json({
        error:
          'Format request tidak valid. Harus menyediakan array "messages" atau string "prompt".',
      });
      return;
    }

    const { userPrompt, isContinueRequest } = extracted;

    const { projectInfo, projectStructure, keyFiles } = getProjectContext(
      process.cwd(),
    );
    const summary = getProjectSummary(process.cwd());
    const projectSummaryText = `
Routes:
${summary.routes.join("\n")}

Core:
${summary.core.join("\n")}

Services:
${summary.services.join("\n")}
`;
    const importGraph = body.selectedCode
      ? analyzeImports(body.selectedCode)
      : { imports: [] };

    console.log("CWD:", process.cwd());
    console.log("PROJECT INFO:", projectInfo);

    const rankedImports = rankImports(importGraph.imports, userPrompt);

    console.log("RANKED IMPORTS:");
    console.log(rankedImports);

    const relatedPaths = resolveRelatedFiles(rankedImports);

    const relatedFiles = loadRelatedFiles(relatedPaths);

    console.log("RELATED FILES:");
    console.log(relatedFiles.map((file) => file.path));

    const mode = selectPromptMode(userPrompt);

    console.log("PROMPT MODE:", mode);

    let systemPrompt = SYSTEM_PROMPTS[mode];

    if (mode === "debug") {
      const category = classifyDebugError(userPrompt);

      console.log("DEBUG CATEGORY:", category);

      systemPrompt += "\n\n" + DEBUG_PROMPTS[category];
    }

    if (mode === "refactor") {
      const category = classifyRefactorRequest(userPrompt);

      console.log("REFACTOR CATEGORY:", category);

      systemPrompt += "\n\n" + REFACTOR_PROMPTS[category];
    }

    const contextPrompt = buildContext(userPrompt, {
      workspace: body.workspace,
      filePath: body.filePath,
      language: body.language,
      selectedCode: body.selectedCode,

      projectName: projectInfo.projectName,
      framework: projectInfo.framework,
      packageManager: projectInfo.packageManager,

      projectStructure,
      keyFiles,

      projectSummary: projectSummaryText,

      importGraph: importGraph.imports,
      relatedFiles,
    });

    const enrichedPrompt = `${systemPrompt.trim()}\n\n${contextPrompt}`;

    if (process.env.NODE_ENV !== "production") {
      console.log("\n===== ENRICHED PROMPT =====");
      console.log(enrichedPrompt);
      console.log("===========================\n");
    }

    const internalRouterInput: ChatRequestBody = {
      prompt: enrichedPrompt,
      context: body.context,
      filePath: body.filePath,
    };

    const decision = decideRoute(internalRouterInput);
    logger.request({
      prompt: enrichedPrompt,
      decision,
      isContinueRequest,
    });

    try {
      const execution = await executeWithFallback(
        decision.provider,
        enrichedPrompt,
      );
      const latencyMs = Date.now() - start;

      if (isContinueRequest) {
        const result: ContinueChatResponse = {
          id: `chatcmpl-${Date.now()}`,
          object: "chat.completion",
          created: Math.floor(Date.now() / 1000),
          model: body.model || "synapse-ai",
          choices: [
            {
              index: 0,
              message: {
                role: "assistant",
                content: execution.response,
              },
              finish_reason: "stop",
            },
          ],
        };

        logger.response({
          decision,
          actualProvider: execution.provider,
          attempts: execution.attempts,
          response: execution.response,
          latencyMs,
        });

        res.json(result);
        return;
      }

      const result: ChatResponseBody = {
        decision,
        response: execution.response,
        latencyMs,
      };

      logger.response({
        ...result,
        actualProvider: execution.provider,
        attempts: execution.attempts,
      });

      res.json(result);
    } catch (error) {
      const fallbackError = error as Error & {
        attempts?: unknown;
      };

      logger.error({
        message: fallbackError.message,
        decision,
        attempts:
          fallbackError instanceof ProviderFallbackError
            ? fallbackError.attempts
            : undefined,
      });

      res.status(502).json({
        error: "Semua AI provider sedang tidak tersedia.",
        detail: fallbackError.message,
        decision,
      });
    }
  },
);
