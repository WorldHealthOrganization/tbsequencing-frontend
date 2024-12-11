/** @jsxImportSource @emotion/react */
import React, { memo } from 'react';
import {
  getCoreRowModel, useReactTable, createColumnHelper, flexRender,
} from '@tanstack/react-table';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import * as styles from './styles';
import { IPackage } from '../../../../../../services/submissionApi/models';
import ActivityIndicator from '../../../../../../components/ActivityIndicator';
import PackageDataGridCell from '../../../PackagePage/components/PackageDataGridCell';
import AppPaper from '../../../../../../components/AppPaper';
import AppButton from '../../../../../../components/AppButton';
import { useDrawerApi } from '../../../../../drawer/hooks/useDrawerApi';
import { openChatBtn } from './styles';

interface Props {
  packages?: IPackage[]
  loading: boolean;
}

const columnHelper = createColumnHelper<IPackage>();

const OpenPackageCell = ({ pk }: { pk: number }) => {
  const navigate = useNavigate();

  return (
    <AppButton
      variant="outlined"
      size="small"
      onClick={() => {
        const url = `/data-submission/${pk}`;

        navigate(url);
      }}
    >
      Open
    </AppButton>
  );
};

const OpenChatCell = ({
  packageId,
  chatDisabled,
}: { packageId: number, chatDisabled: boolean }) => {
  const { toggleDrawer, setDrawerContent } = useDrawerApi();

  return (
    <AppButton
      disabled={chatDisabled}
      variant="outlined"
      style={openChatBtn}
      size="small"
      onClick={() => {
        setDrawerContent<{ packageId: number }>('chat', { packageId });
        toggleDrawer();
      }}
    >
      Chat
    </AppButton>
  );
};

const columns = [
  columnHelper.accessor('name', {
    header: 'Package name',
  }),
  columnHelper.accessor('description', {
    header: 'Description',
  }),
  columnHelper.accessor('pk', {
    header: 'Package ID',
  }),
  columnHelper.accessor('state', {
    header: 'Status',
  }),
  columnHelper.accessor('sampleAliasesCount', {
    header: 'Samples',
  }),
  columnHelper.accessor('pdsTestsCount', {
    header: 'pDST',
  }),
  columnHelper.accessor('micTestsCount', {
    header: 'MIC',
  }),
  columnHelper.accessor('sequencingDataCount', {
    header: 'Sequencing Data',
  }),
  columnHelper.accessor('messagesCount', {
    header: 'Messages',
  }),
  columnHelper.accessor('pk', {
    cell: ({ getValue, row }) => {
      const { original } = row;
      const chatDisabled = original.state === 'ACCEPTED';

      return <OpenChatCell chatDisabled={chatDisabled} packageId={getValue()} />;
    },
    header: '',
  }),
  columnHelper.accessor('pk', {
    cell: (cellContext) => (
      <OpenPackageCell pk={cellContext.getValue()} />
    ),
    header: '',
  }),
];

export const SubmissionPackageListTable = ({ packages, loading }: Props) => {
  const instance = useReactTable({
    // @ts-ignore
    data: packages || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const navigate = useNavigate();

  if (loading) {
    return <ActivityIndicator centered />;
  }

  if (!packages) {
    return null;
  }

  return (
    <AppPaper style={styles.container}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {instance.getFlatHeaders().map((header) => (
                <TableCell key={header.column.columnDef.id} css={styles.tableHeaderCell}>
                  {
                  flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )
}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {instance.getRowModel().rows.map((row) => (
              <TableRow>
                {row.getVisibleCells().map((
                  cell,
                ) => (
                  <PackageDataGridCell>
                    {flexRender(cell.column.columnDef.cell, { navigate, ...cell.getContext() })}
                  </PackageDataGridCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </AppPaper>
  );
};

export default memo(SubmissionPackageListTable);
