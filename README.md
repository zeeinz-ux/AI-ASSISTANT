# Synapse AI

> Connect Intelligence. Build Faster.

Synapse AI adalah Hybrid AI Coding Assistant yang menggabungkan Local AI dan Cloud AI melalui Intelligent Routing Layer.

Project ini dirancang untuk memberikan pengalaman coding assistant yang cepat, hemat biaya, dan tetap dapat digunakan ketika provider tertentu tidak tersedia.

---

# Vision

Membangun AI Coding Assistant yang:

- Local First
- Cloud Assisted
- Cost Efficient
- Privacy Friendly
- Provider Agnostic
- Context Aware
- Future Agent Ready

---

# Overview

Synapse AI bukan model AI.

Synapse AI adalah AI Router dan Context Engine yang bertugas:

- Mengklasifikasikan task
- Memilih provider terbaik
- Melakukan fallback otomatis
- Memahami struktur project
- Mengumpulkan context yang relevan
- Membantu explain, debug, dan refactor code

Contoh:

- Task sederhana → Ollama
- Task kompleks → Gemini
- Gemini gagal → Groq
- Semua provider gagal → Structured Error Response

---

# Current Status

Version:

```text
v0.5.0
```

---

# Completed Features

## Phase 1 — Router Foundation

- AI Router Service
- Task Classification Engine
- Intelligent Provider Selection
- Ollama Integration
- Gemini Integration
- Groq Integration

## Phase 2 — Reliability Layer

- Provider Health Monitoring
- Automatic Provider Fallback
- Continue-Compatible API
- Structured Logging
- Health Check Endpoint

## Phase 3 — Context Engine

- Context Builder
- Workspace Context
- File Context
- Language Context
- Selected Code Context

## Phase 4 — Project Awareness

- Project Analyzer
- Project Structure Scanner
- Key Files Discovery
- Import Graph Analysis
- Related Files Resolver
- Multi-File Context Injection
- Relevance Ranking
- Context Cache Layer
- Project Summary Engine

## Phase 5 — Coding Assistant Intelligence

- Prompt Specialization
- Explain Assistant
- Debug Assistant
- Debug Error Classification
- Refactor Assistant
- Refactor Request Classification

---

# Architecture

```text
User
  │
  ▼
Chat API
  │
  ▼
Context Engine
  │
  ├── Project Analyzer
  ├── Project Structure
  ├── Key Files
  ├── Import Graph
  ├── Related Files
  └── Project Summary
  │
  ▼
Task Classifier
  │
  ▼
Provider Router
  │
  ▼
Fallback Engine
  │
  ├── Ollama (Local)
  ├── Gemini (Cloud)
  └── Groq (Cloud)
  │
  ▼
Response
```

---

# Core Capabilities

## Explain Code

Membantu memahami:

- Function
- Class
- Module
- File
- Project Structure

## Debug Assistant

Membantu menganalisis:

- TypeError
- ReferenceError
- SyntaxError
- Module Errors
- Runtime Issues

## Refactor Assistant

Membantu:

- Long Function Refactor
- Duplicate Code Detection
- Complex Logic Simplification
- Naming Improvements

## Project Awareness

Memahami:

- Struktur Project
- File Penting
- Dependencies
- Related Files
- Ringkasan Arsitektur

---

# Tech Stack

| Layer           | Technology       |
| --------------- | ---------------- |
| Language        | TypeScript       |
| Runtime         | Node.js          |
| Framework       | Express.js       |
| HTTP Client     | Axios            |
| Local AI        | Ollama           |
| Local Model     | Qwen2.5-Coder 7B |
| Cloud AI        | Gemini           |
| Cloud Fallback  | Groq             |
| IDE Integration | Continue.dev     |

---

# Project Structure

```text
src
├── config
├── core
│   ├── router.ts
│   ├── providerFallback.ts
│   ├── providerHealth.ts
│   ├── contextBuilder.ts
│   ├── projectAnalyzer.ts
│   ├── projectStructure.ts
│   ├── projectSummary.ts
│   ├── importGraph.ts
│   ├── relatedFiles.ts
│   ├── fileReader.ts
│   ├── relevance.ts
│   ├── promptSelector.ts
│   ├── systemPrompts.ts
│   ├── debugClassifier.ts
│   ├── debugPrompts.ts
│   ├── refactorClassifier.ts
│   ├── refactorPrompts.ts
│   └── cache.ts
│
├── routes
│   ├── chat.route.ts
│   └── health.route.ts
│
├── services
│   ├── ollama.service.ts
│   ├── gemini.service.ts
│   └── groq.service.ts
│
├── middleware
├── types
└── utils
```

---

# Installation

Install dependencies:

```bash
npm install
```

Create environment file:

```bash
cp .env.example .env
```

Example:

```env
PORT=3000
NODE_ENV=development

OLLAMA_HOST=http://localhost:11434
OLLAMA_MODEL=qwen2.5-coder:7b

GEMINI_API_KEY=your_key
GROQ_API_KEY=your_key
```

---

# Development

Run development server:

```bash
npm run dev
```

Type checking:

```bash
npm run typecheck
```

Build:

```bash
npm run build
```

Production:

```bash
npm start
```

---

# API

## Health Check

```http
GET /health
```

## Chat Endpoint

```http
POST /api/chat
```

Example:

```json
{
  "prompt": "Explain this code",
  "filePath": "src/routes/chat.route.ts",
  "language": "typescript",
  "selectedCode": "function hello() {}"
}
```

---

# Roadmap

## Phase 6 — Workspace Awareness

- External Project Analysis
- Workspace Detection
- Active File Awareness
- Cross-Project Context

## Phase 7 — VS Code Extension

- Native VS Code Integration
- Context Collection
- Inline Commands

## Phase 8 — Agent Layer

- Tool Calling
- Multi-Step Reasoning
- Project-Wide Analysis

---

# MVP Constraints

Included:

- AI Routing
- Context Awareness
- Project Awareness
- Debug Assistant
- Refactor Assistant
- Continue Compatibility

Excluded:

- Database
- User Accounts
- Chat History
- RAG
- Vector Database
- Multi-Agent System

---

# License

MIT License
