import React, { ReactElement } from 'react';
import {
  Routes, Route, Navigate, Outlet, useLocation,
} from 'react-router-dom';
import { useMsal } from '@azure/msal-react';

import { appRoutesArray, IAppRoute } from './appRoutes';

interface IProtectedRoute {
  path: string;
  isAllowed: boolean;
  redirectTo?: string;
  children?: ReactElement;
}

const protectedRoutes = [
  '/data-submission', '/data-submission/', '/account-settings',
];

const ProtectedRoute = ({
  path, isAllowed, redirectTo = '/terms-and-conditions', children,
}: IProtectedRoute) => {
  const location = useLocation();
  const isProtectedRoute = path.includes('data-submission') || protectedRoutes.includes(path);

  if (isProtectedRoute && !isAllowed) {
    return <Navigate state={{ prevRoute: location.pathname }} to={redirectTo} replace />;
  }
  return children || <Outlet />;
};

export const AppRoutes = () => {
  const { instance } = useMsal();
  const activeAccount = instance.getAllAccounts();

  const getProtectedRoute = (appRoute: IAppRoute) => (
    <ProtectedRoute
      path={appRoute.path}
      isAllowed={!!activeAccount[0]}
    />
  );
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/overview" replace />} />
      {appRoutesArray.map((appRoute) => (
        <Route
          key={appRoute.path}
          element={getProtectedRoute(appRoute)}
        >
          <Route element={appRoute.element} path={appRoute.path} />
        </Route>
      ))}
    </Routes>
  );
};
