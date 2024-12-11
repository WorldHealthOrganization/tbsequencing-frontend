import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render } from '../../../../../utils/testUtils/jestUtils';
import AppDrawer from '../AppDrawer';

describe('AppDrawer component tests', () => {
  const componentWrappedInRouter = (
    <BrowserRouter>
      <AppDrawer />
    </BrowserRouter>
  );

  test('renders AppDrawer component', () => {
    render(
      componentWrappedInRouter,
    );
  });
});
