import { Module } from '@nestjs/common';
import { ConfigModule } from '@/config/config.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigService } from '@/config/config.service';

@Module({
  imports: [
    ConfigModule,
    ServeStaticModule.forRoot({
      rootPath: new ConfigService().dirs.dest
    })
  ]
})
export class RenderServerModule {}
