/**
 * Log levels enum for type-safe logging
 */
export enum LogLevel {
  Debug = 0,
  Info = 1,
  Warn = 2,
  Error = 3,
}

/**
 * Logger configuration options
 */
export interface LoggerOptions {
  /**
   * Minimum log level to output (default: Debug in development, Warn in production)
   */
  minLevel?: LogLevel;
  /**
   * Whether to include timestamps in log messages (default: true)
   */
  includeTimestamp?: boolean;
  /**
   * Custom prefix for all log messages
   */
  prefix?: string;
}

/**
 * Unified logger class for consistent logging across the application
 *
 * Features:
 * - Type-safe log levels
 * - Development/production mode detection
 * - Configurable log level filtering
 * - Optional timestamps
 * - Context/tag support
 */
class Logger {
  private readonly isDevelopment: boolean;
  private readonly minLevel: LogLevel;
  private readonly includeTimestamp: boolean;
  private readonly prefix: string;

  constructor(options: LoggerOptions = {}) {
    this.isDevelopment =
      typeof __DEV__ !== 'undefined'
        ? __DEV__
        : process.env.NODE_ENV === 'development';

    // Set default min level: Debug in development, Warn in production
    this.minLevel =
      options.minLevel ?? (this.isDevelopment ? LogLevel.Debug : LogLevel.Warn);

    this.includeTimestamp = options.includeTimestamp ?? true;
    this.prefix = options.prefix ?? '';
  }

  /**
   * Format log message with timestamp and prefix
   */
  private formatMessage(level: string, ...args: unknown[]): unknown[] {
    const parts: unknown[] = [this.prefix, `[${level}]`];

    if (this.includeTimestamp) {
      const timestamp = new Date().toISOString();
      parts.push(`[${timestamp}]`);
    }

    return [...parts, ...args];
  }

  /**
   * Check if log level should be output
   */
  private shouldLog(level: LogLevel): boolean {
    return level >= this.minLevel;
  }

  /**
   * Log debug messages (only in development mode)
   * @param args - Arguments to log
   */
  debug(...args: unknown[]): void {
    if (this.shouldLog(LogLevel.Debug) && this.isDevelopment) {
      console.debug(...this.formatMessage('DEBUG', ...args));
    }
  }

  /**
   * Log info messages
   * @param args - Arguments to log
   */
  info(...args: unknown[]): void {
    if (this.shouldLog(LogLevel.Info)) {
      console.info(...this.formatMessage('INFO', ...args));
    }
  }

  /**
   * Log warning messages
   * @param args - Arguments to log
   */
  warn(...args: unknown[]): void {
    if (this.shouldLog(LogLevel.Warn)) {
      console.warn(...this.formatMessage('WARN', ...args));
    }
  }

  /**
   * Log error messages
   * @param args - Arguments to log
   */
  error(...args: unknown[]): void {
    if (this.shouldLog(LogLevel.Error)) {
      console.error(...this.formatMessage('ERROR', ...args));
    }
  }

  /**
   * Create a logger instance with a custom context/tag
   * @param context - Context string to prefix all log messages
   * @returns A new Logger instance with the context prefix
   *
   * @example
   * ```typescript
   * const storageLogger = logger.withContext('Storage');
   * storageLogger.info('Reading data'); // [SeelWidget] [Storage] [INFO] Reading data
   * ```
   */
  withContext(context: string): Logger {
    return new Logger({
      minLevel: this.minLevel,
      includeTimestamp: this.includeTimestamp,
      prefix: `${this.prefix} [${context}]`,
    });
  }
}

/**
 * Default logger instance
 * Use this instance for general logging throughout the application
 *
 * @example
 * ```typescript
 * import { logger } from '../utils';
 *
 * logger.debug('Debug message');
 * logger.info('Info message');
 * logger.warn('Warning message');
 * logger.error('Error message');
 *
 * // With context
 * const storageLogger = logger.withContext('Storage');
 * storageLogger.info('Reading from storage');
 * ```
 */
export const logger = new Logger({ prefix: '[SeelWidget]' });
