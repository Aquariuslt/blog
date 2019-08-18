import * as _ from 'lodash';

const API_PREFIX = '/api/v1';

function generatePageRoutes(apiMap): BlogApiModel.ApiQuery {
  const routes = Object.keys(apiMap).map((apiPath): string => {
    return apiPath.replace(API_PREFIX, '');
  });

  return {
    '/routes': _.uniq(routes.concat(['/']))
  };
}

export default {
  generatePageRoutes
};
