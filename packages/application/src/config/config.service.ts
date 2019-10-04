import * as path from 'path';
import * as cosmiconfig from 'cosmiconfig';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class ConfigService {
  private readonly logger = new Logger(ConfigService.name);

  private explorer = cosmiconfig(`blog`);
  private readonly configSearchPath;
  private configLocation;
  private config;

  constructor(configSearchPath?: string) {
    this.configSearchPath = configSearchPath;
    this.loadConfig();
  }

  loadConfig() {
    const lookupConfigResult = this.explorer.searchSync(this.configSearchPath);
    this.logger.log(`Load Config from : ${lookupConfigResult.filepath}`);
    this.config = lookupConfigResult.config;
    this.configLocation = lookupConfigResult.filepath;
  }

  get basePath() {
    return path.dirname(this.configLocation);
  }

  get version() {
    return this.config['version'];
  }

  get sources() {
    const source = this.config['sources'];
    return {
      posts: path.join(this.basePath, source.posts),
      pages: path.join(this.basePath, source.pages)
    };
  }

  get dirs() {
    const dirs = this.config['dirs'];
    return {
      posts: path.join(this.basePath, dirs.posts)
    };
  }

  get site() {
    const site = this.config['site'];
    return {
      domain: site.domain
    };
  }

  get pageOptions() {
    const options = this.config['pages'];
    return {
      titleSeparator: options['title_separator']
    };
  }
}
