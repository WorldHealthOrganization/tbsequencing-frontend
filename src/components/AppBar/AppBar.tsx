/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import {
  AppBar as MUIAppBar,
  Link,
  Button,
  Menu,
  MenuItem,
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useMsal } from '@azure/msal-react';
import { InteractionRequiredAuthError } from '@azure/msal-browser';
import { toast } from 'react-toastify';
import * as styles from './styles';
import { NavTabs } from './NavTabs/NavTabs';

import AuthButton from '../AuthButton';
import { tabsConfig, dropdownConfig } from './tabsConfig';
import { useIsLoggedIn } from '../../features/auth/hooks/useIsLoggedIn';
import {
  getActiveTab,
  tabRoutesMatcher,
  getActiveDropdown,
} from './NavTabs/utils/tabRoutesMatcher';
import { useDrawerApi } from '../../features/drawer/hooks/useDrawerApi';
import ActivityIndicator from '../ActivityIndicator';
import H1 from '../typography/H1';
import { loginRequest } from '../../authConfig';
import { setTokens } from '../../features/auth/storeToken';
import { setCredentialsSSO, setUserSSO } from '../../features/auth/authSlice';
import { useAppDispatch } from '../../app/hooks';

export const AppBar = () => {
  const { instance, inProgress, accounts } = useMsal();
  const isLoggedIn = useIsLoggedIn();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const tabsRouteMatched = tabRoutesMatcher(location, tabsConfig);
  const dropdownButtonActive = tabRoutesMatcher(location, dropdownConfig);
  const { setDrawerContent, toggleDrawer } = useDrawerApi();

  const activeAccount = instance.getAllAccounts();

  const environmentName = process.env.REACT_APP_ENV_HEADER_NAME || 'TB Sequencing';

  const authButtonLabel = activeAccount[0]?.name
    ? activeAccount[0].name
    : 'Sign in';

  const initialTab = getActiveTab(location, tabsConfig);
  const initialDropdown = getActiveDropdown(
    location,
    dropdownConfig,
    'Overview',
  );

  const [activeTab, setActiveTab] = useState<number>(initialTab);
  const [selectedMenuItem, setSelectedMenuItem] = useState<string>(initialDropdown);
  const [isDropdownActive, setIsDropdownActive] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    const userName = activeAccount ? activeAccount[0]?.username : '';
    function getTokenRedirect(request: any) {
      /**
       * See here for more info on account retrieval:
       * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-common/docs/Accounts.md
       */
      request.account = instance.getAccountByUsername(userName);

      return instance.acquireTokenSilent(request).catch((error) => {
        toast.info(
          'silent token acquisition fails. acquiring token using redirect',
        );
        if (error instanceof InteractionRequiredAuthError) {
          // fallback to interaction when silent call fails
          return instance.acquireTokenRedirect(request);
        }
        return null;
      });
    }

    setActiveTab(getActiveTab(location, tabsConfig));
    setIsDropdownActive(dropdownButtonActive);
    setSelectedMenuItem(
      getActiveDropdown(location, dropdownConfig, selectedMenuItem),
    );
    if (accounts.length) {
      getTokenRedirect(loginRequest)
        .then((response) => {
          if (response?.accessToken) {
            setTokens(response?.accessToken, null);
            dispatch(setCredentialsSSO(response?.accessToken));
            dispatch(setUserSSO(activeAccount[0]));
          }
        })
        .catch((error) => {
          toast.error(error);
        });
    }
  }, [location,
    dropdownButtonActive,
    selectedMenuItem,
    activeAccount,
    accounts,
    dispatch,
    instance]);

  const handleTabChange = (event: React.SyntheticEvent, value: number) => {
    const selectedRoute = tabsConfig[value];
    setIsDropdownActive(false);

    setActiveTab(value);
    if ((!isLoggedIn || !activeAccount[0]) && selectedRoute.label === 'Data submission') {
      setDrawerContent('anonymous');
      toggleDrawer();
    } else {
      navigate(selectedRoute.path);
    }
  };

  const anonymousOnAuthButtonClick = () => {
    setDrawerContent('anonymous');
    toggleDrawer();
  };

  const loggedInButtonClick = () => {
    setDrawerContent('userMenu');
    toggleDrawer();
  };

  const onAuthButtonClick = isLoggedIn && activeAccount[0]
    ? loggedInButtonClick
    : anonymousOnAuthButtonClick;

  const handleOpenDropdown = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseDropdown = () => {
    setAnchorEl(null);
  };

  const handleSelectMenuItem = (menuItem: string, index: number) => {
    setSelectedMenuItem(menuItem);
    handleCloseDropdown();
    const selectedRoute = dropdownConfig[index];
    setIsDropdownActive(true);

    setActiveTab(index);
    navigate(selectedRoute.path);
  };

  return (
    <MUIAppBar
      elevation={0}
      position="sticky"
      css={styles.muiAppBarStyles}
      color="transparent"
    >
      <div css={styles.appBarWrapperStyles}>
        <Link css={styles.logo} href="/overview">
          <H1>{environmentName}</H1>
        </Link>
        <div css={styles.menuWrapper}>
          <div css={styles.dropdownContainer}>
            <Button
              id="dropdown-button"
              aria-controls={open ? 'dropdown-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleOpenDropdown}
              css={[
                styles.dropdownButtonStyles,
                isDropdownActive && styles.dropdownActiveStyles,
              ]}
              endIcon={<KeyboardArrowDownIcon css={styles.arrowIcon} />}
            >
              {selectedMenuItem}
            </Button>
            <Menu
              id="dropdown-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleCloseDropdown}
              MenuListProps={{
                'aria-labelledby': 'dropdown-button',
              }}
              css={styles.dropdownMenu}
            >
              {dropdownConfig.map((dropItem, index) => (
                <MenuItem
                  key={dropItem.label}
                  onClick={() => handleSelectMenuItem(dropItem.label, index)}
                  css={styles.dropdownItemStyles}
                >
                  {dropItem.label}
                </MenuItem>
              ))}
            </Menu>
          </div>

          <NavTabs
            routeMatched={tabsRouteMatched}
            tabsConfig={tabsConfig}
            onTabChange={handleTabChange}
            activeTab={activeTab}
          />
        </div>
        {!inProgress ? (
          <div css={styles.loaderContainer}>
            <ActivityIndicator centered />
          </div>
        ) : (
          <AuthButton
            onClick={onAuthButtonClick}
            label={authButtonLabel}
            isActive={false}
            isAppBar
          />
        )}
        <div css={styles.bottomLineStyles} />
      </div>
    </MUIAppBar>
  );
};

export default AppBar;
