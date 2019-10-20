import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Config } from '@blog/config';
import { loadConfig } from '@blog/config';

@Injectable()
export class ConfigService implements OnModuleInit {
  private readonly logger = new Logger(ConfigService.name);

  private config: Config;

  constructor(configSearchPath?: string) {
    this.config = loadConfig(`blog`, configSearchPath);
  }

  onModuleInit() {
    this.logger.log(`Load Config from : ${this.config.location}`);
  }

  get basePath() {
    return this.config.basePath;
  }

  get version() {
    return this.config.version;
  }

  get sources() {
    return this.config.sources;
  }

  get dirs() {
    return this.config.dirs;
  }

  get site() {
    return this.config.site;
  }

  get profile() {
    return this.config.profile;
  }

  get pageOptions() {
    return this.config.pageOptions;
  }

  get theme() {
    return this.config.theme;
  }
}
