/** @jsxImportSource @emotion/react */
import React from 'react';
import { match } from 'ts-pattern';
import { createColumnHelper } from '@tanstack/react-table';
import { IDataSample, IVerdict, MatchSource } from '../../../../../../../../services/submissionApi/models';
import PrimaryText from '../../../../../../../../components/typography/PrimaryText';
import { Nullable } from '../../../../../../../../models/tsHelpers';
import EditableSampleName from '../../../EditableSampleName';
import ResistanceFileVerdict from '../../../ResistanceFileVerdict';

type TableHeaderCellProps = {
  label: string;
};

const columnHelper = createColumnHelper<IDataSample>();

const TableHeaderCell = ({ label }: TableHeaderCellProps) => (
  <PrimaryText>{label}</PrimaryText>
);

export const getTableColumns = (packageId: number, controlsDisabled: boolean) => [
  columnHelper.accessor('name', {
    cell: ({ row, getValue }) => {
      const name = getValue();
      const sampleId = row.original.pk;

      return (
        <EditableSampleName
          controlsDisabled={controlsDisabled}
          packageId={packageId}
          sampleId={sampleId}
          name={name}
        />
      );
    },
    header: () => <TableHeaderCell label="Sample Name" />,
  }),
  columnHelper.accessor('verdicts', {
    cell: ({ getValue }) => {
      const verdicts = getValue();

      if (!verdicts || verdicts.length === 0) {
        return null;
      }

      const verdict = verdicts[0] as IVerdict;
      // as we have always one verdict we have to take single verdict

      if (!verdict) {
        return null;
      }

      return (
        <ResistanceFileVerdict verdict={verdict} />
      );
    },
    header: () => <TableHeaderCell label="Verdicts" />,
  }),
  columnHelper.accessor('fastqPrefix', {
    cell: ({ getValue }) => {
      const prefix = getValue() as string;

      return <PrimaryText>{prefix}</PrimaryText>;
    },
    header: () => <TableHeaderCell label="FastQ prefix" />,
  }),
  columnHelper.accessor('matchSource', {
    cell: ({ getValue }) => {
      const matchSource = getValue();
      const cellLabel = match<Nullable<MatchSource>, string>(matchSource)
        .with(null, () => '')
        .with('NO_MATCH', () => 'Match not found')
        .with('NCBI', () => 'Matched with NCBI/EBI data')
        .with('FASTQ_EXISTING', () => 'Matched with existing FASTQ')
        .with('FASTQ_UPLOADED', () => 'Matched with uploaded FASTQ')
        .with('FASTQ_UPLOADED_NEW_SAMPLE', () => 'New sample created from uploaded FASTQ')
        .with('USER_ALIAS', () => 'Matched with sample previously uploaded by yourself')
        .with('NCBI_FASTQ', () => 'Existing FASTQ file at NCBI/EBI')
        .exhaustive();

      return <PrimaryText>{cellLabel}</PrimaryText>;
    },
    header: () => <TableHeaderCell label="Match source" />,
  }),
];
