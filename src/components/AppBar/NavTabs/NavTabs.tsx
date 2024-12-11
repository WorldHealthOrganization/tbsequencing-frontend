/** @jsxImportSource @emotion/react */
import React, { memo } from 'react';
import { Tabs, Tab } from '@mui/material';
import * as styles from './styles';
import { ITabsConfig } from '../tabsConfig';

interface Props {
  onTabChange: (event: React.SyntheticEvent, value: number) => void;
  activeTab: number;
  tabsConfig: ITabsConfig
  routeMatched: boolean;
}

export const NavTabs = ({
  onTabChange, activeTab, tabsConfig, routeMatched,
}: Props) => {
  const value = routeMatched && activeTab !== -1 ? activeTab : false;

  return (
    <Tabs
      sx={styles.sxTabsStyles}
      value={value}
      onChange={onTabChange}
    >
      {tabsConfig.map((tab, index) => (
        <Tab
          key={tab.label}
          sx={styles.sxTabStyles}
          value={index}
          label={tab.label}
        />
      ))}
    </Tabs>
  );
};
export default memo(NavTabs);
