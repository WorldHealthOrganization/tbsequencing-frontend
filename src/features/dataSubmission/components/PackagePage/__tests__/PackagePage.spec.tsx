import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { getTreeJSONWithRedux, render } from '../../../../../utils/testUtils/jestUtils';
import PackagePage from '../PackagePage';

const pageWrappedInRouter = (
  <BrowserRouter>
    <PackagePage />
  </BrowserRouter>
);

describe('PackagePage component test', () => {
  test('renders PackagePage component without error', () => {
    render(pageWrappedInRouter);
  });

  it('Should render correctly', () => {
    const tree = getTreeJSONWithRedux(
      pageWrappedInRouter,
    );

    expect(tree).toMatchSnapshot();
  });
});
