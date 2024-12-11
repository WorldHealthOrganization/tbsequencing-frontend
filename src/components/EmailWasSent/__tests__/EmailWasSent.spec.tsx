import React from 'react';
import { render, getTreeJSONWithRedux } from '../../../utils/testUtils/jestUtils';
import EmailWasSent from '../EmailWasSent';

describe('EmailWasSent component test', () => {
  test('renders EmailWasSent component without error', () => {
    render(
      <EmailWasSent />,
    );
  });

  it('Should render correctly', () => {
    const tree = getTreeJSONWithRedux(
      <EmailWasSent />,
    );

    expect(tree).toMatchSnapshot();
  });
});
