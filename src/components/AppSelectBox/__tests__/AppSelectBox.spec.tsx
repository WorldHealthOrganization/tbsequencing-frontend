import React from 'react';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { getTreeJSONWithRedux, render } from '../../../utils/testUtils/jestUtils';
import AppSelectBox from '../AppSelectBox';

describe('AppSelectBox component test', () => {
  test('renders AppSelectBox component without error', () => {
    render(
      <AppSelectBox dropdownContentRender={() => <div>Content</div>} size="medium" variant="outlined">
        Select
      </AppSelectBox>,
    );

    const checkIfDropDownOpened = screen.queryByText('Content');
    expect(checkIfDropDownOpened).not.toBeInTheDocument();
  });

  test('renders dropdown content after click', () => {
    render(
      <AppSelectBox dropdownContentRender={() => <button type="button">Click</button>} size="medium" variant="outlined">
        Select
      </AppSelectBox>,
    );

    const selectBox = screen.queryByText('Select');

    if (selectBox) {
      fireEvent.click(selectBox);
    }

    const dropdownContent = screen.queryByText('Click');

    expect(selectBox).toBeInTheDocument();
    expect(dropdownContent).toBeInTheDocument();
  });

  test('passes closeDropDown func and closes dropdown', async () => {
    const mockOnClick = jest.fn();
    render(
      <AppSelectBox
        dropdownContentRender={({ closeDropDown }) => (
          <button
            onClick={() => {
              closeDropDown();
              mockOnClick();
            }}
            type="button"
          >
            Click
          </button>
        )}
        size="medium"
        variant="outlined"
      >
        Select
      </AppSelectBox>,
    );

    const selectBox = screen.queryByText('Select');

    if (selectBox) {
      fireEvent.click(selectBox);
    }

    const dropdownContent = screen.queryByText('Click');

    if (dropdownContent) {
      fireEvent.click(dropdownContent);
    }

    expect(mockOnClick).toHaveBeenCalled();
    expect(selectBox).toBeInTheDocument();
    await waitFor(() => {
      expect(dropdownContent).not.toBeInTheDocument();
    });
  });

  it('Should render correctly', () => {
    const tree = getTreeJSONWithRedux(
      <AppSelectBox dropdownContentRender={() => <div>Content</div>} size="medium" variant="outlined">
        Select
      </AppSelectBox>,
    );

    expect(tree).toMatchSnapshot();
  });
});
