/** @jsxImportSource @emotion/react */

import React from 'react';
import { SerializedStyles } from '@emotion/react';
import AppPaper from '../../../../components/AppPaper';
import H3 from '../../../../components/typography/H3';
import { associationTableStyles } from './styles';
import AppButton from '../../../../components/AppButton';
import LoadingWrapper from '../../../../components/LoadingWrapper';

export interface IAssociationTableDataGrouped {
  id: number;
  leftColValue: number | string;
  tier: number;
}

interface IAssociationTableProps {
  leftColumnItemComponent?: React.FC<{
    item: IAssociationTableDataGrouped, onClick?: (value: IAssociationTableDataGrouped) => void
  }>;
  tableHeader?: string;
  data?: IAssociationTableDataGrouped[];
  onClick?: (value: IAssociationTableDataGrouped) => void;
  isLoading: boolean;
  containerStyles?: SerializedStyles | {}
  noDataText?: string;
}

interface ILeftColumnButtonProps {
  item: IAssociationTableDataGrouped,
  onClick?: (value: IAssociationTableDataGrouped) => void;
}

export const LeftColumnButton = ({ item, onClick }: ILeftColumnButtonProps) => (
  <AppButton
    style={associationTableStyles.leftColumn}
    size="small"
    onClick={() => typeof onClick === 'function' && onClick(item)}
    variant="text"
    underlined
  >
    {item.leftColValue}
  </AppButton>
);

const DefaultLeftColumnItem = ({ text }: { text?: string }) => (
  <H3 style={associationTableStyles.defaultColumn}>{text}</H3>
);

const AssociationTableGrouped = ({
  tableHeader,
  data,
  leftColumnItemComponent,
  onClick,
  isLoading,
  containerStyles = {},
  noDataText = 'No data',
}: IAssociationTableProps) => {
  const LeftColumnItem = leftColumnItemComponent || DefaultLeftColumnItem;
  const tierOneData = data?.length && data.filter((gene) => gene.tier === 1);
  const tierTwoData = data?.length && data.filter((gene) => gene.tier === 2);

  return (
    <AppPaper style={{
      ...associationTableStyles.paper,
      ...containerStyles,
    }}
    >
      <div>
        {tableHeader && <H3>{tableHeader}</H3>}
      </div>
      {!!tierOneData && <H3 style={associationTableStyles.tierTitle}>Tier 1</H3>}
      <LoadingWrapper isLoading={isLoading} centered>
        <div css={associationTableStyles.itemsContainer}>
          {!data?.length ? noDataText
            : data.filter((gene) => gene.tier === 1).map((item) => (
              <div key={item.id} css={associationTableStyles.singlePair}>
                <LeftColumnItem item={item} onClick={onClick} />
              </div>
            ))}
        </div>
      </LoadingWrapper>
      {!!tierTwoData && <H3 style={associationTableStyles.tierTitle}>Tier 2</H3>}
      <LoadingWrapper isLoading={isLoading} centered>
        <div css={associationTableStyles.itemsContainer}>
          {!data?.length ? noDataText
            : data.filter((gene) => gene.tier === 2).map((item) => (
              <div key={item.id} css={associationTableStyles.singlePair}>
                <LeftColumnItem item={item} onClick={onClick} />
              </div>
            ))}
        </div>
      </LoadingWrapper>
    </AppPaper>
  );
};

export default AssociationTableGrouped;
