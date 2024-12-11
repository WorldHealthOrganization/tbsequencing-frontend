import React from 'react';
import { getTreeJSONWithRedux, render } from '../../../utils/testUtils/jestUtils';
import RegistrationResult from '../RegistrationResult';

describe('Registration result tests', () => {
  test('renders RegistrationResult component', () => {
    render(
      <RegistrationResult />,
    );
  });

  it('Should render correctly', () => {
    const tree = getTreeJSONWithRedux(
      <RegistrationResult />,
    );

    expect(tree).toMatchSnapshot();
  });
});
