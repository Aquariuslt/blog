import { Test, TestingModule } from '@nestjs/testing';
import { ApiService } from '@/api/api.service';
import { ConfigService } from '@/config/config.service';
import { MockConfigService } from '@/config/__tests__/__mocks__/mock.config.service';
import { ArticleService } from '@/article/article.service';
import { RoutingService } from '@/routing/routing.service';

describe('ApiService', () => {
  let service: ApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: ConfigService,
          useValue: new MockConfigService()
        },
        ArticleService,
        RoutingService,
        ApiService
      ]
    }).compile();

    service = module.get<ApiService>(ApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
