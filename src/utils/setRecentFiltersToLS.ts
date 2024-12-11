export const LATEST_FILTERS_LS_KEY_DRUGS = 'latest-filters-requests-drugs';
export const LATEST_FILTERS_LS_KEY_GENES = 'latest-filters-requests-genes';

export const setRecentFiltersToLS = (key: string, value: string, columnID?: string) => {
  if (!columnID) {
    return;
  }

  const prevState = JSON.parse(localStorage.getItem(key) || '{}');
  const currentColumnState = prevState[columnID];

  if (currentColumnState) {
    if (currentColumnState.includes(value)) return;

    localStorage.setItem(key, JSON.stringify({
      ...prevState,
      [columnID]: [...currentColumnState.slice(-3), value],
    }));

    return;
  }

  localStorage.setItem(key, JSON.stringify({
    ...prevState,
    [columnID]: [value],
  }));
};
