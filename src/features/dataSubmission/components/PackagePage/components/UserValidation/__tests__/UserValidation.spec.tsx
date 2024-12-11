import React from 'react';
import { getTreeJSONWithRedux, render, screen } from '../../../../../../../utils/testUtils/jestUtils';
import UserValidation from '../UserValidation';

describe('UserValidation component test', () => {
  test('renders UserValidation component without error', () => {
    render(
      <UserValidation validationInProgress />,
    );
  });

  it('Should render validation message in case of validation', () => {
    render(
      <UserValidation validationInProgress />,
    );

    screen.getByText('You are waiting for verification. If it takes too long, contact us');
  });

  it('Should render correctly', () => {
    const tree = getTreeJSONWithRedux(
      <UserValidation validationInProgress />,
    );

    expect(tree).toMatchSnapshot();
  });
});
