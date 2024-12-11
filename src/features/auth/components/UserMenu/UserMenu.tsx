/** @jsxImportSource @emotion/react */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Logout } from '@mui/icons-material';
import { useMsal } from '@azure/msal-react';
import * as styles from './styles';
import { logout as logoutAction } from '../../authSlice';
import AuthButton from '../../../../components/AuthButton';
import H3 from '../../../../components/typography/H3';
import PrimaryText from '../../../../components/typography/PrimaryText';
import { useDrawerApi } from '../../../drawer/hooks/useDrawerApi';
import { useAppDispatch } from '../../../../app/hooks';
import { clearTokens } from '../../storeToken';

interface IRowProps {
  route: string;
  label: string;
  isLogout?: boolean;
}

const rowLabels: IRowProps[] = [
  { route: '/', label: 'Log Out', isLogout: true },
];

const UserMenuRow = ({ route, label, isLogout }: IRowProps) => {
  const navigate = useNavigate();
  const { closeDrawer } = useDrawerApi();
  const dispatch = useAppDispatch();
  const logoutStyle = isLogout && styles.logout;
  const { instance } = useMsal();

  const handleLogoutRedirect = () => {
    dispatch(logoutAction());
    clearTokens();
    closeDrawer();
    navigate('/');
    instance.logoutRedirect();
  };

  const handleClick = () => {
    navigate(route);
    closeDrawer();
  };

  return (
    <li css={[styles.liReset]}>
      <button css={[styles.navButton, logoutStyle]} type="button" onClick={isLogout ? handleLogoutRedirect : handleClick}>
        <H3>{label}</H3>
        {isLogout && <Logout sx={styles.logoutIconSx} />}
      </button>
    </li>
  );
};

export const UserMenu = () => {
  const { accounts } = useMsal();
  const fullName = accounts[0]?.name || '';

  return (
    <div css={styles.container}>
      <div css={styles.nameWrapper}>
        <AuthButton
          label={fullName}
          shouldRenderBorderBottom={false}
          isActive
          style={styles.authButton}
        />
      </div>
      <PrimaryText style={styles.descriptionText}>
        Are you sure you want to log out?
      </PrimaryText>
      <div>
        {
        rowLabels.map((row) => (
          <UserMenuRow
            isLogout={row.isLogout}
            route={row.route}
            label={row.label}
            key={row.label}
          />
        ))
      }
      </div>
    </div>
  );
};

export default UserMenu;
