# PRD — AI Coding Assistant (Hybrid Local + Cloud)

## 🧠 1. Product Vision

Membangun **AI Coding Assistant berbasis VS Code** yang dapat membantu developer dalam menulis, memahami, dan memperbaiki kode dengan pendekatan:

> ⚡ Local-first AI (gratis, offline) + Cloud AI fallback (free-tier/token-based)

Tujuannya adalah menciptakan alternatif GitHub Copilot yang:

- Gratis
- Bisa offline
- Bisa upgrade ke cloud AI jika dibutuhkan

---

## 🎯 2. Product Goals

### Primary Goals

- AI coding assistant gratis seperti Copilot
- Bisa berjalan offline (tanpa internet)
- Terintegrasi langsung di VS Code
- Membantu coding, debugging, refactoring

### Secondary Goals

- Support cloud AI fallback (Gemini / Groq)
- Smart routing AI (pilih model terbaik otomatis)
- Ringan di laptop mid-range (16GB RAM)

---

## 🚫 3. Non-Goals (MVP)

- Web dashboard / SaaS platform
- Multi-user system
- Training model AI sendiri
- Full database/memory system (phase 2)
- Cloud backend deployment

---

## ⚙️ 4. Scope MVP

### Core Features

- Inline code completion (Copilot-like)
- Chat AI di VS Code
- Explain code / function
- Debug error assistance
- Refactor suggestion
- Context dari file aktif

### Optional Features

- Multi-file context awareness
- Smart prompt enhancement
- Model switching (local/cloud)

---

## 🧱 5. System Architecture

USER (VS Code)
↓
Continue.dev Extension
↓
AI Router Layer
↓
Local AI (Ollama) OR Cloud AI (Gemini / Groq)

---

## 🧠 6. AI Model Strategy

### Local First

- Ollama + Qwen2.5-Coder 7B
- Llama 3 8B (backup)
- DeepSeek Coder (optional)

### Cloud Fallback

- Gemini API (free tier)
- Groq API (fast + limited free usage)
- OpenAI API (optional paid)

---

## 🧠 7. Routing Logic

IF simple task:
→ Use Local AI

IF complex reasoning:
→ Use Cloud AI

IF local slow/fail:
→ fallback Cloud AI

---

## 💾 8. Data Strategy

- No database (MVP)
- Context only from active workspace files
- Future: memory system + chat history DB

---

## 💻 9. Tech Stack

- VS Code
- Continue.dev
- Ollama
- Qwen2.5-Coder 7B

Optional:

- Gemini API
- Groq API

---

## ⚙️ 10. Performance

- Local response: 2–8 seconds
- RAM usage: 6–12GB
- Optimized for 16GB RAM systems

---

## 📊 11. Success Metrics

- 40% faster coding workflow
- Stable offline usage
- Cloud used only when needed
- Smooth VS Code integration

---

## ⚠️ 12. Risks

- Local model slower than cloud
- Limited context window
- Cloud API quota limits

Mitigation:

- Smart routing
- Hybrid system
- Use 7B model optimal size

---

## 🚀 13. Roadmap

### Phase 2

- Memory system (database)
- Chat history
- Project awareness

### Phase 3

- AI agent mode (edit files automatically)
- Multi-step automation

### Phase 4

- SaaS AI platform
- Multi-user support

---

## 🧱 14. Project Folder Structure (VS Code Setup)

D:\AI-TOOLS\
│
├── ollama/
├── models/
├── continue-config/
├── workspace/
├── prompts/
├── logs/
└── docs/

---

## 💻 15. VS Code Workspace Structure

AI-TOOLS (workspace)
│
├── workspace/
│ ├── project-a/
│ ├── project-b/
│ └── test-playground/
│
├── .vscode/
│ ├── settings.json
│ └── continue.config.json
│
├── README.md
└── PRD_AI_Coding_Assistant.md

---

## ⚙️ 16. Continue Config Location

.vscode/continue.config.json

---

## 🧠 17. Ollama Storage

OLLAMA_MODELS=D:\AI-TOOLS\ollama\models

---

## 🧩 18. Prompts System

prompts/

- coding-assistant.md
- debug-helper.md
- refactor-guide.md
- system-rules.md

---

## 📊 19. Logs System

logs/

- ai-requests.log
- ai-responses.log
- errors.log

---

## 🚀 20. Final Summary

AI Coding Assistant ini adalah:

> Local-first + Cloud fallback hybrid AI system untuk VS Code yang berfungsi seperti GitHub Copilot tetapi gratis dan extensible.

---

## ⚙️ 9. TECH STACK (UPDATED - SYSTEM DESIGN LEVEL)

### 🟢 Core Language

- TypeScript (Node.js)

### 🟢 Backend / System Layer (AI Router Service)

- Node.js runtime
- Express.js (minimal API server)
  - AI request routing (local vs cloud)
  - API abstraction layer untuk VS Code extension
- Optional: Fastify (alternative lebih cepat)

### 🟢 AI Runtime Layer

- Ollama (local AI inference engine)
- Qwen2.5-Coder 7B (primary local model)
- Llama 3 / DeepSeek Coder (backup local model)

### 🟢 Cloud AI Fallback Layer

- Google Gemini API (free tier + monthly quota)
- Groq API (fast inference + limited free usage)

### 🟢 VS Code Integration Layer

- Continue.dev extension (primary UI AI assistant)
- VS Code Workspace API

### 🟢 Dev Environment

- Windows OS
- VS Code
- Environment variables (.env)
- D drive storage separation (D:\Project-Me\My-Project\AI-ASSISTANT)

### 🟢 Optional Future Stack (Phase 2+)

- PostgreSQL / SQLite (AI memory system)
- Redis (cache context AI)
- React + Vite (AI dashboard UI)
- Docker (deployment & portability)

---

## 🧠 10. SYSTEM ARCHITECTURE (CLARIFIED)

USER (VS Code)
↓
Continue.dev
↓
AI Router Service (Node.js + TypeScript)
↓
┌──────────────────────────────┐
│ IF SIMPLE TASK │
│ → Ollama (Local AI) │
│ │
│ IF COMPLEX TASK │
│ → Gemini / Groq API │
└──────────────────────────────┘

---

## 🧩 11. DESIGN DECISION

- Local-first approach digunakan untuk cost efficiency & offline usage
- Cloud AI hanya sebagai fallback untuk reasoning kompleks
- TypeScript dipilih karena kompatibel dengan tooling VS Code ecosystem
- Express.js dipilih untuk simplicity dan cepat development
