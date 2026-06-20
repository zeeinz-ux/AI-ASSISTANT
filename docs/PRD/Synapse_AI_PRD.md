# Synapse AI — PRD

## AI Coding Assistant (Hybrid Local + Cloud)

## 1. Product Overview

Synapse AI adalah **AI Coding Assistant berbasis VS Code** yang membantu developer menulis, memahami, memperbaiki, dan merapikan kode dengan pendekatan:

> **Local-first AI (gratis, offline) + Cloud AI fallback (free-tier / token-based)**

Target utama Synapse AI adalah menjadi alternatif GitHub Copilot yang:

- gratis
- bisa berjalan offline
- bisa memakai cloud AI saat dibutuhkan
- ringan dijalankan di laptop developer kelas menengah

---

## 2. Product Vision

Membangun asisten coding yang:

- memahami konteks file aktif di VS Code
- memberi suggestion kode secara inline
- membantu debugging
- membantu refactor
- bisa memilih model AI terbaik secara otomatis

---

## 3. Product Goals

### Primary Goals

- AI coding assistant gratis seperti Copilot
- Bisa berjalan offline tanpa internet
- Terintegrasi langsung di VS Code
- Membantu coding, debugging, dan refactoring

### Secondary Goals

- Support cloud AI fallback (Gemini / Groq)
- Smart routing AI untuk memilih model terbaik otomatis
- Ringan di laptop mid-range dengan RAM 16GB

---

## 4. Non-Goals (MVP)

Versi awal ini tidak mencakup:

- web dashboard / SaaS platform
- multi-user system
- training model AI sendiri
- memory system / database permanen
- cloud backend deployment

---

## 5. MVP Scope

### Core Features

- Inline code completion seperti Copilot
- Chat AI di VS Code
- Explain code / function
- Debug error assistance
- Refactor suggestion
- Context dari file aktif

### Optional Features

- Multi-file context awareness
- Smart prompt enhancement
- Model switching local/cloud

---

## 6. System Architecture

```text
USER (VS Code)
   ↓
Continue.dev Extension
   ↓
AI Router Service (Node.js + TypeScript)
   ↓
┌──────────────────────────────┐
│ IF SIMPLE TASK               │
│ → Ollama (Local AI)          │
│                              │
│ IF COMPLEX TASK              │
│ → Gemini / Groq API          │
└──────────────────────────────┘
```

---

## 7. AI Model Strategy

### Local First

- Ollama + Qwen2.5-Coder 7B
- Llama 3 8B (backup)
- DeepSeek Coder (optional)

### Cloud Fallback

- Gemini API (free tier + monthly quota)
- Groq API (fast inference + limited free usage)
- OpenAI API (optional paid expansion)

---

## 8. Routing Logic

- Jika tugas sederhana atau autocomplete → pakai Local AI
- Jika reasoning kompleks atau debugging berat → pakai Cloud AI
- Jika local AI lambat / gagal → fallback ke Cloud AI

---

## 9. Data Strategy

### MVP

- Tidak memakai database
- Context hanya dari file/workspace yang sedang aktif di VS Code

### Future

- Memory system
- Chat history database
- Project awareness yang lebih kuat

---

## 10. Tech Stack

### Core Language

- TypeScript (Node.js)

### Backend / System Layer

- Node.js runtime
- Express.js sebagai AI Router API
- Optional: Fastify sebagai alternatif

### AI Runtime Layer

- Ollama
- Qwen2.5-Coder 7B
- Llama 3 / DeepSeek Coder (backup)

### Cloud AI Layer

- Google Gemini API
- Groq API
- OpenAI API (optional)

### VS Code Integration Layer

- Continue.dev extension
- VS Code Workspace API

### Dev Environment

- Windows OS
- VS Code
- Environment variables (.env)
- Storage separation di D:\AI-TOOLS

### Optional Future Stack

- PostgreSQL / SQLite
- Redis
- React + Vite
- Docker

---

## 11. Performance Targets

- Response local: 2–8 detik
- RAM usage target: 6–12GB
- Cocok untuk laptop 16GB RAM
- Harus tetap nyaman dipakai sambil coding

---

## 12. Success Metrics

- Coding workflow lebih cepat minimal 40%
- Offline mode tetap stabil
- Cloud dipakai hanya saat diperlukan
- Integrasi VS Code terasa natural
- Response AI cukup cepat untuk dipakai harian

---

## 13. Risks & Mitigation

### Risks

- Model local lebih lambat dari cloud
- Context window terbatas
- Cloud API quota bisa habis

### Mitigation

- Smart routing
- Hybrid system local + cloud
- Gunakan model 7B sebagai baseline
- Batasi context yang dikirim

---

## 14. Project Folder Structure

```text
D:\AI-TOOLS\
├── ollama/
├── models/
├── continue-config/
├── workspace/
├── prompts/
├── logs/
└── docs/
```

---

## 15. VS Code Workspace Structure

```text
AI-TOOLS (workspace)
├── workspace/
│   ├── project-a/
│   ├── project-b/
│   └── test-playground/
├── .vscode/
│   ├── settings.json
│   └── continue.config.json
├── README.md
└── PRD_AI_Coding_Assistant.md
```

---

## 16. Config Locations

- Continue config: `.vscode/continue.config.json`
- Ollama models: `OLLAMA_MODELS=D:\AI-TOOLS\ollama\models`
- Prompts folder: `prompts/`
- Logs folder: `logs/`

---

## 17. Prompts System

Folder prompts berisi template instruksi AI seperti:

- coding-assistant.md
- debug-helper.md
- refactor-guide.md
- system-rules.md

---

## 18. Logs System

Folder logs berisi:

- ai-requests.log
- ai-responses.log
- errors.log

---

## 19. Design Decisions

- Local-first dipilih untuk hemat biaya dan offline usage
- Cloud AI hanya fallback untuk reasoning kompleks
- TypeScript dipilih karena cocok dengan ekosistem VS Code
- Express.js dipilih karena sederhana dan cepat untuk pengembangan awal
- Nama **Synapse AI** dipilih karena mencerminkan koneksi, aliran informasi, dan kecerdasan hybrid

---

## 20. Roadmap

### Phase 2

- Memory system berbasis database
- Chat history
- Project awareness

### Phase 3

- AI agent mode (edit files otomatis)
- Multi-step automation

### Phase 4

- SaaS AI platform
- Multi-user support

---

## 21. Final Summary

Synapse AI adalah **local-first + cloud-fallback hybrid AI system untuk VS Code** yang bekerja seperti GitHub Copilot, tetapi gratis, fleksibel, dan bisa dikembangkan menjadi produk yang lebih besar.
