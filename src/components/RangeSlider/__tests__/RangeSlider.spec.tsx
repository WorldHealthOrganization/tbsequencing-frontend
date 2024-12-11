import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import { getTreeJSONWithRedux, render } from '../../../utils/testUtils/jestUtils';
import RangeSlider from '../RangeSlider';

const currentYear = new Date().getFullYear();

describe('RangeSlider component test', () => {
  test('renders RangeSlider component without error', () => {
    render(
      <RangeSlider onSubmit={() => null} />,
    );
  });

  test('calls submit func', () => {
    const submitFunc = jest.fn();
    render(<RangeSlider onSubmit={submitFunc} />);
    const button = screen.queryByText('Submit');

    if (button) {
      fireEvent.click(button);
    }

    expect(button).toBeInTheDocument();
    expect(submitFunc).toHaveBeenCalled();
  });

  test('sets value correctly after preset click', () => {
    render(<RangeSlider min={1964} max={currentYear} onSubmit={() => {}} />);

    const presetButton = screen.queryByText('Last year');

    if (presetButton) {
      fireEvent.click(presetButton);
    }

    const firstDot = screen.queryByDisplayValue(currentYear - 1);
    const secondDot = screen.queryByDisplayValue(currentYear);

    expect(presetButton).toBeInTheDocument();
    expect(firstDot).toBeInTheDocument();
    expect(secondDot).toBeInTheDocument();
  });

  it('Should render correctly', () => {
    const tree = getTreeJSONWithRedux(
      <RangeSlider onSubmit={() => null} />,
    );

    expect(tree).toMatchSnapshot();
  });
});
