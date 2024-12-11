import React from 'react';
import { render, wrappedInRouter } from '../../../utils/testUtils/jestUtils';
import Feedback from '../Feedback';

describe('Feedback component test', () => {
  test('renders Feedback component without error', () => {
    render(
      wrappedInRouter(<Feedback />),
    );
  });
});
