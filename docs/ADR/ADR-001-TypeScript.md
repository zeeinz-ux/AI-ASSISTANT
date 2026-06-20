# ADR-001 — Use TypeScript as Primary Language

**Status:** Accepted

**Date:** 2026-06-20

## Context

Synapse AI membutuhkan:

- AI Router Service
- Integrasi Ollama
- Integrasi Gemini dan Groq
- Integrasi dengan ecosystem VS Code
- Maintainability jangka panjang

## Decision

Menggunakan TypeScript sebagai bahasa pemrograman utama untuk seluruh backend dan system layer Synapse AI.

## Consequences

### Positive

- Type safety lebih baik
- Refactoring lebih aman
- Dokumentasi kode lebih jelas
- Cocok dengan ecosystem VS Code

### Negative

- Learning curve sedikit lebih tinggi dibanding JavaScript
- Build process memerlukan transpilation

## Alternatives Considered

### JavaScript

Ditolak karena tidak memiliki type safety bawaan.

### Python

Ditolak karena fokus project berada pada tooling yang dekat dengan ecosystem Node.js dan VS Code.

## Final Decision

TypeScript digunakan sebagai bahasa utama Synapse AI.
