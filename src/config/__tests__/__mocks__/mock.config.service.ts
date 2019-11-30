import * as path from 'path';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@/config/config.service';

const MOCK_CONFIG_SEARCH_FROM = path.join(__dirname, '../__fixtures__/');

@Injectable()
export class MockConfigService extends ConfigService {
  constructor() {
    super(MOCK_CONFIG_SEARCH_FROM);
  }
}
