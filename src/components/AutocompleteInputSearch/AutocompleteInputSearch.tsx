/** @jsxImportSource @emotion/react */
import React from 'react';
import {
  Autocomplete, SxProps, TextField,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import { autocompleteClasses } from '@mui/material/Autocomplete';

import { IGene } from '../../services/genesApi/models';
import { ISearchCount } from '../../features/genesView/models';
import { notNil } from '../../utils/arrays';
import { tableStyles } from './styles';

interface IAutocompleteInputSearchProps {
  isLoading: boolean;
  style: SxProps;
  value?: string;
  options: IGene[] | ISearchCount[];
  onChange: (event: React.SyntheticEvent, value: string) => void;
  onSelectionChanged: (event: React.SyntheticEvent, value: IGene | null) => void;
  selectedValue: IGene | null;
  placeholder?: string;
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

export const AutocompleteInputSearch = ({
  style, options, onChange, onSelectionChanged, selectedValue, isLoading, value, placeholder = 'Search',
}: IAutocompleteInputSearchProps) => {
  const isEmpty = !value;

  return (
    <Autocomplete
      data-testid="autocomplete"
      popupIcon={<SearchIcon sx={tableStyles.filterIcon} />}
      renderOption={(props, option) => {
        if (isEmpty) {
          return (
            <li
              {...props}
              key={option.geneDbCrossrefId}
            >
              {option.geneName || option.locusTag}
            </li>
          );
        }

        const labelName = findProperLabel(value, option);

        return <li {...props} key={option.geneDbCrossrefId}>{labelName}</li>;
      }}
      getOptionLabel={(option) => (option.geneName || option.locusTag || '')}
      sx={{
        [`& .${autocompleteClasses.popupIndicator}`]: {
          transform: 'none',
        },
      }}
      renderInput={
        (params) => (
          <TextField
            sx={style}
            {...params}
            placeholder={placeholder}
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
      clearOnBlur={false}
    />
  );
};

export default AutocompleteInputSearch;
