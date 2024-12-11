/** @jsxImportSource @emotion/react */
import React, { ReactElement } from 'react';
import {
  FormControl, FormControlLabel, Radio, RadioGroup,
} from '@mui/material';
import { SerializedStyles } from '@emotion/react';
import { match } from 'ts-pattern';
import * as styles from './styles';
import { Regions } from '../../features/drugsView/models';

type RadioGroupVariants = 'singleCol' | 'doubleCol';

export interface IRadioGroupItem {
  value?: Regions | number | string;
  label: string;
}

interface Props {
  onChange: (value: any) => void;
  items: IRadioGroupItem[]
  selectedValue: Regions | number | string;
  style?: SerializedStyles;
  variant: RadioGroupVariants;
}

interface IContentProps {
  items: IRadioGroupItem[]
}

const SingleColContent = ({ items }: IContentProps) => (
  <>
    {items.map((item, index) => {
      const sxStyle = index === 0
        ? styles.sxRadioGroupFirst
        : styles.sxRadioGroup;

      return (
        <FormControlLabel
          sx={sxStyle}
          key={item.value}
          name="all"
          value={item.value}
          control={<Radio />}
          label={item.label}
        />
      );
    })}
  </>
);

const DoubleColContent = ({ items }: IContentProps) => (
  <>
    {items.map((item) => (
      <div css={styles.halfWidth}>
        <FormControlLabel
          sx={styles.sxRadioGroup}
          key={item.value}
          name="all"
          value={item.value}
          control={<Radio />}
          label={item.label}
        />
      </div>
    ))}
  </>
);

export const AppRadioGroup = ({
  selectedValue, onChange, items, style, variant,
}: Props) => {
  const content = match<RadioGroupVariants, ReactElement>(variant)
    .with('singleCol', () => <SingleColContent items={items} />)
    .with('doubleCol', () => <DoubleColContent items={items} />)
    .exhaustive();

  return (
    <div css={styles.radioGrouop}>
      <FormControl>
        <RadioGroup
          css={style}
          name="controlled-radio-buttons-group"
          onChange={(e) => {
            onChange(e.target.value);
          }}
          value={selectedValue}
        >
          {content}
        </RadioGroup>
      </FormControl>
    </div>
  );
};

export default AppRadioGroup;
