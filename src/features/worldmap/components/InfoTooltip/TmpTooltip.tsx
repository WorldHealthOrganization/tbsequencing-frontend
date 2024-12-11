import * as React from 'react';
import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import * as styles from './styles';
import appColors from '../../../../styles/colors';
import AppPaper from '../../../../components/AppPaper';
import PrimaryText from '../../../../components/typography/PrimaryText';

export interface Props {
  title: string
}

export const TmpTooltip = ({
  title,
}: Props) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const theme = createTheme({
    palette: {
      primary: {
        main: appColors.secondary.whoBlue,
      },
    },
  });

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Button
          aria-describedby={id}
          variant="contained"
          onClick={handleClick}
        >
          {title}
        </Button>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'center',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'center',
            horizontal: 'left',
          }}
          onClose={handleClose}
        >
          <div>
            <AppPaper style={styles.paper}>
              <PrimaryText style={styles.note}>
                The proportion of samples in this database with resistance may differ
                from the true proportion in the country, WHO region or globally. The designations
                employed and the
                presentation of the material in this publication do not imply the expression
                of any opinion whatsoever
                on the part of WHO concerning the legal status of any country, territory, city or
                area or of its
                authorities, or concerning the delimitation of its frontiers or boundaries. Dotted
                and dashed
                lines on maps represent approximate border lines for which there may not yet be full
                agreement.
              </PrimaryText>
              <PrimaryText style={styles.note}>Map creation date: 06 November 2023</PrimaryText>
              <PrimaryText style={styles.note}>
                Map production: WHO Global Tuberculosis Programme
              </PrimaryText>
              <PrimaryText style={styles.note}>© WHO 2024. All rights reserved.</PrimaryText>
            </AppPaper>
          </div>
        </Popover>
      </ThemeProvider>
    </div>
  );
};

export default TmpTooltip;
