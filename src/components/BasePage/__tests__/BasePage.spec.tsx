import React from 'react';
import { render } from '../../../utils/testUtils/jestUtils';
import BasePage from '../BasePage';

describe('BasePage component test', () => {
  test('renders BasePage component without error', () => {
    render(
      <BasePage />,
    );
  });
});
