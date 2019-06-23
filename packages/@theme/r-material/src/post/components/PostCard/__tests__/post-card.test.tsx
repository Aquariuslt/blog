import * as React from 'react';
import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';

import PostCard from '../';

import * as samplePost from './__mocks__/sample-post.json';

Enzyme.configure({ adapter: new Adapter() });

describe('@theme/r-material: post/component: PostCard', (): void => {

  it('# should mount correctly', (): void => {

    const wrapper = Enzyme.shallow(<PostCard {...samplePost} />);
    expect(wrapper).toMatchSnapshot();
  });
});
