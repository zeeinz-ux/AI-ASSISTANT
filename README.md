# Synapse AI

> Connect Intelligence. Build Faster.

Synapse AI adalah Hybrid AI Coding Assistant yang menggabungkan Local AI dan Cloud AI melalui Intelligent Routing Layer.

Project ini dibangun untuk memberikan pengalaman coding assistant yang cepat, hemat biaya, dan tetap dapat digunakan meskipun koneksi internet tidak tersedia.

---

# Vision

Membangun AI Coding Assistant yang:

- Local First
- Cloud Assisted
- Cost Efficient
- Privacy Friendly
- Provider Agnostic
- Future Agent Ready

---

# Overview

Synapse AI bukan model AI.

Synapse AI adalah AI Router yang bertugas menentukan provider AI terbaik berdasarkan kompleksitas task dan kondisi provider yang tersedia.

Contoh:

- Task sederhana → Ollama
- Task kompleks → Gemini
- Gemini gagal → Groq
- Semua provider gagal → Error terstruktur

---

# Current Status

Version:

```text
v0.3.0
```

## Completed

### Phase 1 — Core Router Foundation

- AI Router Service
- Task Classification Engine
- Ollama Integration
- Gemini Integration
- Groq Integration
- Automatic Provider Routing

### Phase 2 — Reliability Layer

- Provider Health Monitoring
- Automatic Provider Fallback
- Continue-Compatible API
- Structured Logging
- Health Check Endpoint

### Phase 3A.1 — Context Awareness Foundation

- Context Builder
- Workspace Context
- File Context
- Language Context
- Selected Code Context

## In Progress

### Phase 3A.2 — Smart Context Collector

- Automatic Workspace Detection
- Automatic File Detection
- Automatic Selected Code Detection

## Planned

### Phase 3B — Project Awareness

- Project Structure Awareness
- Package.json Awareness
- Tech Stack Awareness

### Phase 4 — Agent Layer

- Tool Calling
- Project Reasoning
- Multi-file Reasoning

### Phase 5 — SaaS Platform

- Multi User
- Team Workspace
- Analytics Dashboard

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

┌────────────────────┐
│ Local AI           │
│ Ollama             │
│ Qwen2.5-Coder 7B   │
└────────────────────┘

┌────────────────────┐
│ Cloud AI           │
│ Gemini             │
│ Groq               │
└────────────────────┘
```

---

# Features

## AI Routing

- Intelligent Provider Selection
- Task Complexity Classification
- Local First Strategy

## Reliability

- Provider Health Check
- Automatic Fallback
- Structured Error Handling

## Continue Compatibility

- Continue Request Support
- OpenAI-Compatible Response Format
- Messages Array Support

## Context Awareness

- Workspace Context
- Active File Context
- Language Context
- Selected Code Context

---

# Design Principles

- Local First
- Cloud When Necessary
- No Database MVP
- Cost Efficient
- Provider Agnostic
- Continue Compatible
- Future Agent Ready

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

GEMINI_API_KEY=your_gemini_api_key
GROQ_API_KEY=your_groq_api_key
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

Development:

```bash
npm run dev
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

# API Reference

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

### Legacy Request

```json
{
  "prompt": "Explain async await"
}
```

### Continue-Compatible Request

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

### Context-Aware Request

```json
{
  "prompt": "Refactor this function",
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

## Phase 1 — Router Foundation

✅ Complete

## Phase 2 — Reliability Layer

✅ Complete

## Phase 3A — Context Awareness

🚧 In Progress

## Phase 3B — Project Awareness

📌 Planned

## Phase 4 — Agent Layer

📌 Planned

## Phase 5 — SaaS Platform

📌 Planned

---

# MVP Scope

Included:

- AI Routing
- Local AI
- Cloud Fallback
- Context Awareness
- Continue Compatibility

Excluded:

- Database
- User Accounts
- Chat History Storage
- RAG
- Vector Database
- Multi-Agent System

---

# License

MIT License
