# ADR-002 — Use Ollama as Local AI Runtime

**Status:** Accepted

**Date:** 2026-06-20

## Context

Synapse AI membutuhkan AI lokal yang:

- Gratis
- Offline
- Mudah diintegrasikan
- Mendukung berbagai model open-source

## Decision

Menggunakan Ollama sebagai local AI runtime.

## Consequences

### Positive

- Open source
- Gratis
- Mendukung banyak model
- API sederhana

### Negative

- Membutuhkan resource lokal
- Performa bergantung pada spesifikasi perangkat

## Alternatives Considered

### LM Studio

Lebih fokus ke GUI daripada runtime service.

### Jan AI

Masih kurang matang untuk kebutuhan project saat ini.

### Open WebUI

Lebih cocok sebagai interface daripada runtime utama.

## Final Decision

Ollama digunakan sebagai local AI runtime Synapse AI.
