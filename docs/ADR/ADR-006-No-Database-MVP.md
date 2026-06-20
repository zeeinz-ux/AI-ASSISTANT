# ADR-006 — No Database for MVP

**Status:** Accepted

**Date:** 2026-06-20

## Context

Tujuan MVP adalah menghasilkan AI Coding Assistant yang sederhana, ringan, dan cepat dikembangkan.

## Decision

Tidak menggunakan database pada fase MVP.

## Consequences

### Positive

- Setup lebih sederhana
- Development lebih cepat
- Tidak perlu migration
- Tidak perlu ORM
- Maintenance lebih ringan

### Negative

- Tidak ada persistent memory
- Tidak ada chat history
- Tidak ada user preferences storage

## Alternatives Considered

### SQLite

Ditunda ke Phase 2.

### PostgreSQL

Dianggap terlalu kompleks untuk MVP.

## Future Considerations

Database akan dievaluasi kembali pada Phase 2 untuk:

- Memory System
- Chat History
- Project Awareness
- User Preferences

## Final Decision

Synapse AI MVP tidak menggunakan database.
