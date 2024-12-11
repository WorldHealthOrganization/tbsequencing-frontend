/** @jsxImportSource @emotion/react */
import React, { ReactElement } from 'react';
import { match } from 'ts-pattern';
import { DangerousOutlined, InfoOutlined, WarningAmberOutlined } from '@mui/icons-material';
import * as styles from './styles';
import { IVerdict, VerdictLevel } from '../../../../../../services/submissionApi/models';
import PrimaryText from '../../../../../../components/typography/PrimaryText';

interface Props {
  verdict: IVerdict;
}

export const ResistanceFileVerdict = ({
  verdict: { verdict, level },
}: Props) => {
  const icon = match<VerdictLevel, ReactElement>(level)
    .with('info', () => <InfoOutlined sx={styles.infoIconSx} />)
    .with('warning', () => <WarningAmberOutlined sx={styles.warningIconSx} />)
    .with('error', () => <DangerousOutlined sx={styles.errorIconSx} />)
    .exhaustive();

  return (
    <div css={styles.container}>
      {icon}
      <PrimaryText style={styles.label}>{verdict}</PrimaryText>

    </div>
  );
};

export default ResistanceFileVerdict;
