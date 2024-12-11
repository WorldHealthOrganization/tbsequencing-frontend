/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import {
  InputAdornment,
  MenuItem, Popover, Select, TextField,
} from '@mui/material';
import { ColumnDef } from '@tanstack/react-table';
import CloseIcon from '@mui/icons-material/Close';
import { headerFilterContainer, headerFilterStyles } from './styles';
// import H3 from '../typography/H3';
// import PrimaryText from '../typography/PrimaryText';
// import { AppButton } from '../AppButton/AppButton';
import { GridType, IColumnFilter } from './models';
import { setRecentFiltersToLS } from '../../utils/setRecentFiltersToLS';

interface IHeaderFilterProps<T> {
  anchorEl: HTMLElement | null
  closeDropDown: () => void;
  onApplyFilter: (e: { value: string, column: ColumnDef<T> }) => void;
  columnData: ColumnDef<T>;
  columnFilters: IColumnFilter[];
  type: GridType;
}

interface ITextFilter {
  onSubmit: (value: string) => void;
  value: string;
  onChange: (value: string) => void;
}

interface ISelectFilter {
  value: string
  box: { value:string, text:string }[]
  onChange: (value: string) => void;
}

const selectBoxDataConsequence = [
  { value: 'upstream_gene_variant', text: 'Upstream' },
  { value: 'synonymous_variant', text: 'Synonymous' },
  { value: 'missense_variant', text: 'Missense' },
  { value: 'ins-del', text: 'Insertion/deletion' },
  { value: 'start_lost', text: 'Start lost' },
  { value: 'frameshift_variant', text: 'Frameshift' },
  { value: 'stop_gained', text: 'Stop gained' },
  { value: 'other', text: 'Other' },
];

const selectBoxDataGrade = [
  { value: '1', text: '1 — Associated with resistance' },
  { value: '2', text: '2 — Associated with resistance interim' },
  { value: '3', text: '3 — Uncertain association' },
  { value: '4', text: '4 — Not associated with resistance Interim' },
  { value: '5', text: '5 — Not associated with resistance' },
  { value: 'Ungraded', text: 'Ungraded' },
];

const TextFilter = ({ onSubmit, value, onChange }: ITextFilter) => (
  <TextField
    onKeyPress={({ key }) => {
      if (key === 'Enter') {
        onSubmit(value);
      }
    }}
    variant="standard"
    value={value}
    onChange={(e) => onChange(e.target.value)}
    aria-label="header-filter-input"
    InputProps={{
      endAdornment: (
        <InputAdornment position="end">
          {value && <CloseIcon data-testid="clear-filter-icon" onClick={() => onSubmit('')} sx={headerFilterStyles.clearFilterIcon} />}
        </InputAdornment>
      ),
    }}
  />
);

const SelectFilter = ({ value, box, onChange }: ISelectFilter) => (
  <Select
    sx={headerFilterStyles.selectBox}
    variant="outlined"
    value={value}
    onChange={(e) => {
      onChange(e.target.value);
    }}
    endAdornment={(
      <InputAdornment position="end">
        {value && (
        <CloseIcon
          onClick={() => onChange('')}
          sx={headerFilterStyles.selectClearFilterIcon}
        />
        )}
      </InputAdornment>
    )}
  >
    {box!.map((
      data,
    ) => (
      <MenuItem
        key={data.value}
        value={data.value}
      >
        {data.text}
      </MenuItem>
    ))}
  </Select>
);

const HeaderFilter = <T extends unknown>({
  anchorEl, closeDropDown, onApplyFilter, columnData, columnFilters, type,
}: IHeaderFilterProps<T>) => {
  const lsKey = `${type}-recent-saved-filters`;
  const initialFilterValue = columnFilters.find(({ id }) => id === columnData.id);
  const [inputValue, setInputValue] = useState<string>(initialFilterValue?.value as string || '');

  // const latestFiltersRequests = JSON.parse(localStorage.getItem(lsKey) || '{}');

  // const currentColumnLatestRequests = latestFiltersRequests[columnData?.id || 0];
  // TODO change to normal prop

  const applyMode = columnData.id === 'consequence' ? 'onClose' : 'onEnterPress';

  const handleSubmit = (value: string) => {
    onApplyFilter({
      value,
      column: columnData,
    });
    if (value !== '') {
      setRecentFiltersToLS(lsKey, value, columnData?.id);
    }
    if (applyMode === 'onEnterPress') {
      closeDropDown();
    }
  };

  const renderContent = () => {
    if (columnData.id === 'consequence') {
      return (
        <SelectFilter
          value={inputValue}
          box={selectBoxDataConsequence}
          onChange={(value) => {
            handleSubmit(value);
            closeDropDown();
          }}
          aria-label="header-filter-input"
        />
      );
    }
    if (columnData.id === 'variantGrade') {
      return (
        <SelectFilter
          value={inputValue}
          box={selectBoxDataGrade}
          onChange={(value) => {
            handleSubmit(value);
            closeDropDown();
          }}
          aria-label="header-filter-input"
        />
      );
    }

    return (
      <TextFilter
        onSubmit={handleSubmit}
        value={inputValue}
        onChange={(value) => setInputValue(value)}
        aria-label="header-filter-input"
      />
    );
  };

  return (
    <Popover
      sx={headerFilterStyles}
      open={!!anchorEl}
      onClose={() => {
        if (applyMode === 'onClose') {
          handleSubmit(inputValue);
        }
        closeDropDown();
      }}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
    >
      <div css={headerFilterContainer.container}>
        <div>
          {renderContent()}
        </div>

        {/* {currentColumnLatestRequests?.length && columnData.id !== 'consequence'
          ? (
            <div>
              <H3 style={headerFilterContainer.recentlyHeader}>Recently searched</H3>
              <div css={headerFilterContainer.recentlyContainer}>
                {currentColumnLatestRequests.map((item: string) => (
                  <AppButton
                    key={item}
                    variant="text"
                    onClick={() => {
                      setInputValue(item);
                      handleSubmit(item);
                    }}
                    style={headerFilterContainer.recentlyButton}
                    size="small"
                  >
                    <PrimaryText style={headerFilterContainer.recentlyText}>{item}</PrimaryText>
                  </AppButton>
                ))}
              </div>
            </div>
          ) : null} */}
      </div>

    </Popover>
  );
};

export default HeaderFilter;
