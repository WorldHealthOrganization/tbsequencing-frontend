/** @jsxImportSource @emotion/react */
import React from 'react';
import { genesViewStyles } from './styles';
import AssociationTable, { LeftColumnButton } from '../AssociationTable';
import { IAssociationTableData } from '../AssociationTable/AssociationTable';

interface IGeneNotSelectedContentProps {
  isMostSearchLoading: boolean;
  isRecentSearchLoading: boolean;
  mostSearch: IAssociationTableData[]
  recentSearch: IAssociationTableData[],
  onGeneClick: (item: IAssociationTableData) => void
}

const GeneNotSelectedContent = ({
  isMostSearchLoading,
  mostSearch,
  isRecentSearchLoading,
  recentSearch,
  onGeneClick,
}: IGeneNotSelectedContentProps) => (
  <div css={genesViewStyles.tablesWrapper}>
    <AssociationTable
      isLoading={isMostSearchLoading}
      leftColumnItemComponent={LeftColumnButton}
      tableHeader="Most Searched"
      onClick={onGeneClick}
      data={mostSearch}
    />
    <AssociationTable
      isLoading={isRecentSearchLoading}
      leftColumnItemComponent={LeftColumnButton}
      tableHeader="Recently Searched"
      data={recentSearch}
      onClick={onGeneClick}
    />
  </div>
);

export default GeneNotSelectedContent;
