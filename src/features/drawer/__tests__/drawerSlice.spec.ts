import reducer, {
  IDrawerInitialState, open, close, setContent,
} from '../drawerSlice';

describe('drawer slice tests', () => {
  const mockInitialState: IDrawerInitialState = {
    isOpened: false,
    drawerContentType: 'anonymous',
    drawerContentProps: {},
  };

  it('Should return a proper initial state', () => {
    const state = reducer(undefined, { type: 'MOCK_ACTION_TYPE' });

    expect(state).toStrictEqual(mockInitialState);
  });

  it('Should properly set opened state', () => {
    const returnedState = reducer(undefined, open());

    expect(returnedState).toStrictEqual({
      ...mockInitialState,
      isOpened: true,
    });
  });

  it('Should properly set closed state', () => {
    const returnedState = reducer(undefined, close());

    expect(returnedState).toStrictEqual({
      ...mockInitialState,
      isOpened: false,
    });
  });

  it('Should properly set drawerContent', () => {
    const returnedState = reducer(undefined, setContent({ content: 'chat' }));

    expect(returnedState).toStrictEqual({
      ...mockInitialState,
      drawerContentType: 'chat',
    });
  });

  it('Should properly set drawerContentProps', () => {
    const returnedState = reducer(undefined, setContent({ content: 'chat', props: { packageId: 1 } }));

    expect(returnedState).toStrictEqual({
      ...mockInitialState,
      drawerContentType: 'chat',
      drawerContentProps: { packageId: 1 },
    });
  });
});
