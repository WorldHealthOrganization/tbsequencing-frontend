import React from 'react';
import { fireEvent } from '@testing-library/react';
import { getTreeJSONWithRedux, render, screen } from '../../../../../utils/testUtils/jestUtils';
import AssociationTableGrouped, { LeftColumnButton } from '../AssociationTableGrouped';
import { formatResistantDataGrouped } from '../../GenesView/utils';
import { association } from '../mock';
import { GeneAssociationGroupedData } from '../../../../../services/drugsApi/models';

const mockData = formatResistantDataGrouped(association as GeneAssociationGroupedData[]);

describe('AssociationTableGrouped', () => {
  const mockOnClick = jest.fn();
  test('renders AssociationTableGrouped component without error', () => {
    render(
      <AssociationTableGrouped
        tableHeader="Table header"
        data={mockData}
        isLoading={false}
      />,
    );
  });

  test('calls onClick function on click', () => {
    render(
      <AssociationTableGrouped
        tableHeader="Table header"
        data={mockData}
        leftColumnItemComponent={LeftColumnButton}
        onClick={mockOnClick}
        isLoading={false}
      />,
    );

    const clickItem = screen.getByText('rpoB');

    expect(clickItem).toBeInTheDocument();

    fireEvent.click(clickItem);

    expect(mockOnClick).toHaveBeenCalled();
  });

  test('Should render correctly', () => {
    const tree = getTreeJSONWithRedux(
      <AssociationTableGrouped tableHeader="Table header" data={mockData} isLoading={false} />,
    );

    expect(tree).toMatchSnapshot();
  });
});
