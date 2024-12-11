/** @jsxImportSource @emotion/react */
import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import H1 from '../../../../components/typography/H1';
import { header, wrapper } from './styles';
import ButtonsGroup from '../ButtonsGroup/ButtonsGroup';
import DrugDescriptionWrapper from '../DrugDescriptionWrapper/DrugDescriptionWrapper';
import { ChartDataType, Regions, ResistantType } from '../../models';
import {
  useGetChartDataQuery,
  useGetDrugsDataQuery,
  useGetTableDataQuery,
  useGetGeneAssociationsGroupedQuery,
} from '../../../../services/drugsApi/drugsApi';
import { IChartDataLocal, IDrug } from '../../../../services/drugsApi/models';
import { DEFAULT_PAGE_SIZE, useTableData } from '../../hooks/useTableData';
import DataGrid from '../../../../components/DataGrid';
import { DrugTableColumns, GridType, IColumn } from '../../../../components/DataGrid/models';
import { pagination } from '../../../../components/DataGrid/styles';
import Pagination from '../Pagination';
import {
  createQueryParamsFromRegion,
} from '../../../../services/drugsApi/utils';
import ChartWrapper from '../Chart/ChartWrapper';

export const columns: IColumn<DrugTableColumns>[] = [
  { name: 'geneName', header: 'Gene' },
  { name: 'variantName', header: 'Genomic coordinates' },
  { name: 'nucleodicAnnName', header: 'Nucleic Annotation' },
  { name: 'proteicAnnName', header: 'Proteic Annotation' },
  { name: 'consequence', header: 'Consequence' },
  { name: 'variantGrade', header: 'Grade' },
  { name: 'globalFrequency', header: 'Global Frequency' },
  { name: 'totalCounts', header: 'Total Samples' },
  { name: 'resistantCount', header: 'Resistant Count' },
  { name: 'susceptbleCount', header: 'Susceptible Count' },
  { name: 'intermediateCount', header: 'Intermediate Count' },
];

const DrugsView = () => {
  const [searchParams] = useSearchParams();

  const defaultDrug = {
    code: searchParams.get('code'),
    drugId: Number(searchParams.get('drugId')),
    drugName: searchParams.get('drugName'),
  };

  const [selectedDrug, setSelectedDrug] = useState<IDrug | {}>(
    defaultDrug.drugId ? defaultDrug : {},
  );

  const [resistantType, setResistantType] = useState<ResistantType>(ResistantType.Phenotypic);
  const [selectedDates] = useState<number[]>([1964, new Date().getFullYear()]);
  const [selectedRegion, setSelectedRegion] = useState(Regions.ALL);
  const [dataType, setDataType] = useState<ChartDataType>(ChartDataType.Ratio);

  const {
    data: drugsData = [],
  } = useGetDrugsDataQuery({ isAssociated: 1 });

  const {
    data: chartData = [],
    isLoading: isChartDataLoading,
  } = useGetChartDataQuery({
    resistantType,
    year: selectedDates,
    countryId: createQueryParamsFromRegion(selectedRegion),
  });

  const {
    data: genesAssociationsData,
    isFetching: isAssociationLoading,
  } = useGetGeneAssociationsGroupedQuery(
    { drugId: (selectedDrug as IDrug).drugId },
    { skip: !(selectedDrug as IDrug).drugId },
  );

  const {
    rowsCount,
    tableData = [],
    isTableDataLoading,
    sortState,
    filters,
    page,
    updateSort,
    updateFilters,
    updatePaging,
  } = useTableData({
    drugID: (selectedDrug as IDrug).drugId,
    useGetDataQuery: useGetTableDataQuery,
  });

  useEffect(() => {
    if (drugsData.length && !(selectedDrug as IDrug).drugId) {
      setSelectedDrug(drugsData[0]);
    }
  }, [drugsData]);

  const formattedChartData = useMemo(() => {
    if (!chartData) return [];
    return chartData.reduce((acc: IChartDataLocal[], chartItem) => {
      if (drugsData.length) {
        const currentDrug = drugsData.find((drug: IDrug) => drug.drugId === chartItem.drug);
        if (currentDrug) {
          acc.push({
            ...chartItem,
            drug: currentDrug,
            ratioSusceptible: parseFloat(chartItem.ratioSusceptible).toFixed(1),
            ratioResistant: parseFloat(chartItem.ratioResistant).toFixed(1),
            ratioIntermediate: parseFloat(chartItem.ratioIntermediate).toFixed(1),
            drugCode: currentDrug.code,
          });
        }
      }
      return acc;
    }, []);
  }, [chartData, drugsData]);

  const handleResistantTypeChange = (type: ResistantType) => {
    setResistantType(type);
  };

  // const handleTimePeriodChange = (value: number[]) => {
  //   setSelectedDates(value);
  // };

  const handleRegionChange = (value: Regions) => {
    setSelectedRegion(value);
  };

  const handleDataTypeChanged = (value: ChartDataType) => {
    setDataType(value);
  };

  const handleSelectDrugChange = (value: number) => {
    const selectedDrugData = drugsData.find((drug) => drug.drugId === value) as IDrug;
    setSelectedDrug(selectedDrugData);
  };

  return (
    <div css={wrapper}>
      <H1 style={header}>Resistance overview per drug</H1>
      <ButtonsGroup
        resistantType={resistantType}
        chartDataType={dataType}
        resistantTypeClick={handleResistantTypeChange}
        // setSelectedDates={handleTimePeriodChange}
        handleRegionChange={handleRegionChange}
        handleDataTypeChanged={handleDataTypeChanged}
        selectedRegion={selectedRegion}
        // selectedDates={selectedDates}
      />
      <ChartWrapper
        isLoading={isChartDataLoading}
        dataType={dataType}
        data={formattedChartData}
        selectedDrug={selectedDrug as IDrug}
        onClick={(data) => setSelectedDrug(data.drug || {})}
      />
      <DrugDescriptionWrapper
        handleSelectDrugChange={handleSelectDrugChange}
        drugs={drugsData}
        associations={genesAssociationsData}
        isLoadingAssociations={isAssociationLoading}
        selectedDrug={selectedDrug as IDrug}
      >
        <DataGrid<DrugTableColumns>
          isLoading={isTableDataLoading}
          columns={columns}
          dataSource={tableData}
          filterValues={filters}
          onFilterChange={updateFilters}
          onSortingChange={updateSort}
          selectedDropdownItem={selectedDrug}
          sortState={sortState}
          type={GridType.Drug}
        />
        <div css={pagination.wrapper}>
          <Pagination
            page={page}
            pageCount={Math.ceil(rowsCount / DEFAULT_PAGE_SIZE)}
            onPageClick={updatePaging}
          />
        </div>
      </DrugDescriptionWrapper>
    </div>
  );
};

export default DrugsView;
