import React from 'react';
import { getTreeJSONWithRedux, render } from '../../../../utils/testUtils/jestUtils';
import NavTabs from '../NavTabs';

describe('NavTabs component test', () => {
  const mockHandler = jest.fn();
  const mockActiveTab = 0;
  const mockRouteMatched = true;
  const mockTabsConfig = [{
    element: <div />,
    path: '/mock',
    label: 'mock',
  }];

  test('renders NavTabs component without error', () => {
    render(
      <NavTabs
        activeTab={mockActiveTab}
        routeMatched={mockRouteMatched}
        onTabChange={mockHandler}
        tabsConfig={mockTabsConfig}
      />,
    );
  });

  it('Should render correctly', () => {
    const tree = getTreeJSONWithRedux(
      <NavTabs
        activeTab={mockActiveTab}
        routeMatched={mockRouteMatched}
        onTabChange={mockHandler}
        tabsConfig={mockTabsConfig}
      />,
    );

    expect(tree).toMatchSnapshot();
  });
});
