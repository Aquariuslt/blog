import * as React from 'react';
import { attachRoutes, registerRoutes } from '../router';

describe('@theme/r-material: router', (): void => {
  it('# should add register module like vue-router correctly', (): void => {
    const FixtureComponent = (): JSX.Element => <div>Fixture</div>;

    let subRoutes = [
      {
        path: '/',
        component: FixtureComponent
      }
    ];

    expect(attachRoutes()).toHaveLength(0);
    registerRoutes(subRoutes);
    expect(attachRoutes()).toHaveLength(1);
  });
});
