import * as React from 'react';
import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import { BrowserRouter as Router } from 'react-router-dom';

import Categories from '../';

import categoryStore from '../../../stores/category.store';

import * as mockCategoriesOverview from './__mocks__/sample-categories.json';

Enzyme.configure({ adapter: new Adapter() });

describe('@theme/r-material: post/container: Categories', () => {
  it('# should call load categories overview at mount', () => {
    const mockMatch = {
      params: {},
      isExact: true,
      path: '/categories',
      url: '/categories'
    };

    categoryStore.categories = mockCategoriesOverview;

    const wrapper = Enzyme.mount(
      <Router>
        <Categories match={mockMatch} categoryStore={categoryStore} />
      </Router>
    );

    expect(wrapper).toMatchSnapshot();
  });
});
