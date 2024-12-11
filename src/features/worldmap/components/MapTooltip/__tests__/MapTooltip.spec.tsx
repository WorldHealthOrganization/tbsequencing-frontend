import React from 'react';
import { render } from '../../../../../utils/testUtils/jestUtils';
import MapTooltip from '../MapTooltip';

test('renders MapTooltip component', () => {
  render(
    <MapTooltip />,
  );
});
