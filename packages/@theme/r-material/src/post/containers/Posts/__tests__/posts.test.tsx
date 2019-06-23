import * as React from 'react';


import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';

import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import Posts from '../';
import postStore from '../../../stores/post.store';

import * as mockPosts from './__mocks__/sample-posts.json';


Enzyme.configure({ adapter: new Adapter() });

describe('@theme/r-material: post/containers: Posts', (): void => {

  it('# should call load posts when mount posts components', async (): Promise<void> => {
    // mock api results
    const mock = new MockAdapter(axios);
    const mockMatch = {
      params: {},
      isExact: false,
      path: '',
      url: ''
    };
    mock.onGet('/api/v1/posts.json').reply(200, mockPosts);


    const wrapper = Enzyme.mount(
      <Posts
        match={mockMatch}
        postStore={postStore}
      />
    );


    await (new Promise((resolve): void => {
      setTimeout((): void => {
        resolve();
      }, 2000);
    }));


    expect(postStore.loaded).toBeTruthy();
    expect(wrapper).toMatchSnapshot();
  });


  it('# should show breadcrumbs when path is not empty', async (): Promise<void> => {
    // mock api results
    const mock = new MockAdapter(axios);
    const mockMatch = {
      params: {},
      isExact: false,
      path: '/categories/:category',
      url: '/categories/c'
    };
    mock.onGet('/api/v1/categories/c.json').reply(200, mockPosts);


    const wrapper = Enzyme.mount(
      <Posts
        match={mockMatch}
        postStore={postStore}
      />
    );


    await (new Promise((resolve): void => {
      setTimeout((): void => {
        resolve();
      }, 2000);
    }));

    expect(postStore.loaded).toBeTruthy();
    expect(wrapper).toMatchSnapshot();
  });

});
