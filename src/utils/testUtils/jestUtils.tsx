import React, { ReactElement } from 'react';
import { render as rtlRender } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';
import { reducer } from '../../app/store';

const getWrapper = (
  ui: ReactElement,
  {
    // @ts-ignore
    preloadedState,
    store = configureStore({ reducer, preloadedState }),
  } = {},
) => ({ children }: { children: ReactElement }) => (
  <Provider store={store}>{children}</Provider>
);

function render(
  ui: ReactElement,
  {
    // @ts-ignore
    preloadedState,
    store = configureStore({ reducer, preloadedState }),
    ...renderOptions
  } = {},
) {
  const Wrapper = getWrapper(ui, { preloadedState, store });

  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

const getTreeJSONWithRedux = (ui: ReactElement, {
  // @ts-ignore
  preloadedState,
  store = configureStore({ reducer, preloadedState }),
} = {}) => {
  const Wrapper = getWrapper(ui, { preloadedState, store });

  const tree = renderer
    .create(<Wrapper>{ui}</Wrapper>)
    .toJSON();

  return tree;
};

export const wrappedInRouter = (
  component: ReactElement,
) => <BrowserRouter>{component}</BrowserRouter>;

export * from '@testing-library/react';
export { render, getTreeJSONWithRedux };
