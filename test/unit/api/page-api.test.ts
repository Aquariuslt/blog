import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import pageApi from '@/api/page-api';
// import mocks
import * as mockPages from './__mocks__/pages.json';
import * as mockPage from './__mocks__/post.json';

describe('api: page-api', () => {
  it('# should load all pages correctly', async () => {
    const mock = new MockAdapter(axios);
    mock.onGet('/api/v1/pages.json').reply(200, mockPages);

    const actualResponse = await pageApi.loadPages();
    expect(actualResponse.data).toEqual(mockPages);
  });

  it('# should load page by filename/permalink correctly', async () => {
    const mock = new MockAdapter(axios);
    mock.onGet('/api/v1/pages/about.json').reply(200, mockPage);
    const postsResponse = await pageApi.loadPage('pages/about');

    expect(postsResponse.data).toEqual(mockPage);
  });
});
