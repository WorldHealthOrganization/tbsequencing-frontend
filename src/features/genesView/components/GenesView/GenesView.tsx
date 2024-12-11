/** @jsxImportSource @emotion/react */
import React, { SyntheticEvent, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import BasePage from '../../../../components/BasePage';
import AppPaper from '../../../../components/AppPaper';
import AutocompleteInput from '../../../../components/AutocompleteInput';
import { genesViewStyles } from './styles';
import H3 from '../../../../components/typography/H3';
import {
  useGetMostSearchHistoryQuery,
  useGetRecentSearchHistoryQuery,
} from '../../../../services/genesApi/genesApi';
import { useAutocompleteQuery } from '../../hooks/useAutocompleteQuery';
import { useDebounce } from '../../../../hooks/useDebounce';
import GeneNotSelectedContent from './GeneNotSelectedContent';
import GeneSelectedContent from './GeneSelectedContent';
import { IGene } from '../../../../services/genesApi/models';
import { formatMostSearch, formatRecentlySearch } from './utils';

const GenesView = () => {
  const [searchParams] = useSearchParams();

  const defaultGene: IGene = {
    geneDbCrossrefId: Number(searchParams.get('geneDbCrossrefId')),
    geneName: searchParams.get('geneName'),
    locusTag: null,
    id: Number(searchParams.get('geneDbCrossrefId')),
    endPos: 1,
    startPos: 0,
    strand: -1,
  };

  const [inputValue, setInputValue] = useState('');
  const [
    selectedValue,
    setSelectedValue,
  ] = useState<IGene | null>(defaultGene.geneDbCrossrefId ? defaultGene : null);
  const debouncedValue = useDebounce<string>(inputValue, 500);

  const {
    data: mostSearch = [],
    isLoading: isMostSearchLoading, refetch: mostSearchHistoryRefetch,
  } = useGetMostSearchHistoryQuery(undefined, { refetchOnMountOrArgChange: true });

  const {
    data: recentSearch = [],
    isLoading: isRecentSearchLoading, refetch: resentSearchRefetch,
  } = useGetRecentSearchHistoryQuery(undefined, { refetchOnMountOrArgChange: true });

  const {
    data: genes = [], fetchData, isLoading,
  } = useAutocompleteQuery();

  const getOptions = () => {
    const inputEmpty = !inputValue;
    const mostSearchedData = mostSearch
      .slice(-10)
      .sort((prev, next) => next.counter - prev.counter);

    return inputEmpty ? mostSearchedData : genes;
  };

  const options = getOptions();

  const recentSearchLocal = formatRecentlySearch(recentSearch);
  const mostSearchLocal = formatMostSearch(mostSearch);

  const handleInputChange = (e: SyntheticEvent, value: string) => {
    setInputValue(value);
  };

  useEffect(() => {
    if (debouncedValue !== '') {
      fetchData({ search: debouncedValue });
    }
  }, [debouncedValue]);

  const patchedSelectedGene = genes.length === 1
    ? { ...selectedValue, ...genes[0] }
    : selectedValue;

  return (
    <BasePage pageHeader="Gene View">
      <AppPaper>
        <div css={genesViewStyles.autoCompleteContainer}>
          <AutocompleteInput
            isLoading={isLoading}
            onSelectionChanged={(e, value) => {
              if (value === null) {
                mostSearchHistoryRefetch();
                resentSearchRefetch();
              }

              setSelectedValue(value);
            }}
            selectedValue={selectedValue}
            onChange={handleInputChange}
            value={inputValue}
            options={options}
            style={genesViewStyles.sxAutoComplete}
          />
          <H3
            style={genesViewStyles.autoCompleteInputLabel}
          >
            Search Genes by Gene Symbol, NCBI ID or Locus Tag
          </H3>
        </div>
      </AppPaper>
      {
        !selectedValue
          ? (
            <GeneNotSelectedContent
              isMostSearchLoading={isMostSearchLoading}
              isRecentSearchLoading={isRecentSearchLoading}
              mostSearch={mostSearchLocal}
              recentSearch={recentSearchLocal}
              onGeneClick={(item) => {
                setSelectedValue({
                  endPos: 0,
                  startPos: 0,
                  strand: -1,
                  id: item.id,
                  geneDbCrossrefId: item.id,
                  geneName: item.leftColValue as string,
                  locusTag: item.leftColValue as string,
                });
              }}
            />
          )
          : <GeneSelectedContent selectedGene={(patchedSelectedGene) as IGene} />
      }
    </BasePage>
  );
};

export default GenesView;
