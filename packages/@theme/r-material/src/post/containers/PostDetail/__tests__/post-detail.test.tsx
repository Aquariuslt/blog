import * as React from 'react';
import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import PostDetail from '../';
import postStore from '../../../stores/post.store';

import * as mockPost from './__mocks__/sample-post-detail.json'

Enzyme.configure({ adapter: new Adapter() });

describe('@theme/r-material: post/containers: PostDetail',():void=>{

  it('# should call load post when mount post detail components',async():Promise<void>=>{
    const mock = new MockAdapter(axios);
    const mockMatch = {
      params: {},
      isExact: false,
      path: '/posts/2015/10/25/some-post',
      url: '/posts/2015/10/25/some-post'
    };

    mock.onGet('/api/v1/posts/2015/10/25/some-post.json')
      .reply(200, mockPost);



    const wrapper = Enzyme.mount(
      <PostDetail
        match={mockMatch}
        postStore={postStore}
      />
    );

    await (new Promise((resolve): void => {
      setTimeout((): void => {
        resolve();
      }, 2000);
    }));

    expect(wrapper).toMatchSnapshot();
  });

});
