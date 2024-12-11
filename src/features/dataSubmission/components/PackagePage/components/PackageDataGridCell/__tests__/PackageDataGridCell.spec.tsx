import React from 'react';
import { screen } from '@testing-library/react';
import { getTreeJSONWithRedux, render } from '../../../../../../../utils/testUtils/jestUtils';
import PackageDataGridCell from '../PackageDataGridCell';

describe('PackageDataGridCell component test', () => {
  const mockContent = 'mockContent';

  test('renders PackageDataGridCell component without error', () => {
    render(
      <PackageDataGridCell>
        {mockContent}
      </PackageDataGridCell>,
    );
  });

  it('Should render children properly', () => {
    render(
      <PackageDataGridCell>
        {mockContent}
      </PackageDataGridCell>,
    );

    screen.getByText(mockContent);
  });

  it('Should render correctly', () => {
    const tree = getTreeJSONWithRedux(
      <PackageDataGridCell>
        {mockContent}
      </PackageDataGridCell>,
    );

    expect(tree).toMatchSnapshot();
  });
});
