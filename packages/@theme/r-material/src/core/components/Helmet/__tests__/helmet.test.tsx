import * as _ from 'lodash';
import * as React from 'react';
import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import RHelmet from 'react-helmet';

import Helmet from '../';

Enzyme.configure({ adapter: new Adapter() });

describe('@theme/r-material: core/components/RHelmet', (): void => {
  it('# should mount without root meta', (): void => {

    const expectedTitle = 'Awesome Website';

    Enzyme.mount(
      <Helmet title={expectedTitle}/>
    );

    const helmet = RHelmet.peek();
    expect(helmet.title).toEqual(expectedTitle);

  });

  it('# should mount with root meta then use bundle', (): void => {

    const baseTitle = 'Awesome Website';
    const subRouteTitle = 'About';

    const expectedTitle = 'About | Awesome Website';

    Enzyme.mount(
      <div>
        <Helmet title={baseTitle} root={true}/>

        <div>
          <Helmet title={subRouteTitle}/>
        </div>
      </div>
    );
    const helmet = RHelmet.peek();
    expect(helmet.title).toEqual(expectedTitle);

  });

  it.todo('# should replace description content with sub route');
  it.todo('# should combine keywords content with sub route');

  it('# should load with opengraph in post detail page', () => {
    const baseTitle = 'Awesome Website';

    const mockOpenGraph: OpenGraph.Meta = {
      'og:title': 'OG Title',
      'og:type': 'article',
      'og:image': 'https://img.example.com/somepic.png',
      'og:url': 'https://blog.example.com/p/some-article'
    };

    Enzyme.mount(
      <div>
        <Helmet
          title={baseTitle}
          opengraph={mockOpenGraph}
        />
      </div>
    );
    const helmet = RHelmet.peek();
    expect(helmet.title).toEqual(baseTitle);
    expect(helmet.metaTags).not.toBeUndefined();

    const metaTagMap = _.mapValues(_.keyBy(helmet.metaTags, 'property'), 'content');

    _.each(_.keys(mockOpenGraph), (key) => {
      expect(metaTagMap[key]).toEqual(mockOpenGraph[key]);
    });

  });
});
