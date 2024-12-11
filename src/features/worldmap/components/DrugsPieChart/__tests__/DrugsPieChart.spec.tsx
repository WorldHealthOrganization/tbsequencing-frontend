import React from 'react';
import { render, getTreeJSONWithRedux } from '../../../../../utils/testUtils/jestUtils';
import DrugsPieChart from '../DrugsPieChart';

describe('DrugsPieChart component test', () => {
  test('renders DrugsPieChart component without error', () => {
    render(
      <DrugsPieChart />,
    );
  });

  it('Should render correctly', () => {
    const tree = getTreeJSONWithRedux(
      <DrugsPieChart />,
    );

    expect(tree).toMatchSnapshot();
  });
});
