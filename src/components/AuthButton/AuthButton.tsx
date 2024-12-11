/** @jsxImportSource @emotion/react */
import React from 'react';
import { Button } from '@mui/material';
import { AccountBox, Logout } from '@mui/icons-material';
import { SerializedStyles } from '@emotion/react';
import { useMsal } from '@azure/msal-react';
import { useIsLoggedIn } from '../../features/auth/hooks/useIsLoggedIn';
import * as styles from './styles';

interface Props {
  onClick?: () => void;
  label: string;
  isActive: boolean;
  shouldRenderBorderBottom?: boolean;
  style?: SerializedStyles;
  isAppBar?: boolean;
}

const FakeBorderBottom = () => <div css={styles.fakeBorderBottom} />;

export const AuthButton = ({
  label, onClick, isActive, shouldRenderBorderBottom = true, style, isAppBar,
}: Props) => {
  const { instance } = useMsal();
  const isLoggedIn = useIsLoggedIn();
  const activeAccount = instance.getAllAccounts();
  return (
    <div css={styles.buttonWrapper}>
      <Button
        css={[styles.button, style]}
        startIcon={<span css={styles.iconWrapper}><AccountBox sx={styles.sxIcon} /></span>}
        onClick={onClick}
        endIcon={(isAppBar && isLoggedIn && activeAccount[0])
        && <span css={styles.iconWrapper}><Logout sx={styles.mIcon} /></span>}
      >
        {label}
      </Button>
      {(isActive && shouldRenderBorderBottom) && <FakeBorderBottom />}
    </div>
  );
};

export default AuthButton;
