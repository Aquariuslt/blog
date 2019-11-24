import * as _ from 'lodash';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@/config/config.service';
import { ArticleService } from '@/article/article.service';
import { RoutesService } from '@/routes/routes.service';
import { RoutePathPrefix } from '@blog/common/interfaces/routes';
import { ApiData } from '@blog/common/interfaces/api';
import {
  createCategoriesOverviewApiData,
  createCategoryDetailApiData,
  createPostDetailApiData,
  createPostsOverviewApiData,
  createTagDetailApiData,
  createTagsOverviewApiData,
  createNavigationApiData,
  persistApi,
  createProfileApiData
} from '@blog/api-generator';
import { buildURLPath } from '@blog/common/utils/path.util';

@Injectable()
export class ApiService implements OnModuleInit {
  private readonly logger = new Logger(ApiService.name);

  private $inited;

  public apiMap;
  private apis: Partial<ApiData>[];

  private home: ApiData;
  private navigation: Partial<ApiData>;
  private profile: Partial<ApiData>;

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

  async onModuleInit() {
    if (this.$inited) {
      return;
    }
    this.routes.onModuleInit();
    this.buildApi();
    this.$inited = true;
  }

  buildApi() {
    this.home = this.buildHomeApi();

    this.tagsOverview = this.buildTagsOverviewApi();
    this.categoriesOverview = this.buildCategoriesOverviewApi();
    this.postsOverview = this.buildPostsOverviewApi();

    this.tagDetails = this.buildTagDetailsApi();
    this.categoryDetails = this.buildCategoryDetailsApi();
    this.postDetails = this.buildPostDetailsApi();

    this.navigation = this.buildNavigationApi();
    this.profile = this.buildProfileApi();

    this.apis = _.concat(
      [this.home],
      [this.tagsOverview],
      [this.categoriesOverview],
      [this.postsOverview],
      [this.navigation],
      [this.profile],
      this.tagDetails,
      this.categoryDetails,
      this.postDetails
    );

    this.apiMap = _.keyBy(this.apis, 'path');

    _.each(this.apis, (api) => {
      this.logger.log(`Persisting Api for path: ${api.path}`);
      persistApi(api.path, api, this.config.dirs.api);
    });
  }

  buildHomeApi() {
    return _.merge({}, this.routes.home, {
      path: buildURLPath(RoutePathPrefix.HOME_ALIAS),
      data: createPostsOverviewApiData(this.article.contexts)
    });
  }

  buildTagsOverviewApi() {
    return _.merge({}, this.routes.tagsOverview, {
      data: createTagsOverviewApiData(this.article.contexts)
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
      data: createCategoriesOverviewApiData(this.article.contexts)
    });
  }

  buildCategoryDetailsApi() {
    const categoryDetails = this.routes.categoryDetails;
    return _.map(categoryDetails, (categoryDetail) => {
      return _.merge({}, categoryDetail, {
        data: createCategoryDetailApiData(categoryDetail.key, this.article.contexts)
      });
    });
  }

  buildPostsOverviewApi() {
    return _.merge({}, this.routes.postsOverview, {
      data: createPostsOverviewApiData(this.article.contexts)
    });
  }

  buildPostDetailsApi() {
    return _.map(this.routes.postDetails, (postDetail) => {
      const data = _.merge({}, createPostDetailApiData(postDetail.key, this.article.contexts), {
        disqus: {
          shortname: this.config.site.disqus,
          url: postDetail.url,
          identifier: postDetail.path.replace(/\//g, '-')
        }
      });

      return _.merge({}, postDetail, { data });
    });
  }

  buildNavigationApi() {
    return {
      path: buildURLPath(RoutePathPrefix.NAVIGATION),
      data: createNavigationApiData()
    };
  }

  buildProfileApi() {
    return {
      path: buildURLPath(RoutePathPrefix.PROFILE),
      data: createProfileApiData(this.config.profile)
    };
  }
}
