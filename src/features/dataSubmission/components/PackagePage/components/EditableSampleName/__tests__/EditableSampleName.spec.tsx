import React from 'react';
import { render, getTreeJSONWithRedux } from '../../../../../../../utils/testUtils/jestUtils';
import EditableSampleName from '../EditableSampleName';

describe('EditableSampleName component test', () => {
  test('renders EditableSampleName component without error', () => {
    render(
      <EditableSampleName />,
    );
  });

  it('Should render correctly', () => {
    const tree = getTreeJSONWithRedux(
      <EditableSampleName />,
    );

    expect(tree).toMatchSnapshot();
  });
});
