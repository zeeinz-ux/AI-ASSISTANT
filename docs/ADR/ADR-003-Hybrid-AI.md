# ADR-003 — Adopt Hybrid AI Architecture

**Status:** Accepted

**Date:** 2026-06-20

## Context

Model AI lokal memiliki biaya operasional rendah tetapi kualitas reasoning tertentu masih berada di bawah model cloud premium.

## Decision

Menggunakan pendekatan Hybrid AI:

- Local AI sebagai default
- Cloud AI sebagai fallback

## Consequences

### Positive

- Biaya operasional rendah
- Tetap mendapatkan kualitas reasoning tinggi saat diperlukan
- Mendukung mode offline

### Negative

- Routing logic lebih kompleks
- Membutuhkan integrasi lebih dari satu provider

## Alternatives Considered

### Full Local

Ditolak karena keterbatasan reasoning pada kasus tertentu.

### Full Cloud

Ditolak karena ketergantungan pada internet dan quota API.

## Final Decision

Menggunakan arsitektur Hybrid AI (Local First + Cloud Fallback).
