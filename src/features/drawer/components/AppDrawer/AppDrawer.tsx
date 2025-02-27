/** @jsxImportSource @emotion/react */
import React, { ReactNode } from 'react';
import { Drawer } from '@mui/material';
import { match } from 'ts-pattern';
import * as styles from './styles';
import { LoginForm } from '../../../auth/components/login/LoginForm';
import { DrawerContent } from '../../drawerSlice';
import { useDrawerApi } from '../../hooks/useDrawerApi';
import DataSubmissionInstructions from
  '../../../dataSubmission/components/PackagePage/components/DataSubmissionInstructions';
import UserMenu from '../../../auth/components/UserMenu';
import Chat from '../../../../components/Chat';
import DatabasePrinciplesInfo from '../../../../components/DatabasePriciplesInfo';

export const AppDrawer = () => {
  const { drawerOpened, closeDrawer, drawerContentType } = useDrawerApi();
  const drawerContent = match<DrawerContent, ReactNode>(drawerContentType)
    .with('anonymous', () => <LoginForm />)
    .with('dataSubmissionInstruction', () => <DataSubmissionInstructions />)
    .with('userMenu', () => <UserMenu />)
    .with('chat', () => <Chat />)
    .with('termsConditions', () => <DatabasePrinciplesInfo isDrawer />)
    .otherwise(() => <div />);

  return (
    <Drawer
      ModalProps={{
        keepMounted: drawerContentType !== 'chat',
      }}
      PaperProps={{
        sx: styles.drawerSx,
      }}
      onClose={closeDrawer}
      open={drawerOpened}
      anchor="right"
    >
      {drawerContent}
    </Drawer>
  );
};

export default AppDrawer;
