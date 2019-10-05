import { Test, TestingModule } from '@nestjs/testing';
import { ArticleService } from '@/article/article.service';
import { ConfigService } from '@/config/config.service';
import { MockConfigService } from '@/config/__tests__/__mocks__/mock.config.service';

describe('ArticleService', () => {
  let service: ArticleService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: ConfigService,
          useValue: new MockConfigService()
        },
        ArticleService
      ]
    }).compile();

    service = module.get<ArticleService>(ArticleService);
  });

  it('# should be defined', () => {
    expect(service).toBeDefined();
  });
});
