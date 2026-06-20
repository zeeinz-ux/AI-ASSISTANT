# Synapse AI System Architecture

## Overview

Synapse AI adalah Hybrid AI Coding Assistant yang berjalan di VS Code dengan pendekatan:

- Local First
- Cloud Fallback

Tujuan:

- Gratis
- Offline
- Extensible

---

## High Level Architecture

User
↓
VS Code
↓
Continue.dev
↓
AI Router Service
↓
┌─────────────┬─────────────┐
│ │ │
Local AI Cloud AI
(Ollama) (Gemini/Groq)
│ │
Qwen2.5 Gemini
Groq

---

## Components

### VS Code

Berfungsi sebagai editor utama.

Responsibilities:

- Workspace management
- User interaction
- Extension hosting

---

### Continue.dev

Berfungsi sebagai AI interface.

Responsibilities:

- Chat UI
- Inline suggestions
- Context collection

---

### AI Router Service

Berfungsi menentukan model mana yang akan digunakan.

Responsibilities:

- Request routing
- Prompt preprocessing
- Provider abstraction

---

### Ollama

Local inference engine.

Responsibilities:

- Menjalankan model lokal
- Menyediakan REST API

---

### Cloud Providers

- Gemini
- Groq

Responsibilities:

- Advanced reasoning
- Fallback service

---

## Request Flow

1. User mengetik prompt.
2. Continue mengambil context.
3. Request dikirim ke AI Router.
4. AI Router mengevaluasi request.
5. Request dikirim ke:
   - Ollama
   - atau Gemini/Groq
6. Response dikembalikan ke VS Code.

---

## Routing Strategy

Simple Task:
→ Local AI

Complex Task:
→ Cloud AI

Local Failure:
→ Cloud Fallback

---

## Storage Strategy

MVP:

- No Database
- No Memory System
- No Persistent History

Future:

- SQLite / PostgreSQL
- Memory System
- Chat History
