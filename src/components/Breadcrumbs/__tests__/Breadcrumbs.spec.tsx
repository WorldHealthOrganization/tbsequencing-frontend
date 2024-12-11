import React from 'react';
import { render, getTreeJSONWithRedux } from '../../../utils/testUtils/jestUtils';
import Breadcrumbs, { IBreadcrumb } from '../Breadcrumbs';

describe('Breadcrumbs component test', () => {
  const mockConfig:IBreadcrumb[] = [
    { href: 'mockHref', label: 'mockLabel', isActive: false },
  ];

  test('renders Breadcrumbs component without error', () => {
    render(
      <Breadcrumbs breadcrumbs={mockConfig} />,
    );
  });

  it('Should render correctly', () => {
    const tree = getTreeJSONWithRedux(
      <Breadcrumbs breadcrumbs={mockConfig} />,
    );

    expect(tree).toMatchSnapshot();
  });
});
