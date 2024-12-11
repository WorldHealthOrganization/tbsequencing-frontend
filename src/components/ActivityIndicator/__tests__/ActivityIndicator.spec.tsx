import React from 'react';
import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';
import ActivityIndicator from '../ActivityIndicator';

describe('Activity indicator tests', () => {
  test('renders ActivityIndicator component', () => {
    render(
      <ActivityIndicator />,
    );
  });

  it('Should render correctly', () => {
    const tree = renderer
      .create(<ActivityIndicator />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
