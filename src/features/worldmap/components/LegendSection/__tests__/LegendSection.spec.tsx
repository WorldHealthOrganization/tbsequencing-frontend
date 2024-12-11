import React from 'react';
import { render } from '../../../../../utils/testUtils/jestUtils';
import LegendSection from '../LegendSection';

describe('LegendSection component test', () => {
  test('renders LegendSection component without error', () => {
    render(
      <LegendSection />,
    );
  });
});
