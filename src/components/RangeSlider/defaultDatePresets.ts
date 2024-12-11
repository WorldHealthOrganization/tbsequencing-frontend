const currentYear = new Date().getFullYear();

const defaultDatePresets = [
  {
    label: 'Last year',
    value: [currentYear - 1, currentYear],
  },
  {
    label: 'Last 2 years',
    value: [currentYear - 2, currentYear],
  },
  {
    label: 'Last 3 years',
    value: [currentYear - 3, currentYear],
  },
  {
    label: 'Last 5 years',
    value: [currentYear - 5, currentYear],
  },
  {
    label: 'Last Decade',
    value: [currentYear - 10, currentYear],
  },
];

export {
  defaultDatePresets,
};
