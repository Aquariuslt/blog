import * as React from 'react';

import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';

import Navigation from '../';
import Profile from '../../Profile';

Enzyme.configure({ adapter: new Adapter() });

describe('@theme/r-material: core/components: Navigation', (): void => {
  it('# should mount Navigation with props.title correctly', (): void => {
    const mockTitle = 'title';
    const wrapper = Enzyme.shallow(<Navigation title={mockTitle} menus={[]}/>);

    expect(wrapper).toMatchSnapshot();
  });

  it('# should show SideBar when state.open is true', (): void => {
    const mockTitle = 'title';

    let wrapper = Enzyme.shallow(<Navigation title={mockTitle} menus={[]}/>);

    // simulate on drawer button will trigger sidebar class change
    wrapper.find('[aria-label="core.navigation.open_drawer"]').simulate('click');

    expect(wrapper).toMatchSnapshot();
  });

  it('# should show SideBar when click twice menu', (): void => {
    const mockTitle = 'title';

    let wrapper = Enzyme.shallow(<Navigation title={mockTitle} menus={[]}/>);

    // simulate on drawer button will trigger sidebar class change
    wrapper.find('[aria-label="core.navigation.open_drawer"]').simulate('click');

    wrapper.find('[aria-label="core.navigation.close_drawer"]').simulate('click');
  });

  it('# should show menus when have non-empty menus props', (): void => {
    const mockTitle = 'title';
    const menus = [
      {
        name: 'PostList',
        link: '/to/somewhere',
        icon: 'category',
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
      },
      {
        name: 'Tags',
        link: '/to/somewhere',
        icon: 'bookmark',
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
      }
    ];

    let wrapper = Enzyme.shallow(<Navigation title={mockTitle} menus={menus}/>);
    expect(wrapper).toMatchSnapshot();
  });

  it('# should show profile when have profile props', (): void => {
    const mockTitle = 'title';
    const menus = [
      {
        name: 'PostList',
        link: '/to/somewhere',
        icon: 'category',
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
      },
      {
        name: 'Tags',
        link: '/to/somewhere',
        icon: 'bookmark',
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
      }
    ];
    const mockProfileProps = {
      name: '',
      avatar: 'https://img.aquariuslt.com/social/avatar.png',
      subtitle: '',
      description: ''
    };

    let wrapper = Enzyme.shallow(
      <Navigation title={mockTitle} menus={menus} profile={<Profile {...mockProfileProps} />}/>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
