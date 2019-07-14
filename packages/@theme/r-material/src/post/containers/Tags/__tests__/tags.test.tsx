import * as React from 'react';
import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import Tags from '../';
import tagStore from '../../../stores/tag.store';
import { BrowserRouter as Router } from 'react-router-dom';

import * as mockTagsOverview from './__mocks__/sample-tags.json';

Enzyme.configure({ adapter: new Adapter() });

describe('@theme/r-material: post/container: Tags', () => {
  it('# should call load tags overview at mount', async () => {
    const mockMatch = {
      params: {},
      isExact: true,
      path: '/tags',
      url: '/tags'
    };

    tagStore.tags = mockTagsOverview;

    const wrapper = Enzyme.mount(
      <Router>
        <Tags match={mockMatch} tagStore={tagStore} />
      </Router>
    );

    expect(wrapper).toMatchSnapshot();
  });
});
