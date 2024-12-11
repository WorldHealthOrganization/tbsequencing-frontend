import React from 'react';
import { render } from '../../../utils/testUtils/jestUtils';
import AppRadioGroup from '../AppRadioGroup';

describe('CountriesRadioGroup component test', () => {
  test('renders AppRadioGroup component without error', () => {
    render(
      <AppRadioGroup selectedValue={0} variant="doubleCol" items={[]} onChange={() => null} />,
    );
  });
});
