import React from 'react';
import { getTreeJSONWithRedux, render } from '../../../../../../../utils/testUtils/jestUtils';
import DataSubmissionInstructions from '../DataSubmissionInstructions';

describe('DataSubmissionInstructions component test', () => {
  test('renders DataSubmissionInstructions component without error', () => {
    render(
      <DataSubmissionInstructions />,
    );
  });

  it('Should render correctly', () => {
    const tree = getTreeJSONWithRedux(
      <DataSubmissionInstructions />,
    );

    expect(tree).toMatchSnapshot();
  });
});
