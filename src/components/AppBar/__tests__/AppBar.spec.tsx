import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, getTreeJSONWithRedux } from '../../../utils/testUtils/jestUtils';
import AppBar from '../AppBar';

describe('AppBar component test', () => {
  test('renders AppBar component without error', () => {
    render(
      <BrowserRouter>
        <AppBar />
      </BrowserRouter>
      ,
    );
  });

  it('Should render correctly', () => {
    const tree = getTreeJSONWithRedux(
      <BrowserRouter>
        <AppBar />
      </BrowserRouter>,
    );

    expect(tree).toMatchSnapshot();
  });
});
