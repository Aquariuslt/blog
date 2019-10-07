import * as log from 'fancy-log';
import { Injectable, Logger, Optional } from '@nestjs/common';

@Injectable()
export class AppLogger extends Logger {
  private readonly enabled: boolean = false;

  constructor(@Optional() context?: string, @Optional() isTimestampEnabled = false) {
    super(context, isTimestampEnabled);
    if (process.env.NODE_ENV !== 'test') {
      this.enabled = true;
    }
  }

  private static appendContext(context: string) {
    return `[${context}]`;
  }

  debug(message: string, context?: string) {
    this.enabled && log.dir(AppLogger.appendContext(context), message);
  }

  log(message: string, context?: string) {
    this.enabled && log.info(AppLogger.appendContext(context), message);
  }

  warn(message: string, context?: string) {
    this.enabled && log.warn(AppLogger.appendContext(context), message);
  }

  error(message: string, trace?: string, context?: string) {
    this.enabled && log.error(AppLogger.appendContext(context), message);
  }
}
