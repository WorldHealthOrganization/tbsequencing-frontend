import React from 'react';
import {
  getTreeJSONWithRedux, render, screen, wrappedInRouter,
} from '../../../../../utils/testUtils/jestUtils';
import DrugDescriptionWrapper from '../DrugDescriptionWrapper';
import { IDrug } from '../../../../../services/drugsApi/models';

describe('DrugDescriptionWrapper', () => {
  const selectedDrug: IDrug = {
    drugName: 'Rifampicin',
    code: 'RIF',
    drugId: 1,
  };

  const drugs: IDrug[] = [
    selectedDrug,
    { drugId: 2, drugName: 'MockDrug', code: 'MOC' },
    { drugId: 3, drugName: 'DrugMock', code: 'DRU' },
  ];

  test('renders DrugDescriptionWrapper component without error', () => {
    render(
      wrappedInRouter(
        <DrugDescriptionWrapper
          drugs={drugs}
          selectedDrug={selectedDrug}
          isLoadingAssociations={false}
          handleSelectDrugChange={jest.fn()}
        >
          child
        </DrugDescriptionWrapper>,
      ),
    );
  });

  test('renders selectBox with selectedDrug', () => {
    render(
      wrappedInRouter(
        <DrugDescriptionWrapper
          drugs={drugs}
          selectedDrug={selectedDrug}
          isLoadingAssociations={false}
          handleSelectDrugChange={jest.fn()}
        >
          child
        </DrugDescriptionWrapper>,
      ),
    );

    const drug = screen.getByText(selectedDrug.drugName);

    expect(drug).toBeInTheDocument();
  });

  test('renders child components', () => {
    render(
      wrappedInRouter(
        <DrugDescriptionWrapper
          drugs={drugs}
          selectedDrug={selectedDrug}
          isLoadingAssociations={false}
          handleSelectDrugChange={jest.fn()}
        >
          child
        </DrugDescriptionWrapper>,
      ),
    );

    const child = screen.getByText('child');

    expect(child).toBeInTheDocument();
  });

  test('Should render correctly', () => {
    const tree = getTreeJSONWithRedux(
      wrappedInRouter(
        <DrugDescriptionWrapper
          drugs={drugs}
          selectedDrug={selectedDrug}
          isLoadingAssociations={false}
          handleSelectDrugChange={jest.fn()}
        >
          child
        </DrugDescriptionWrapper>,
      ),
    );

    expect(tree).toMatchSnapshot();
  });
});
