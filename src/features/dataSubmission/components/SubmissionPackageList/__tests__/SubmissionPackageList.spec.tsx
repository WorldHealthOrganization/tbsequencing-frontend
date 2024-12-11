import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { getTreeJSONWithRedux, render, screen } from '../../../../../utils/testUtils/jestUtils';
import SubmissionPackageList from '../SubmissionPackageList';

describe('SubmissionPackageList component test', () => {
  const componentWrappedInRouter = (
    <BrowserRouter>
      <SubmissionPackageList />
    </BrowserRouter>
  );

  test('renders SubmissionPackageList component without error', () => {
    render(
      componentWrappedInRouter,
    );
  });

  it('Should render title properly', () => {
    render(
      componentWrappedInRouter,
    );

    screen.getByText('Submission Package List');
  });

  it('Should render correctly', () => {
    const tree = getTreeJSONWithRedux(
      componentWrappedInRouter,
    );

    expect(tree).toMatchSnapshot();
  });
});
