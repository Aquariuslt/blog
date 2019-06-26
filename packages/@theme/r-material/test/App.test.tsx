import * as React from 'react';
import { ReactNode } from 'react';
import { mount } from 'enzyme';
import { Provider } from 'mobx-react';
import App from '../src/App';
import navigationStore from '../src/core/stores/navigation.store';


describe('@theme/r-material:App', (): void => {
  it('# should mount App with empty route correctly', (): void => {
    const routes = [];
    const wrapper = mount(<App routes={routes} navigationStore={navigationStore}/>);

    expect(wrapper.props().routes).toEqual([]);
  });

  it('# should mount App with 1 route correctly', (): void => {
    const FixtureComponent = (): JSX.Element => <div>Fixture</div>;

    const routes = [
      {
        path: '/',
        component: FixtureComponent
      }
    ];

    const wrapper = mount(<App routes={routes} navigationStore={navigationStore}/>);
    expect(wrapper.props().routes).toHaveLength(1);
  });

  it('# should mount App with injected store', (): void => {
    const FixtureComponent = (): ReactNode => <div>Fixture</div>;

    const routes = [
      {
        path: '/',
        component: FixtureComponent
      }
    ];

    mount(
      <Provider navigationStore={navigationStore}>
        <App routes={routes}/>
      </Provider>
    );
  });

  it('# should mount App without injected store', (): void => {
    const FixtureComponent = (): JSX.Element => <div>Fixture</div>;

    const routes = [
      {
        path: '/',
        component: FixtureComponent
      }
    ];

    mount(
      <Provider navigationStore={undefined}>
        <App routes={routes}/>
      </Provider>
    );
  });
});
