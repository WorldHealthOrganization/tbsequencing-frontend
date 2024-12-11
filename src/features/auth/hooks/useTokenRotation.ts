import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ACCESS_TOKEN_KEY } from '../storeToken';
import { logout as logoutAction } from '../authSlice';
import { useLogoutMutation } from '../../../services/indentityApi/identityApi';
import { useDrawerApi } from '../../drawer/hooks/useDrawerApi';

export const useTokenRotation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logout] = useLogoutMutation();
  const { setDrawerContent, closeDrawer } = useDrawerApi();

  useEffect(() => {
    const handleTokenInvalidation = (event: StorageEvent) => {
      if (event.key === ACCESS_TOKEN_KEY && event.oldValue && !event.newValue) {
        logout();
        dispatch(logoutAction());
        navigate('/');
        setDrawerContent('anonymous');
        closeDrawer();
      }
    };

    window.addEventListener('storage', handleTokenInvalidation);

    return () => window.removeEventListener('storage', handleTokenInvalidation);
  }, [navigate, dispatch, logout]);
};
