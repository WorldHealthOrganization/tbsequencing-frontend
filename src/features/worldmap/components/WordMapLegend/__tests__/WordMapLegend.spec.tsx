import React from 'react';
import { render } from '../../../../../utils/testUtils/jestUtils';
import WordMapLegend from '../WordMapLegend';

describe('WordMapLegend component test', () => {
  test('renders WordMapLegend component without error', () => {
    render(
      <WordMapLegend />,
    );
  });
});
