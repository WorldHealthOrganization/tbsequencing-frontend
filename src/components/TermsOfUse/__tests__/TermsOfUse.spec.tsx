import React from 'react';
import { getTreeJSONWithRedux, render } from '../../../utils/testUtils/jestUtils';
import TermsOfUse from '../TermsOfUse';

describe('TermsOfUse component test', () => {
  test('renders TermsOfUse component without error', () => {
    render(
      <TermsOfUse />,
    );
  });

  it('Should render correctly', () => {
    const tree = getTreeJSONWithRedux(
      <TermsOfUse />,
    );

    expect(tree).toMatchSnapshot();
  });
});
