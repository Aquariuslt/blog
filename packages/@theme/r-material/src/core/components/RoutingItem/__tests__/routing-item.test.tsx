import * as React from 'react';
import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';

import RoutingItem from '../';

Enzyme.configure({ adapter: new Adapter() });

describe('@theme/r-material: core/components: RoutingItem', (): void => {
  it('# should mount routing item component correctly', (): void => {
    const mockName = 'routing menu';
    const mockLink = '/to/somewhere';

    const wrapper = Enzyme.shallow(<RoutingItem name={mockName} link={mockLink}/>);

    expect(wrapper).toMatchSnapshot();
  });
});
