import React from 'react';
import { getTreeJSONWithRedux, render } from '../../../utils/testUtils/jestUtils';
import AppPaper from '../AppPaper';

describe('AppPaper component test', () => {
  test('renders AppPaper component without error', () => {
    render(
      <AppPaper>Mock</AppPaper>,
    );
  });

  it('Should render correctly', () => {
    const tree = getTreeJSONWithRedux(
      <AppPaper>Mock</AppPaper>,
    );

    expect(tree).toMatchSnapshot();
  });
});
