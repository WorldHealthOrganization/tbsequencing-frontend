/** @jsxImportSource @emotion/react */
import React from 'react';
import {
  Autocomplete, SxProps, TextField,
} from '@mui/material';
import { IGene } from '../../services/genesApi/models';
import { ISearchCount } from '../../features/genesView/models';
import { notNil } from '../../utils/arrays';

interface IAutocompleteProps {
  isLoading: boolean;
  style: SxProps;
  value?: string;
  options: IGene[] | ISearchCount[];
  onChange: (event: React.SyntheticEvent, value: string) => void;
  onSelectionChanged: (event: React.SyntheticEvent, value: IGene | null) => void;
  selectedValue: IGene | null;
}

const findProperLabel = (input: string, option: IGene) => {
  const keyOptions = Object.values(option);
  const label = keyOptions
    .filter(notNil)
    .map((filterOption) => filterOption.toString())
    .find((keyOption) => keyOption.toString().toLocaleLowerCase()
      .includes(input.toLocaleLowerCase()));

  return label ? label.toString() : option.geneName || option.locusTag;
};

export const AutocompleteInput = ({
  style, options, onChange, onSelectionChanged, selectedValue, isLoading, value,
}: IAutocompleteProps) => {
  const isEmpty = !value;

  return (
    <Autocomplete
      data-testid="autocomplete"
      renderOption={(props, option) => {
        if (isEmpty) {
          return (
            <li
              {...props}
              key={option.geneDbCrossrefId}
            >
              {option.geneName}
            </li>
          );
        }

        const labelName = findProperLabel(value, option);

        return <li {...props} key={option.geneDbCrossrefId}>{labelName}</li>;
      }}
      getOptionLabel={(option) => (isEmpty ? option.geneName : findProperLabel(value, option))}
      renderInput={
        (params) => (
          <TextField
            sx={style}
            {...params}
            placeholder="Search for gene..."
          />
        )
      }
      onChange={onSelectionChanged}
      value={selectedValue}
      loading={isLoading}
      options={options as IGene[]}
      onInputChange={onChange}
      isOptionEqualToValue={() => true}
      filterOptions={((filterOptions) => filterOptions)}
      autoComplete
    />
  );
};

export default AutocompleteInput;
