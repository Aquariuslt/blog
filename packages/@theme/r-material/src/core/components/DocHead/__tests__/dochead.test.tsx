import * as React from 'react';
import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import Helmet from 'react-helmet';

import DocHead from '../';

Enzyme.configure({ adapter: new Adapter() });

describe('@theme/r-material: core/components/DocHead', (): void => {
  it('# should mount without root meta', (): void => {

    const expectedTitle = 'Awesome Website';

    Enzyme.mount(
      <DocHead title={expectedTitle}/>
    );

    const helmet = Helmet.peek();
    expect(helmet.title).toEqual(expectedTitle);

  });

  it('# should mount with root meta then use bundle', (): void => {

    const baseTitle = 'Awesome Website';
    const subRouteTitle = 'About';

    const expectedTitle = 'About | Awesome Website';

    Enzyme.mount(
      <div>
        <DocHead title={baseTitle} root={true}/>

        <div>
          <DocHead title={subRouteTitle}/>
        </div>
      </div>
    );
    const helmet = Helmet.peek();
    expect(helmet.title).toEqual(expectedTitle);

  });

  it.todo('# should replace description content with sub route');
  it.todo('# should combine keywords content with sub route');

});
