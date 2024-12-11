import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  DrawerContent,
  drawerContentTypeSelector,
  drawerOpenedSelector,
  open,
  close,
  setContent, drawerContentPropsSelector,
} from '../drawerSlice';

interface DrawerApi {
  toggleDrawer: () => void;
  drawerOpened: boolean;
  closeDrawer: () => void;
  openDrawer: () => void;
  drawerContentType: DrawerContent;
  drawerContentProps: Record<string, any>;
  setDrawerContent: <T>(drawerContent: DrawerContent, props?: T) => void;
}

export const useDrawerApi = (): DrawerApi => {
  const drawerOpened = useAppSelector(drawerOpenedSelector);
  const drawerContentType = useAppSelector(drawerContentTypeSelector);
  const drawerContentProps = useAppSelector(drawerContentPropsSelector);

  const dispatch = useAppDispatch();

  const toggleDrawer = () => {
    const action = drawerOpened ? close() : open();

    dispatch(action);
  };

  const closeDrawer = () => {
    dispatch(close());
  };

  const openDrawer = () => {
    dispatch(open());
  };

  const setDrawerContent = <T>(drawerContent: DrawerContent, props: T) => {
    dispatch(setContent({ content: drawerContent, props }));
  };

  return {
    toggleDrawer,
    openDrawer,
    closeDrawer,
    drawerOpened,
    drawerContentType,
    drawerContentProps,
    setDrawerContent,
  };
};
