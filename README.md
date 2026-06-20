# Synapse AI

> Connect Intelligence. Build Faster.

Synapse AI adalah Hybrid AI Coding Assistant yang menggabungkan Local AI dan Cloud AI melalui Intelligent Routing Layer.

Project ini dibangun sebagai fondasi AI Coding Assistant yang:

- Local-first
- Hemat biaya penggunaan AI
- Mendukung fallback otomatis
- Dapat berjalan dengan atau tanpa cloud provider
- Didesain untuk berkembang menjadi AI Agent

---

# Overview

Synapse AI bertindak sebagai AI Router yang berada di antara IDE dan AI Provider.

Alih-alih mengirim semua request ke satu model, Synapse menganalisis kompleksitas task lalu menentukan provider yang paling sesuai.

Contoh:

- Task sederhana → Ollama (Local AI)
- Task kompleks → Gemini
- Gemini gagal → Groq
- Semua provider gagal → Error terstruktur

---

# Features

## AI Router

- Automatic Task Classification
- Intelligent Provider Selection
- Local-First Strategy
- Cloud Fallback Support

## Local AI

- Ollama Integration
- Qwen2.5-Coder Support
- Offline Capability

## Cloud AI

- Gemini Integration
- Groq Integration

## Reliability Layer

- Provider Health Monitoring
- Automatic Provider Fallback
- Structured Error Handling

## Continue.dev Compatibility

- OpenAI-style Response Format
- Continue Request Compatibility
- Messages Array Support

## Context Awareness

- Workspace Context
- Active File Context
- Language Context
- Selected Code Context

---

# Current Status

## Phase 1 — Core Router Foundation

Completed

- AI Router Service
- Ollama Integration
- Gemini Integration
- Groq Integration
- Task Classification Engine
- Automatic Routing Engine

## Phase 2 — Reliability Layer

Completed

- Provider Health Monitoring
- Automatic Fallback Engine
- Continue Compatibility Layer
- Structured Logging
- Health Check Endpoint

## Phase 3 — Context Awareness

Completed

- Context Builder
- Workspace Context
- File Context
- Language Context
- Selected Code Context

In Progress

- Smart Context Collector
- Continue Native Integration
- Streaming Responses

---

# Architecture

```text
VS Code
   ↓
Continue.dev
   ↓
Synapse AI Router
   ↓
Task Classifier
   ↓
Provider Selection
   ↓
Fallback Engine
   ↓

┌─────────────────────────────┐
│ Local AI                    │
│ Ollama + Qwen2.5-Coder      │
└─────────────────────────────┘

┌─────────────────────────────┐
│ Cloud AI                    │
│ Gemini                      │
│ Groq                        │
└─────────────────────────────┘
```

---

# Routing Logic

## Simple Tasks

Examples:

- Explain code
- Small refactor
- Generate function
- Fix typo
- Autocomplete

Provider:

```text
Ollama
↓
Qwen2.5-Coder
```

## Complex Tasks

Examples:

- System design
- Architecture planning
- Deep debugging
- Large refactor
- Multi-step reasoning

Provider:

```text
Gemini
↓
Groq Fallback
↓
Ollama Last Resort
```

---

# Tech Stack

| Layer           | Technology       |
| --------------- | ---------------- |
| Language        | TypeScript       |
| Runtime         | Node.js          |
| Framework       | Express.js       |
| Local AI        | Ollama           |
| Local Model     | Qwen2.5-Coder 7B |
| Cloud AI        | Gemini           |
| Cloud Fallback  | Groq             |
| IDE Integration | Continue.dev     |

---

# Prerequisites

- Node.js 18+
- Ollama
- VS Code
- Continue.dev Extension

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

GEMINI_API_KEY=your_key_here
GROQ_API_KEY=your_key_here
```

---

# Ollama Setup

Download model:

```bash
ollama pull qwen2.5-coder:7b
```

Verify installation:

```bash
ollama list
```

Check API:

```bash
curl http://localhost:11434/api/tags
```

---

# Run Development Server

```bash
npm run dev
```

Server:

```text
http://localhost:3000
```

---

# API Endpoints

## Health Check

```http
GET /health
```

Example:

```bash
curl http://localhost:3000/health
```

---

## Chat Endpoint

```http
POST /api/chat
```

Legacy Request:

```json
{
  "prompt": "Explain async await"
}
```

Continue-Compatible Request:

```json
{
  "messages": [
    {
      "role": "user",
      "content": "Explain async await"
    }
  ]
}
```

Context-Aware Request:

```json
{
  "prompt": "Refactor this code",
  "filePath": "src/routes/chat.route.ts",
  "language": "typescript",
  "workspace": "AI-ASSISTANT",
  "selectedCode": "async function test() {}"
}
```

---

# Project Structure

```text
src/
├── config/
│   └── env.ts
│
├── core/
│   ├── router.ts
│   ├── taskClassifier.ts
│   ├── providerHealth.ts
│   ├── providerFallback.ts
│   └── contextBuilder.ts
│
├── middleware/
│   └── errorHandler.ts
│
├── routes/
│   ├── chat.route.ts
│   └── health.route.ts
│
├── services/
│   ├── ollama.service.ts
│   ├── gemini.service.ts
│   └── groq.service.ts
│
├── types/
│   └── index.ts
│
├── utils/
│   └── logger.ts
│
└── index.ts
```

---

# Roadmap

## Phase 1 — Router Foundation ✅

- AI Router
- Task Classification
- Multi Provider Support

## Phase 2 — Reliability Layer ✅

- Provider Health Monitoring
- Automatic Fallback Engine
- Continue Compatibility

## Phase 3 — Context Awareness 🚧

- Context Builder
- Smart Context Collector
- Workspace Awareness
- Active File Awareness

## Phase 4 — Agent Layer

- Project Awareness
- Multi-file Reasoning
- Tool Calling
- Agent Workflows

---

# Design Principles

- Local First
- Cloud When Necessary
- Cost Efficient
- Provider Agnostic
- No Database (MVP)
- Modular Architecture
- Future Agent Ready

---

# License

MIT License
