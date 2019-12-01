import { Test, TestingModule } from '@nestjs/testing';
import { RoutesService } from '@/routes/routes.service';
import { ConfigService } from '@/config/config.service';
import { MockConfigService } from '@/config/__tests__/__mocks__/mock.config.service';
import { ArticleService } from '@/article/article.service';

describe('RoutingService', () => {
  let service: RoutesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: ConfigService,
          useValue: new MockConfigService()
        },
        ArticleService,
        RoutesService
      ]
    }).compile();

    service = module.get<RoutesService>(RoutesService);
  });

  it('# should be defined', () => {
    expect(service).toBeDefined();
  });
});
