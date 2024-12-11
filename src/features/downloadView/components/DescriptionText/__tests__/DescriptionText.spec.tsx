import React from 'react';
import { getTreeJSONWithRedux, render } from '../../../../../utils/testUtils/jestUtils';
import DescriptionText from '../DescriptionText';

describe('DescriptionText', () => {
  test('renders DescriptionText component without error', () => {
    render(
      <DescriptionText />,
    );
  });

  test('Should render correctly', () => {
    const tree = getTreeJSONWithRedux(
      <DescriptionText />,
    );

    expect(tree).toMatchSnapshot();
  });
});
