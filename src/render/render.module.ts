import { Global, Module } from '@nestjs/common';
import { RenderService } from '@/render/render.service';

@Global()
@Module({
  providers: [RenderService],
  exports: [RenderService]
})
export class RenderModule {}
