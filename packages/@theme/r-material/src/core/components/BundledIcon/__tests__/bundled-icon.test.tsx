import * as React from 'react';
import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';

import Menu from '@material-ui/icons/Menu';
import BundledIcon from '../';

Enzyme.configure({ adapter: new Adapter() });

describe('@theme/r-material: core/components: BundledIcon', (): void => {
  it('# should mount correct bundled types correctly', (): void => {
    const mockType = 'expandLess';
    const wrapper = Enzyme.shallow(<BundledIcon type={mockType}/>);
    expect(wrapper).toMatchSnapshot();
  });

  it('# should mount with same dom with material-ui/icon', (): void => {
    const mockType = 'menu';

    const muiMenuWrapper = Enzyme.shallow(<Menu/>);
    const bundleIconWrapper = Enzyme.shallow(<BundledIcon type={mockType}/>);

    expect(bundleIconWrapper.html()).toEqual(muiMenuWrapper.html());
  });

  it('# should fallback to menu when type is not in bundled map', (): void => {
    const mockType = 'somehow';
    const muiMenuWrapper = Enzyme.shallow(<Menu/>);
    const fallbackBundleIconWrapper = Enzyme.shallow(<BundledIcon type={mockType}/>);

    expect(fallbackBundleIconWrapper.html()).toEqual(muiMenuWrapper.html());
  });
});
