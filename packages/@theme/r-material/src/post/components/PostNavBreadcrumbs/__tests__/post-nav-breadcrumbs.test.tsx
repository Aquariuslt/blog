import * as React from 'react';
import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';

import PostNavBreadcrumbs from '../';


Enzyme.configure({ adapter: new Adapter() });

describe('@theme/r-material: post/component: PostNavBreadcrumbs', (): void => {

  it('# should mount correctly', (): void => {

    const path = '/categories/some-category';
    const wrapper = Enzyme.shallow(<PostNavBreadcrumbs path={path}/>);
    expect(wrapper).toMatchSnapshot();
  });

  it('# should mount with long path and render last one as activated', (): void => {

    const path = '/posts/2019/06/05';
    const wrapper = Enzyme.shallow(<PostNavBreadcrumbs path={path}/>);
    expect(wrapper).toMatchSnapshot();
  });
});
