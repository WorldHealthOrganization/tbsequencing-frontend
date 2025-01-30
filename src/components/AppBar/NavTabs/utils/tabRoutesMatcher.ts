import type { Location } from 'react-router-dom';
import { RouterProps } from 'react-router-dom';
import { ITabsConfig, IDropdownConfig } from '../../tabsConfig';

export const tabRoutesMatcher = (location: Location, tabsConfig: ITabsConfig):boolean => {
  const foundRoute = tabsConfig.find((route) => location.pathname.includes(route.path));

  return Boolean(foundRoute);
};

export const getInitialTab = (location: Location, tabsConfig: ITabsConfig):number => {
  const foundIndex = tabsConfig.findIndex((tab) => location.pathname === tab.path);

  return foundIndex;
};

export const getActiveTab = (location: RouterProps['location'], tabsConfig: ITabsConfig):number => {
  if (typeof location !== 'string') {
    return tabsConfig.findIndex((tab) => location.pathname === tab.path);
  }
  return 0;
};

export const getActiveDropdown = (
  location: RouterProps['location'], 
  dropdownConfig: IDropdownConfig,
  defaultDropItem: string
): string => {
  if (typeof location !== 'string') {
    const menuElement = dropdownConfig.find((tab) => location.pathname === tab.path);
    return menuElement?.label || defaultDropItem;
  }
  return defaultDropItem;
};
