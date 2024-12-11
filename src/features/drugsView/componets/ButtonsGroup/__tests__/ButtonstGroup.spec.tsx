import React from 'react';
import {
  getTreeJSONWithRedux, render, screen, fireEvent,
} from '../../../../../utils/testUtils/jestUtils';
import ButtonsGroup from '../ButtonsGroup';
import { ChartDataType, Regions, ResistantType } from '../../../models';

describe('ButtonsGroup', () => {
  const onResistantTypeClick = jest.fn();
  const setSelectedDates = jest.fn();
  const handleRegionChange = jest.fn();
  const handleDataTypeChanged = jest.fn();
  const props = {
    chartDataType: ChartDataType.Ratio,
    resistantType: ResistantType.Genotypic,
    resistantTypeClick: onResistantTypeClick,
    setSelectedDates,
    handleRegionChange,
    handleDataTypeChanged,
    selectedRegion: Regions.ALL,
    selectedDates: [1995, 2015],
  };
  test('renders ButtonsGroup components without error', () => {
    render(
      <ButtonsGroup {...props} />,
    );
  });

  test('renders all buttons correctly', () => {
    render(
      <ButtonsGroup {...props} />,
    );

    screen.getByText('Phenotypic resistance');
    screen.getByText('Genotypic resistance');
    screen.getByText('WHO region');
    screen.getByText('Time period');
    screen.getByText('Proportions');
    screen.getByText('Absolute numbers');
  });

  test('calls correct callbacks Resistant Type', () => {
    render(
      <ButtonsGroup {...props} />,
    );

    const btn = screen.getByText('Phenotypic resistance');
    fireEvent.click(btn);

    expect(onResistantTypeClick).toHaveBeenCalledTimes(1);
  });

  test('calls correct callbacks Chat Data Type', () => {
    render(
      <ButtonsGroup {...props} />,
    );

    const btn = screen.getByText('Absolute numbers');
    fireEvent.click(btn);

    expect(handleDataTypeChanged).toHaveBeenCalledTimes(1);
  });

  test('Should render correctly', () => {
    const tree = getTreeJSONWithRedux(
      <ButtonsGroup {...props} />,
    );

    expect(tree).toMatchSnapshot();
  });
});
