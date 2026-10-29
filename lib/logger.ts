// lib/logger.ts — Structured JSON logging for production observability

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  context?: Record<string, unknown>;
}

function formatEntry(level: LogLevel, message: string, context?: Record<string, unknown>): string {
  const entry: LogEntry = {
    timestamp: new Date().toISOString(),
    level,
    message,
    ...(context && { context }),
  };
  return JSON.stringify(entry);
}

export const logger = {
  debug: (message: string, context?: Record<string, unknown>) => {
    if (process.env.NODE_ENV === 'development') {
      console.debug(formatEntry('debug', message, context));
    }
  },
  info: (message: string, context?: Record<string, unknown>) => {
    console.log(formatEntry('info', message, context));
  },
  warn: (message: string, context?: Record<string, unknown>) => {
    console.warn(formatEntry('warn', message, context));
  },
  error: (message: string, context?: Record<string, unknown>) => {
    console.error(formatEntry('error', message, context));
  },
};
