import React from 'react';
import { render } from '../../../../../utils/testUtils/jestUtils';
import MapFilters from '../MapFilters';

describe('MapFilters component test', () => {
  test('renders MapFilters component without error', () => {
    render(
      <MapFilters />,
    );
  });
});
