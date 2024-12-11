/** @jsxImportSource @emotion/react */
import React from 'react';
import { Popover } from '@mui/material';
import * as styles from './styles';
// import AppPaper from '../../../../components/AppPaper';
import H2 from '../../../../components/typography/H2';
// import { ResistantType } from '../../../drugsView/models';
// import { AppButton } from '../../../../components/AppButton/AppButton';
// import PrimaryText from '../../../../components/typography/PrimaryText';
// import TooltipContent from '../../../../components/TooltipContent';

export interface Props {
  opened: boolean;
  top: number;
  left: number
  // shouldRenderColorLegend: boolean;
}

// export interface AggregatedProps extends Props {
//   onClose: () => void;
// }

export const InfoTooltip = ({
  opened,
  top,
  left,
  // resistantType,
  // totalSamples,
  // susceptibleQuantity,
  // susceptibleRatio,
  // resistantQuantity,
  // resistantRatio,
  // intermediateQuantity,
  // intermediateRatio,
  // shouldRenderColorLegend,
  // setResistantType,
}: Props) => {
  const anchorPosition = { top, left };

  return (
    <Popover
      sx={styles.paperSx}
      elevation={0}
      anchorReference="anchorPosition"
      anchorPosition={anchorPosition}
      open={opened}
    >
      <H2 style={styles.header}>Awesome</H2>

    </Popover>
  );
};

export default InfoTooltip;
