/** @jsxImportSource @emotion/react */

import React from 'react';
import { SerializedStyles } from '@emotion/react';
import AppPaper from '../../../../components/AppPaper';
import H3 from '../../../../components/typography/H3';
import { associationTableStyles } from './styles';
import AppButton from '../../../../components/AppButton';
import LoadingWrapper from '../../../../components/LoadingWrapper';

export interface IAssociationTableData {
  id: number;
  leftColValue: number | string;
  rightColValue: number | string;
}

interface IAssociationTableProps {
  leftColumnItemComponent?: React.FC<{
    item: IAssociationTableData, onClick?: (value: IAssociationTableData) => void
  }>;
  tableHeader?: string;
  data?: IAssociationTableData[];
  onClick?: (value: IAssociationTableData) => void;
  isLoading: boolean;
  containerStyles?: SerializedStyles | {}
  noDataText?: string;
}

interface ILeftColumnButtonProps {
  item: IAssociationTableData,
  onClick?: (value: IAssociationTableData) => void;
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

const AssociationTable = ({
  tableHeader,
  data,
  leftColumnItemComponent,
  onClick,
  isLoading,
  containerStyles = {},
  noDataText = 'No data',
}: IAssociationTableProps) => {
  const LeftColumnItem = leftColumnItemComponent || DefaultLeftColumnItem;
  return (
    <AppPaper style={{
      ...associationTableStyles.paper,
      ...containerStyles,
    }}
    >
      <div>
        {tableHeader && <H3>{tableHeader}</H3>}
      </div>
      <LoadingWrapper isLoading={isLoading} centered>
        <div css={associationTableStyles.itemsContainer}>
          {!data?.length ? noDataText
            : data.map((item) => (
              <div key={item.id} css={associationTableStyles.singlePair}>
                <LeftColumnItem item={item} onClick={onClick} />
                <H3 style={associationTableStyles.rightColumnText}>
                  {item.rightColValue}
                </H3>
              </div>
            ))}
        </div>
      </LoadingWrapper>
    </AppPaper>
  );
};

export default AssociationTable;
