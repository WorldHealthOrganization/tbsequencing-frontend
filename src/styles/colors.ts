const appColors = {
  primary: {
    navy: '#00205c',
  },
  secondary: {
    whoBlue: '#009ADE',
    whoOrange: '#F26829',
    whoYellow: '#F4A81D',
    whoMagenta: '#A6228C',
    whoPurple: '#5B2C86',
    whoGreen: '#80BC00',
  },
  neutral: {
    black: '#000000',
    white: '#ffffff',
    grey: '#E6E7E8',
    ncbiGrey: '#757575',
    black020: 'rgba(0, 0, 0, 0.26)',
    blueBg: 'rgba(221, 239, 249, 0.15)',
    whoBlueTransparent: 'rgba(0, 154, 222, 0.05)',
    ncbiGreyTransparent: '#75757d3f',
    whoDisputedGrey: '#dddddd',
    whoNoData: '#ebebec',

  },
  status: {
    whoEmergencyRed: '#EF3842',
    fieldError: '#D32F2F',
    emergencyRedBg: '#FEF5F6',
  },
  tints: {
    whoBlue: {
      light: '#79B5E3',
      lighter: '#C9DDEA',
      lightest: '#DDEFF9',
      lightTransparent: '#E8F1F6',
    },
    whoOrange: {
      light: '#FCBC71',
      lighter: '#FFE3C2',
      lightest: '#FEECE0',
    },
    whoYellow: {
      light: '#F8C370',
      lighter: '#FDE5C2',
      lightest: '#FEF3E3',
    },
    whoMagenta: {
      light: '#BE73AD',
      lighter: '#E0C3DC',
      lightest: '#F0E4F0',
    },
    whoPurple: {
      light: '#AEA9D4',
      lighter: '#DBD9ED',
      lightest: '#E5DFED',
    },
    whoGreen: {
      light: '#AACF7F',
      lighter: '#DCEAC9',
      lightest: '#EFF5E7',
    },
  },
};

export type AppColors = typeof appColors;

export default appColors;
