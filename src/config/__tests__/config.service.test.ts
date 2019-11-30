import * as path from 'path';
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@/config/config.service';
import { MockConfigService } from '@/config/__tests__/__mocks__/mock.config.service';

describe('ConfigService', () => {
  let service: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: ConfigService,
          useValue: new MockConfigService()
        }
      ]
    }).compile();

    service = module.get<ConfigService>(ConfigService);
  });

  it('# should be defined', () => {
    expect(service).toBeDefined();
  });

  it('# should load config.version after initial`', () => {
    expect(service.version).toEqual('2-test');
  });

  it('# should load config.basePath from fixtures dir', () => {
    expect(service.basePath).toEqual(path.join(__dirname, '__fixtures__'));
  });
});
