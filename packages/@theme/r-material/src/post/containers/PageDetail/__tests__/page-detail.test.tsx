import * as React from 'react';
import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import PageDetail from '../';
import pageStore from '../../../stores/page.store';

import * as mockPost from './__mocks__/sample-page-detail.json';

Enzyme.configure({ adapter: new Adapter() });

describe('@theme/r-material: post/containers: PageDetail', (): void => {
  it('# should call load post when mount post detail components', async (): Promise<void> => {
    const mock = new MockAdapter(axios);
    const mockMatch = {
      params: {},
      isExact: false,
      path: '/pages/about',
      url: '/pages/about'
    };

    mock.onGet('/api/v1/pages/about.json').reply(200, mockPost);

    const wrapper = Enzyme.mount(<PageDetail match={mockMatch} pageStore={pageStore} />);

    await new Promise((resolve): void => {
      setTimeout((): void => {
        resolve();
      }, 2000);
    });

    expect(wrapper).toMatchSnapshot();
  });
});
