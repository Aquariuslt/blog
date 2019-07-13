import * as React from 'react';

import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';

import LocaleSelect from '../';

Enzyme.configure({ adapter: new Adapter() });

describe('@theme/r-material: core/components: LocaleSelect', () => {
  it('# should mount LocaleSelect component w/o i18next options correctly', () => {
    const wrapper = Enzyme.shallow(<LocaleSelect />);
    expect(wrapper).toMatchSnapshot();
  });

  it('# should change locale when click and select language select menu', async () => {
    await import('./i18n-for-tests');

    const wrapper = Enzyme.shallow(<LocaleSelect />);
    wrapper.find('[aria-label="Language"]').simulate('change', {
      target: {
        value: 'zh'
      }
    });
    expect(wrapper).toMatchSnapshot();
  });
});
