import * as _ from 'lodash';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@/config/config.service';
import { ArticleService } from '@/article/article.service';
import { RoutesService } from '@/routes/routes.service';
import { RoutePathPrefix } from '@blog/common/interfaces/routes';
import { ApiData } from '@blog/common/interfaces/api';
import {
  createCategoriesOverviewApiData,
  createCategorysDetailApiData,
  createPostDetailApiData,
  createPostsOverviewApiData,
  createTagDetailApiData,
  createTagsOverviewApiData,
  persistApi
} from '@blog/api-generator';
import { buildURLPath } from '@blog/common/utils/path.util';

@Injectable()
export class ApiService implements OnModuleInit {
  private readonly logger = new Logger(ApiService.name);

  private apis: ApiData[];

  private home: ApiData;

  private tagsOverview: ApiData;
  private tagDetails: ApiData[];

  private categoriesOverview: ApiData;
  private categoryDetails: ApiData[];

  private postsOverview: ApiData;
  private postDetails: ApiData[];

  constructor(
    private readonly config: ConfigService,
    private readonly article: ArticleService,
    private readonly routes: RoutesService
  ) {}

  onModuleInit() {
    this.routes.onModuleInit();
    this.buildApi();
  }

  buildApi() {
    this.home = this.buildHomeApi();

    this.tagsOverview = this.buildTagsOverviewApi();
    this.categoriesOverview = this.buildCategoriesOverviewApi();
    this.postsOverview = this.buildPostsOverviewApi();

    this.tagDetails = this.buildTagDetailsApi();
    this.categoryDetails = this.buildCategoryDetailsApi();
    this.postDetails = this.buildPostDetailsApi();

    this.apis = _.concat(
      [this.home],
      [this.tagsOverview],
      [this.categoriesOverview],
      [this.postsOverview],
      this.tagDetails,
      this.categoryDetails,
      this.postDetails
    );

    _.each(this.apis, (api) => {
      this.logger.log(`Persisting Api for path: ${api.path}`);
      persistApi(api.path, api, this.config.dirs.api);
    });
  }

  buildHomeApi() {
    return _.merge({}, this.routes.home, {
      path: buildURLPath(RoutePathPrefix.HOME_ALIAS),
      data: createPostsOverviewApiData
    });
  }

  buildTagsOverviewApi() {
    return _.merge({}, this.routes.tagsOverview, {
      data: createTagsOverviewApiData
    });
  }

  buildTagDetailsApi() {
    const tagDetails = this.routes.tagDetails;
    return _.map(tagDetails, (tagDetail) => {
      return _.merge({}, tagDetail, {
        data: createTagDetailApiData(tagDetail.key, this.article.contexts)
      });
    });
  }

  buildCategoriesOverviewApi() {
    return _.merge({}, this.routes.categoriesOverview, {
      data: createCategoriesOverviewApiData
    });
  }

  buildCategoryDetailsApi() {
    const categoryDetails = this.routes.categoryDetails;
    return _.map(categoryDetails, (categoryDetail) => {
      return _.merge({}, categoryDetail, {
        data: createCategorysDetailApiData(categoryDetail.key, this.article.contexts)
      });
    });
  }

  buildPostsOverviewApi() {
    return _.merge({}, this.routes.postsOverview, {
      data: createPostsOverviewApiData
    });
  }

  buildPostDetailsApi() {
    return _.map(this.routes.postDetails, (postDetail) => {
      return _.merge({}, postDetail, {
        data: createPostDetailApiData(postDetail.key, this.article.contexts)
      });
    });
  }
}
