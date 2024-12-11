import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getTokens } from '../auth/storeToken';
import type { RootState } from '../../app/store';

export type DrawerContent = 'anonymous' | 'userMenu' | 'dataSubmissionInstruction' | 'chat' | 'termsConditions';

export interface IDrawerInitialState<T = {}> {
  isOpened: boolean;
  drawerContentType: DrawerContent;
  drawerContentProps: T
}

const { accessToken } = getTokens();

const initialState: IDrawerInitialState = {
  isOpened: false,
  drawerContentType: accessToken ? 'userMenu' : 'anonymous',
  drawerContentProps: {},
};

export const drawerSlice = createSlice({
  name: 'drawer',
  initialState,
  reducers: {
    open(state) {
      state.isOpened = true;
    },
    close(state) {
      state.isOpened = false;
    },
    setContent<T>(
      state: IDrawerInitialState,
      { payload }: PayloadAction<{ content: DrawerContent, props?: T }>,
    ) {
      state.drawerContentType = payload.content;
      if (payload.props) {
        state.drawerContentProps = payload.props;
      }
    },
  },
});

export const drawerOpenedSelector = (state: RootState) => state.drawer.isOpened;
export const drawerContentTypeSelector = (state: RootState) => state.drawer.drawerContentType;
export const drawerContentPropsSelector = (state: RootState) => state.drawer.drawerContentProps;

export default drawerSlice.reducer;

export const { open, close, setContent } = drawerSlice.actions;
