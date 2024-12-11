import React from 'react';
import { fireEvent } from '@testing-library/react';
import { getTreeJSONWithRedux, render, screen } from '../../../../../utils/testUtils/jestUtils';
import Pagination from '../index';

describe('Pagination', () => {
  test('renders Pagination component without error', () => {
    render(
      <Pagination pageCount={10} />,
    );
  });

  test('renders proper count of pages', () => {
    render(
      <Pagination
        pageCount={10}
      />,
    );

    const lastPage = screen.getByText('10');
    const pageShouldNotExist = screen.queryByText('11');

    expect(lastPage).toBeInTheDocument();
    expect(pageShouldNotExist).not.toBeInTheDocument();
  });

  test('calls onPageClick method on page click', () => {
    const onPageClick = jest.fn();
    render(
      <Pagination
        pageCount={10}
        onPageClick={onPageClick}
      />,
    );

    const pageButton = screen.getByText('5');
    fireEvent.click(pageButton);

    expect(onPageClick).toHaveBeenCalled();
  });

  test('calls onPageClick method on arrow click', () => {
    const onPageClick = jest.fn();
    render(
      <Pagination
        pageCount={10}
        onPageClick={onPageClick}
      />,
    );

    const pageButton = screen.getByTestId('NavigateNextIcon');
    fireEvent.click(pageButton);

    expect(onPageClick).toHaveBeenCalled();
  });

  test('Should render correctly', () => {
    const tree = getTreeJSONWithRedux(
      <Pagination />,
    );

    expect(tree).toMatchSnapshot();
  });
});
