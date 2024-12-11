/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import GenomeContextWrapper from '../GenomeContextWrapper';
import H2 from '../../../../components/typography/H2';
import AssociationTable, { LeftColumnButton } from '../AssociationTable';
import { container, genesViewStyles, gridContainerStyles } from './styles';
import GnomadVariants from '../../../../components/GnomadVariants';
import { IGene, IVariant } from '../../../../services/genesApi/models';
import {
  useGetGenesByIdQuery,
  useGetGenesTableDataQuery,
  useGetGenomeContextQuery,
} from '../../../../services/genesApi/genesApi';
import { useTableData } from '../../../drugsView/hooks/useTableData';
import DataGrid from '../../../../components/DataGrid';
import {
  GeneTableColumns,
  GridType,
  IColumn,
  ScrollType,
} from '../../../../components/DataGrid/models';
import { IVariantLocal } from '../../models';
import { formatDrugsTableGenesView, formatGenesOverviewData, getGenomeContextLength } from './utils';
import GeneOverview from '../GeneOverview';
import { IDrug, TableData } from '../../../../services/drugsApi/models';
import { IAssociationTableData } from '../AssociationTable/AssociationTable';
import { useNavigateWithParams } from '../../../../hooks/useNavigateWithParams';
import { useGetGeneAssociationsByIDQuery } from '../../../../services/drugsApi/drugsApi';

interface IGeneSelectedContentProps {
  selectedGene: IGene
}

const columns: IColumn<GeneTableColumns>[] = [
  { name: 'variantName', header: 'Variant' },
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

const columnsWithoutStats: IColumn<GeneTableColumns>[] = [
  { name: 'variantName', header: 'Variant' },
  { name: 'nucleodicAnnName', header: 'Nucleic Annotation' },
  { name: 'proteicAnnName', header: 'Proteic Annotation' },
  { name: 'consequence', header: 'Consequence' },
  { name: 'variantGrade', header: 'Grade' },
  { name: 'globalFrequency', header: 'Global Frequency' },
  { name: 'totalCounts', header: 'Total Samples' },
];

const GeneSelectedContent = ({ selectedGene }: IGeneSelectedContentProps) => {
  const navigate = useNavigateWithParams();
  const onClick = (item: IAssociationTableData) => {
    const params = new URLSearchParams({
      drugId: String(item.id),
      code: String(item.leftColValue),
      drugName: String(item.rightColValue),
    });
    navigate('/drugs', params);
  };

  const [selectedVariant, setSelectedVariant] = useState<IVariantLocal | {}>({});
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const [gridViewPortData, setGridViewPortData] = useState<number[]>([]);
  const [selectedResistantDrug, setSelectedResistantDrug] = useState<IDrug>();

  const { data: genesDetails, isLoading: isGeneDetailsLoading } = useGetGenesByIdQuery({
    geneDbCrossrefId: selectedGene.geneDbCrossrefId,
  });

  const { startPos, endPos } = getGenomeContextLength(genesDetails?.genesOverview);

  const { data: genomeContextData, isLoading: isGenomeContextLoading } = useGetGenomeContextQuery({
    startPos,
    endPos,
  }, { skip: !genesDetails?.genesOverview?.startPos || !genesDetails?.genesOverview?.endPos });

  const {
    data: associationsData,
    isLoading: isAssociationsLoading,
    isSuccess,
  } = useGetGeneAssociationsByIDQuery({
    geneDbCrossrefId: selectedGene.geneDbCrossrefId,
  });

  const {
    tableData = [],
    isTableDataLoading,
    filters,
    updateFilters,
  } = useTableData({
    useGetDataQuery: useGetGenesTableDataQuery,
    geneDbCrossrefId: selectedGene.geneDbCrossrefId,
    drugID: selectedResistantDrug?.drugId || associationsData?.[0]?.drugId,
    skipQuery: !isSuccess,
  });

  const drugsTableData = formatDrugsTableGenesView(associationsData);
  const genesOverviewFormattedData = formatGenesOverviewData(genesDetails?.genesOverview);

  useEffect(() => {
    const newActiveIndex = tableData.findIndex((data: TableData) => (
      data.variantName === (selectedVariant as IVariantLocal).variantName
    ));
    setActiveIndex(newActiveIndex);
  }, [tableData, selectedVariant]);

  const onVariantClick = (variant: any) => {
    setSelectedVariant(variant);
  };

  const onScroll = (visibleRowsRange: number[]) => {
    setGridViewPortData(visibleRowsRange);
  };

  const onChangeResistantDrug = (value: number) => {
    if (!associationsData?.length) return;
    const drug = associationsData.find((item) => item.drugId === value);
    setSelectedResistantDrug(drug);
  };

  return (
    <div css={container}>
      <GenomeContextWrapper
        selectedGene={genesDetails?.genesOverview}
        isLoading={isGenomeContextLoading}
        data={genomeContextData}
        maxDomain={endPos}
        minDomain={startPos}
      />
      <H2 style={genesViewStyles.overviewTitle}>Overview</H2>
      <div css={genesViewStyles.tablesWrapper}>
        <GeneOverview data={genesOverviewFormattedData} isLoading={isGeneDetailsLoading} />
        <AssociationTable
          tableHeader="Gene-drug resistance associations"
          data={drugsTableData}
          isLoading={isAssociationsLoading}
          leftColumnItemComponent={LeftColumnButton}
          onClick={onClick}
          noDataText="No associated data with this gene"
        />
      </div>
      <div css={genesViewStyles.gnomadWrapper}>
        <GnomadVariants
          selectedGene={selectedGene}
          variants={tableData as unknown as IVariant[]}
          isLoading={isTableDataLoading}
          variantsInTable={gridViewPortData}
          onClick={onVariantClick}
        />
      </div>
      <div css={genesViewStyles.gridWrapper}>
        <DataGrid<GeneTableColumns>
          containerStyles={gridContainerStyles}
          columns={associationsData?.length ? columns : columnsWithoutStats}
          isLoading={isTableDataLoading}
          filterValues={filters}
          onFilterChange={updateFilters}
          dataSource={tableData}
          selectedDropdownItem={selectedGene}
          selectedRow={activeIndex}
          type={GridType.Gene}
          scrollType={ScrollType.Infinite}
          resistantDrugs={associationsData}
          selectedResistantDrug={selectedResistantDrug || associationsData?.[0]}
          onChangeResistantDrug={onChangeResistantDrug}
          onScroll={onScroll}
        />
      </div>
    </div>
  );
};

export default GeneSelectedContent;
