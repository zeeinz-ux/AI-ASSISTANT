# ADR-004 — Use Continue.dev as VS Code Integration Layer

**Status:** Accepted

**Date:** 2026-06-20

## Context

Synapse AI membutuhkan integrasi langsung dengan VS Code tanpa membangun extension dari nol.

## Decision

Menggunakan Continue.dev sebagai integration layer utama.

## Consequences

### Positive

- Open source
- Mendukung Ollama
- Mendukung Gemini dan provider cloud lainnya
- Mudah dikustomisasi

### Negative

- Bergantung pada project pihak ketiga

## Alternatives Considered

### Cursor

Closed source dan berfokus pada editor tersendiri.

### GitHub Copilot

Berbayar.

### Cline

Lebih berfokus pada AI Agent daripada coding assistant.

## Final Decision

Continue.dev digunakan sebagai VS Code integration layer.
