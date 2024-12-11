import React from 'react';
import { render, getTreeJSONWithRedux } from '../../../../../../../../../utils/testUtils/jestUtils';
import EditSampleNameModal from '../EditSampleNameModal';

describe('EditSampleNameModal component test', () => {
  test('renders EditSampleNameModal component without error', () => {
    render(
      <EditSampleNameModal />,
    );
  });

  it('Should render correctly', () => {
    const tree = getTreeJSONWithRedux(
      <EditSampleNameModal />,
    );

    expect(tree).toMatchSnapshot();
  });
});
