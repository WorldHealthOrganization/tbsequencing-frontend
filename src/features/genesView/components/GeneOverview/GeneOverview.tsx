/** @jsxImportSource @emotion/react */
import React from 'react';
import AppPaper from '../../../../components/AppPaper';
import { associationTableStyles } from '../AssociationTable/styles';
import H3 from '../../../../components/typography/H3';
import { IGenesOverviewTableData } from '../../models';
import LoadingWrapper from '../../../../components/LoadingWrapper';

interface IGeneOverviewProps {
  data: IGenesOverviewTableData[];
  tableHeader?: string;
  isLoading: boolean
}

interface IGeneOverviewContentProps {
  data: IGenesOverviewTableData[]
}

const GeneOverviewContent = ({ data }: IGeneOverviewContentProps) => {
  if (!data.length) return <div>No data</div>;
  return (
    <>
      {data.map(({ title, value, element }) => {
        if (value) {
          return (
            <div key={title} css={associationTableStyles.singlePair}>
              <H3 style={associationTableStyles.defaultColumn}>{title}</H3>
              <H3 style={associationTableStyles.rightColumnText}>{element || value}</H3>
            </div>
          );
        }
        return null;
      })}
    </>
  );
};

const GeneOverview = ({ data, tableHeader, isLoading }: IGeneOverviewProps) => (
  <AppPaper style={associationTableStyles.paper}>
    <div>
      {tableHeader && <H3>{tableHeader}</H3>}
    </div>
    <LoadingWrapper isLoading={isLoading} centered>
      <GeneOverviewContent data={data} />
    </LoadingWrapper>
  </AppPaper>
);

export default GeneOverview;
