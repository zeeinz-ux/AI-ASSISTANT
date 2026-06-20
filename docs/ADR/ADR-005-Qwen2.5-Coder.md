# ADR-005 — Use Qwen2.5-Coder 7B as Default Local Model

**Status:** Accepted

**Date:** 2026-06-20

## Context

Target perangkat pengembangan:

- Intel Core i5 Gen 10
- RAM 16GB
- GTX 1650

Model yang dipilih harus seimbang antara performa dan kualitas.

## Decision

Menggunakan Qwen2.5-Coder 7B sebagai model default Synapse AI.

## Consequences

### Positive

- Kuat untuk coding
- Ringan untuk perangkat target
- Respons relatif cepat

### Negative

- Tidak sekuat model cloud premium pada reasoning tertentu

## Alternatives Considered

### Llama 3 8B

Lebih general purpose.

### DeepSeek Coder

Baik untuk coding namun lebih berat untuk perangkat target.

## Final Decision

Qwen2.5-Coder 7B digunakan sebagai model default.
