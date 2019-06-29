import * as React from 'react';
import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';

import PostTOC from '../';

import * as mockTOC from './__mocks__/sample-toc.json';

Enzyme.configure({ adapter: new Adapter() });

describe('@theme/r-material: post/component: PostTOC', (): void => {
  it('# should mount correctly', (): void => {

    const wrapper = Enzyme.shallow(
      <PostTOC contents={mockTOC}/>
    );

    expect(wrapper).toMatchSnapshot();

  });


  it('# should mount w/o contents correctly', (): void => {
    const wrapper = Enzyme.shallow(
      <PostTOC contents={undefined}/>
    );
    expect(wrapper).toMatchSnapshot();

  });
});
