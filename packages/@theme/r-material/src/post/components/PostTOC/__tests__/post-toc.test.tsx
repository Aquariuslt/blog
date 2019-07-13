import * as _ from 'lodash';
import * as React from 'react';
import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';

import PostTOC from '../';

import * as mockTOC from './__mocks__/sample-toc.json';

Enzyme.configure({ adapter: new Adapter() });

describe('@theme/r-material: post/component: PostTOC', (): void => {
  it('# should mount correctly', (): void => {
    const wrapper = Enzyme.shallow(<PostTOC contents={mockTOC} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('# should mount w/o contents correctly', (): void => {
    const wrapper = Enzyme.shallow(<PostTOC contents={undefined} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('# should handle click toc label to trigger scoll animation', () => {
    const wrapper = Enzyme.mount(<PostTOC contents={mockTOC} />);

    const lastItem = _.last(mockTOC);
    const id = _.get(lastItem, 'id') || '';

    // since hash item in PostContent, we create a dom element to mock
    let el = document.createElement('div');
    el.setAttribute('id', id);
    document.body.appendChild(el);

    // since window.scrollTo not impl in jsdom, before we use puppeteer as env, we stub window.scrollTo function
    window.scrollTo = jest.fn();

    wrapper
      .find(`[id="${id}"]`)
      .childAt(0)
      .simulate('click');

    expect(wrapper).toMatchSnapshot();
  });
});
