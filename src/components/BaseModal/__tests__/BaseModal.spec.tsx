import React from 'react';
import { render, screen } from '../../../utils/testUtils/jestUtils';
import BaseModal from '../BaseModal';

describe('BaseModal component test', () => {
  const mockContentString = 'mock';
  const mockContent = <div>{mockContentString}</div>;

  test('renders BaseModal component without error', () => {
    render(
      <BaseModal open>{mockContent}</BaseModal>,
    );
  });

  it('Should render content if opened', () => {
    render(
      <BaseModal open>{mockContent}</BaseModal>,
    );

    screen.getByText(mockContentString);
  });
});
