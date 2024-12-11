/** @jsxImportSource @emotion/react */
import React, { useMemo, useState } from 'react';
import {
  ExpandedState, flexRender, getCoreRowModel, getExpandedRowModel, useReactTable,
} from '@tanstack/react-table';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
} from '@mui/material';
import { IDataSample, ResistanceSampleType } from '../../../../../../../../services/submissionApi/models';
import PackageDataGridCell from '../../../PackageDataGridCell';
import ResistanceDataSamplesHeaderRow from '../ResistanceDataHeaderRow';
import { getTableColumns } from './tableConfig';
import * as styles from '../../../../../SubmissionPackageList/components/SubmissionPackageListTable/styles';

interface Props {
  samplesData: IDataSample[];
  title: string;
  packageId: number;
  controlsDisabled: boolean;
  activeTab: ResistanceSampleType;
}

export const ResistanceDataTable = ({
  samplesData, title, packageId, controlsDisabled, activeTab,
}: Props) => {
  const [expanded, setExpanded] = useState<ExpandedState>(true);
  const tableColumns = useMemo(() => getTableColumns(
    packageId,
    controlsDisabled,
  ), [packageId, controlsDisabled, activeTab]);

  const instance = useReactTable({
    data: samplesData,
    columns: tableColumns,
    getCoreRowModel: getCoreRowModel(),
    onExpandedChange: setExpanded,
    getExpandedRowModel: getExpandedRowModel(),
    state: {
      expanded,
    },
  });

  if (!samplesData) {
    return null;
  }

  const handleExpandClick = () => {
    instance.toggleAllRowsExpanded();
  };

  return (
    <>
      <ResistanceDataSamplesHeaderRow
        onExpandClick={handleExpandClick}
        title={title}
        totalItems={samplesData.length}
      />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {instance.getFlatHeaders().map((header) => {
                if (expanded !== true) {
                  return null;
                }

                return (
                  <TableCell key={header.column.columnDef.id} css={styles.tableHeaderCell}>
                    {
                      flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )
                    }
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {instance.getRowModel().rows.map((row) => {
              const isExpanded = row.getIsExpanded();

              if (!isExpanded) {
                return null;
              }

              return (
                <TableRow>
                  {
                    row.getVisibleCells().map((cell) => (
                      <PackageDataGridCell>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </PackageDataGridCell>
                    ))
                  }
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ResistanceDataTable;
