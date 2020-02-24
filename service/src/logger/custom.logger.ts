import { addLayout, configure, getLogger, Logger } from 'log4js';
import { Injectable, Optional, Logger as NestLogger } from '@nestjs/common';

@Injectable()
export class CustomLogger extends NestLogger {
  private internalLogger: Logger;

  constructor(@Optional() context?: string, @Optional() isTimestampEnabled = false) {
    super(context, isTimestampEnabled);
    this.configure();
  }

  private configure() {
    addLayout('json', () => {
      return (logEvent) =>
        JSON.stringify({
          timestamp: logEvent.startTime,
          pid: logEvent.pid,
          level: logEvent.level.levelStr,
          message: logEvent.data[0],
          context: logEvent.data[1] || 'No-Context'
        });
    });

    configure({
      appenders: {
        stdout: {
          type: 'stdout'
        },
        file: {
          type: 'dateFile',
          filename: 'logs/app.log', // TODO: Update to Configured Value: Logging
          pattern: '.yyyy-MM-dd-hh',
          compress: true,
          layout: {
            type: 'json'
          }
        }
      },
      categories: {
        default: {
          appenders: ['stdout', 'file'],
          level: 'trace'
        }
      }
    });

    this.internalLogger = getLogger('App');
  }

  debug(message: any, context?: string) {
    this.internalLogger.debug(message, context);
  }

  log(message: string, context?: string) {
    this.internalLogger.info(message, context);
  }

  warn(message: any, context?: string) {
    this.internalLogger.warn(message, context);
  }

  error(message: any, trace?: string, context?: string) {
    this.internalLogger.error(message, context, trace);
  }
}
