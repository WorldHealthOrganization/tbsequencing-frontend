import React from 'react';
import { getTreeJSONWithRedux, render, screen } from '../../../../../utils/testUtils/jestUtils';
import MutationsCatalogue from '../MutationsCatalogue';

describe('MutationsCatalogue', () => {
  test('renders MutationsCatalogue component without error', () => {
    render(
      <MutationsCatalogue />,
    );
  });

  test('render button', () => {
    render(
      <MutationsCatalogue />,
    );

    const pageButton = screen.getByText('Download All');
    expect(pageButton).toBeInTheDocument();
  });

  test('Should render correctly', () => {
    const tree = getTreeJSONWithRedux(
      <MutationsCatalogue />,
    );

    expect(tree).toMatchSnapshot();
  });
});
