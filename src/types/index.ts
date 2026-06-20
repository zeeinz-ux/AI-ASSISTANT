export type TaskComplexity = "simple" | "complex";

export type AIProvider = "ollama" | "gemini" | "groq";

// ============================================================================
// CORE REQUEST / RESPONSE
// ============================================================================

export interface ChatRequestBody {
  prompt: string;
  context?: string;
  filePath?: string;
}

export interface RouteDecision {
  provider: AIProvider;
  complexity: TaskComplexity;
  reason: string;
}

export interface ChatResponseBody {
  decision: RouteDecision;
  response: string;
  latencyMs: number;
}

// ============================================================================
// PHASE 3A - CONTEXT ENGINE
// ============================================================================

export interface ContextPayload {
  filePath?: string;
  language?: string;
  selectedCode?: string;
  workspace?: string;
}

// ============================================================================
// CONTINUE.DEV INTEGRATION
// ============================================================================

export interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface ContinueChatRequest {
  model?: string;
  messages?: ChatMessage[];

  // Backward compatibility
  prompt?: string;

  // Existing fields
  context?: string;
  filePath?: string;

  // Phase 3A Context Engine
  language?: string;
  selectedCode?: string;
  workspace?: string;
}

export interface ContinueChatResponse {
  id: string;
  object: "chat.completion";
  created: number;
  model: string;
  choices: [
    {
      index: number;
      message: {
        role: "assistant";
        content: string;
      };
      finish_reason: "stop";
    },
  ];
}
