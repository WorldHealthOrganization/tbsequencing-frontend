/** @jsxImportSource @emotion/react */
import React from 'react';
import { Popover } from '@mui/material';
import * as styles from './styles';
import AppPaper from '../../../../components/AppPaper';
import H2 from '../../../../components/typography/H2';
import { ResistantType } from '../../../drugsView/models';
import { AppButton } from '../../../../components/AppButton/AppButton';
import PrimaryText from '../../../../components/typography/PrimaryText';
import TooltipContent from '../../../../components/TooltipContent';

export interface Props {
  title: string;
  opened: boolean;
  top: number;
  left: number
  resistantType: ResistantType;
  totalSamples: number;
  susceptibleQuantity: number;
  susceptibleRatio: string;
  resistantQuantity: number;
  resistantRatio: string;
  intermediateQuantity: number;
  intermediateRatio: string;
  shouldRenderColorLegend: boolean;
  setResistantType: (resistantType: ResistantType) => void;

}

export interface AggregatedProps extends Props {
  onClose: () => void;
}

export const MapTooltip = ({
  opened, top, left, title,
  resistantType,
  totalSamples,
  susceptibleQuantity,
  susceptibleRatio,
  resistantQuantity,
  resistantRatio,
  intermediateQuantity,
  intermediateRatio,
  shouldRenderColorLegend,
  setResistantType,
  onClose,
}: AggregatedProps) => {
  const anchorPosition = { top, left };

  return (
    <Popover
      onClose={onClose}
      sx={styles.paperSx}
      elevation={0}
      anchorReference="anchorPosition"
      anchorPosition={anchorPosition}
      open={opened}
    >
      <AppPaper style={styles.paper}>
        <H2 style={styles.header}>{title}</H2>
        <div css={styles.buttonsContainer}>
          <PrimaryText style={[styles.label]}>Resistance to</PrimaryText>
          <AppButton
            onClick={() => setResistantType(ResistantType.Phenotypic)}
            style={styles.phenoBtn}
            size="small"
            variant={resistantType === ResistantType.Phenotypic ? 'contained' : 'outlined'}
          >
            Pheno
          </AppButton>
          <AppButton
            onClick={() => setResistantType(ResistantType.Genotypic)}
            style={styles.genoBtn}
            size="small"
            variant={resistantType === ResistantType.Genotypic ? 'contained' : 'outlined'}
          >
            Geno
          </AppButton>
        </div>
        <TooltipContent
          susceptibleQuantity={susceptibleQuantity}
          susceptibleRatio={susceptibleRatio}
          shouldRenderColorLegend={shouldRenderColorLegend}
          resistantQuantity={resistantQuantity}
          resistantRatio={resistantRatio}
          intermediateQuantity={intermediateQuantity}
          intermediateRatio={intermediateRatio}
          totalSamples={totalSamples}
        />
      </AppPaper>
    </Popover>
  );
};

export default MapTooltip;
