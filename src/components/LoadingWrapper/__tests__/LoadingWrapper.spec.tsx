import React from 'react';
import { render, getTreeJSONWithRedux, screen } from '../../../utils/testUtils/jestUtils';
import LoadingWrapper from '../LoadingWrapper';

describe('LoadingWrapper component test', () => {
  test('renders LoadingWrapper component without error', () => {
    render(
      <LoadingWrapper isLoading={false}>
        children
      </LoadingWrapper>,
    );
  });

  test('renders children if isLoading is false', () => {
    render(
      <LoadingWrapper isLoading={false}>
        children
      </LoadingWrapper>,
    );

    screen.getByText('children');
  });

  test('doesnt render children if isLoading is true', () => {
    render(
      <LoadingWrapper isLoading>
        children
      </LoadingWrapper>,
    );

    const child = screen.queryByText('children');

    expect(child).not.toBeInTheDocument();
  });

  it('Should render correctly', () => {
    const tree = getTreeJSONWithRedux(
      <LoadingWrapper isLoading={false}>
        children
      </LoadingWrapper>,
    );

    expect(tree).toMatchSnapshot();
  });
});
