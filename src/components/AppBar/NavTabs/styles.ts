import { fontSizes } from '../../typography/fontSizes';
import appColors from '../../../styles/colors';
import { appZIndex } from '../../../styles/appZIndex';

export const sxTabStyles = {
  fontSize: fontSizes.h2,
  paddingTop: `${32}px`,
  paddingBottom: `${36}px`,
  color: appColors.primary.navy,
  '&.Mui-selected': {
    color: appColors.primary.navy,
    fontWeight: 'bold',
  },
  textTransform: 'capitalize',
};

export const sxTabsStyles = {
  '& .MuiTabs-indicator': {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: appColors.secondary.whoBlue,
    height: 4,
    zIndex: appZIndex.appBar,
  },
};
