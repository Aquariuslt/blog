import { Module } from '@nestjs/common';
import { CustomLogger } from '@/logger/custom.logger';

@Module({
  providers: [CustomLogger],
  exports: [CustomLogger]
})
export class LoggerModule {}
