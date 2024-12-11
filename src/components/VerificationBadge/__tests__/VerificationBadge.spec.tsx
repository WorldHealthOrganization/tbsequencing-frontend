import React from 'react';
import { render, getTreeJSONWithRedux } from '../../../utils/testUtils/jestUtils';
import VerificationBadge from '../VerificationBadge';

describe('VerificationBadge component test', () => {
  test('renders VerificationBadge component without error', () => {
    render(
      <VerificationBadge />,
    );
  });

  it('Should render correctly', () => {
    const tree = getTreeJSONWithRedux(
      <VerificationBadge />,
    );

    expect(tree).toMatchSnapshot();
  });
});
