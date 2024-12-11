/** @jsxImportSource @emotion/react */
import React, { ReactNode } from 'react';
import {
  header, contentWrapper, descriptionWrapper, associationTable,
} from './styles';
import { GeneAssociationGroupedData, IDrug } from '../../../../services/drugsApi/models';
import AssociationTableGrouped, { LeftColumnButton } from '../../../genesView/components/AssociationTableGrouped';
import { useNavigateWithParams } from '../../../../hooks/useNavigateWithParams';
import {
  IAssociationTableDataGrouped,
} from '../../../genesView/components/AssociationTableGrouped/AssociationTableGrouped';
import { formatResistantDataGrouped } from '../../../genesView/components/GenesView/utils';
import DrugsDropdown from './DrugsDropdown';

interface IDrugDescriptionWrapperProps {
  selectedDrug: IDrug;
  associations?: GeneAssociationGroupedData[];
  handleSelectDrugChange: (id: number) => void;
  isLoadingAssociations: boolean;
  drugs: IDrug[];
  children: ReactNode;
}

const DrugDescriptionWrapper = ({
  selectedDrug,
  associations,
  isLoadingAssociations,
  drugs,
  handleSelectDrugChange,
  children,
}: IDrugDescriptionWrapperProps) => {
  const navigate = useNavigateWithParams();
  const formattedAssociationData = formatResistantDataGrouped(associations);

  const onGeneClick = (item: IAssociationTableDataGrouped) => {
    const params = new URLSearchParams({
      geneDbCrossrefId: String(item.id),
      geneName: String(item.leftColValue),
    });
    navigate('/genes', params);
  };

  return (
    <div>
      {selectedDrug?.drugName
      && (
        <>
          <div css={header}>
            <DrugsDropdown
              onChange={handleSelectDrugChange}
              items={drugs}
              value={selectedDrug}
              variant="outlined"
              size="large"
            />
          </div>
          <div css={contentWrapper}>
            <div css={descriptionWrapper}>
              <AssociationTableGrouped
                tableHeader="Gene-drug resistance associations"
                containerStyles={associationTable}
                isLoading={isLoadingAssociations}
                data={formattedAssociationData}
                onClick={onGeneClick}
                leftColumnItemComponent={LeftColumnButton}
                noDataText="No associated data with this drug"
              />
            </div>
            {children}
          </div>
        </>
      )}
    </div>
  );
};

export default DrugDescriptionWrapper;
