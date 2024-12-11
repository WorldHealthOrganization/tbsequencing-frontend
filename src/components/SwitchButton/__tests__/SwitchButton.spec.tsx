import React from 'react';
import { getTreeJSONWithRedux, render } from '../../../utils/testUtils/jestUtils';
import SwitchButton from '../SwitchButton';

describe('ToggleButton component test', () => {
  const mockHandler = jest.fn();

  test('renders ToggleButton component without error', () => {
    render(
      <SwitchButton
        onBlur={mockHandler}
        onChange={mockHandler}
        name="mockSwitch"
        error={{ type: 'value' }}
        isError={false}
        type="switch"
        label="mockLabel"
        value={{}}
      />,
    );
  });

  it('Should render correctly', () => {
    const tree = getTreeJSONWithRedux(
      <SwitchButton
        onBlur={mockHandler}
        onChange={mockHandler}
        name="mockSwitch"
        error={{ type: 'value' }}
        isError={false}
        type="switch"
        label="mockLabel"
        value={{}}
      />,
    );

    expect(tree).toMatchSnapshot();
  });
});
