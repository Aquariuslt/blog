import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import postApi from '@/api/post-api';

// import mocks
import * as mockPosts from './__mocks__/posts.json';
import * as mockPost from './__mocks__/post.json';

describe('api: post-api', (): void => {
  it('# should load all posts correctly', async (): Promise<void> => {
    const mock = new MockAdapter(axios);
    mock.onGet('/api/v1/posts.json').reply(200, mockPosts);
    const actualResponse = await postApi.loadAllPosts();

    expect(actualResponse.data).toEqual(mockPosts);
  });

  it('# should find post by year correctly', async (): Promise<void> => {
    const mock = new MockAdapter(axios);
    mock.onGet(`/api/v1/posts/2019.json`).reply(200, mockPosts);
    const actualResponse = await postApi.findPosts('2019');

    expect(actualResponse.data).toEqual(mockPosts);
  });

  it('# should find post by year and month correctly', async (): Promise<void> => {
    const mock = new MockAdapter(axios);
    mock.onGet('/api/v1/posts/2019/03.json').reply(200, mockPosts);
    const actualResponse = await postApi.findPosts('2019', '03');

    expect(actualResponse.data).toEqual(mockPosts);

  });

  it('# should load single post by permalink', async (): Promise<void> => {
    const mock = new MockAdapter(axios);
    mock.onGet('/api/v1/posts/2019/03.json').reply(200, mockPosts);
    const postsResponse = await postApi.findPosts('2019', '03');

    expect(postsResponse.data).toHaveLength(1);

    const post = postsResponse.data[0];
    const permalink = post.permalink;

    mock.onGet(`/api/v1/posts${permalink}.json`).reply(200, mockPost);

    expect(permalink).not.toBeUndefined();
    const postResponse = await postApi.loadPost(permalink || '');
    expect(postResponse.data).toEqual(mockPost);
  });

  it('# should load posts with empty path params', async (): Promise<void> => {
    const mock = new MockAdapter(axios);
    mock.onGet('/api/v1/posts.json').reply(200, mockPosts);
    const postsResponse = await postApi.loadPosts('');
    expect(postsResponse.data).toEqual(mockPosts);
  });

  it('# should load posts with `/` as path params', async (): Promise<void> => {
    const mock = new MockAdapter(axios);
    mock.onGet('/api/v1/posts.json').reply(200, mockPosts);
    const postsResponse = await postApi.loadPosts('/');
    expect(postsResponse.data).toEqual(mockPosts);
  });

  it('# should load posts with categories path params', async (): Promise<void> => {
    const mock = new MockAdapter(axios);
    mock.onGet('/api/v1/categories/c.json').reply(200, mockPosts);
    const postsResponse = await postApi.loadPosts('/categories/c');
    expect(postsResponse.data).toEqual(mockPosts);
  });

  it('# should load posts with tags path params', async (): Promise<void> => {
    const mock = new MockAdapter(axios);
    mock.onGet('/api/v1/tags/t.json').reply(200, mockPosts);
    const postsResponse = await postApi.loadPosts('/tags/t');
    expect(postsResponse.data).toEqual(mockPosts);
  });

  it('# should load posts with posts permalink as path params', async (): Promise<void> => {
    const mock = new MockAdapter(axios);
    mock.onGet('/api/v1/posts/2018/12.json').reply(200, mockPosts);
    const postsResponse = await postApi.loadPosts('/posts/2018/12');
    expect(postsResponse.data).toEqual(mockPosts);
  });

});
