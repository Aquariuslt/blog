import * as React from 'react';
import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import RoutingItemList from '../';

Enzyme.configure({ adapter: new Adapter() });

describe('@theme/r-material: core/components: RoutingItemList', (): void => {
  it('# should mount routing item component without child correctly', (): void => {
    const navMenuWoChild = {
      name: 'mockName',
      link: '/to/somewhere',
      icon: 'menu',
      priority: 3,
      child: []
    };

    const wrapper = Enzyme.shallow(<RoutingItemList {...navMenuWoChild} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('# should mount routing item component without icon correctly', (): void => {
    const navMenuWoChild = {
      name: 'mockName',
      link: '/to/somewhere',
      priority: 3,
      child: []
    };

    const wrapper = Enzyme.shallow(<RoutingItemList {...navMenuWoChild} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('# should mount routing item component with child correctly', (): void => {
    const navMenuWChild = {
      name: 'mockName',
      link: '/to/somewhere',
      icon: 'menu',
      priority: 3,
      child: [
        {
          name: 'mock-sub-name',
          link: '/to/some-else'
        },
        {
          name: 'mock-other-sub-name',
          link: '/to/bar'
        }
      ]
    };

    const wrapper = Enzyme.shallow(<RoutingItemList {...navMenuWChild} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('# should expand item list with child correctly', (): void => {
    const navMenuWChild = {
      name: 'mockName',
      link: '/to/somewhere',
      icon: 'menu',
      priority: 3,
      child: [
        {
          name: 'mock-sub-name',
          link: '/to/some-else'
        },
        {
          name: 'mock-other-sub-name',
          link: '/to/bar'
        }
      ]
    };

    const wrapper = Enzyme.shallow(<RoutingItemList {...navMenuWChild} />);
    wrapper.find('[aria-label="Toggle Menu"]').simulate('click');
  });
});
