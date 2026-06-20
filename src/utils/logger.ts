/**
 * SYNAPSE AI - No Storage Logger
 *
 * Mode:
 * - Tidak membuat folder logs
 * - Tidak membuat file .log
 * - Tidak menyimpan request user
 * - Tidak menyimpan response AI
 * - Hanya menampilkan error ke terminal
 */

export interface LogEntry {
  [key: string]: unknown;
}

export const logger = {
  request: (_entry?: LogEntry): void => {
    // Logging request dinonaktifkan
  },

  response: (_entry?: LogEntry): void => {
    // Logging response dinonaktifkan
  },

  error: (entry?: LogEntry): void => {
    console.error(`[${new Date().toISOString()}] [SYNAPSE ERROR]`, entry);
  },
};

export default logger;
