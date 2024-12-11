import React from 'react';
import {
  getTreeJSONWithRedux, render, screen, wrappedInRouter,
} from '../../../../../utils/testUtils/jestUtils';
import DownloadView from '../DownloadView';

describe('DownloadView', () => {
  const props = {
    mockDate: '2023-04-21',
  };

  test('renders DownloadView component without error', () => {
    render(
      wrappedInRouter(<DownloadView {...props} />),
    );
  });

  test('renders DownloadView title without error', () => {
    render(
      wrappedInRouter(<DownloadView {...props} />),
    );

    screen.getByText('Data Download');
  });

  test('Should render correctly', () => {
    const tree = getTreeJSONWithRedux(
      wrappedInRouter(<DownloadView {...props} />),
    );

    expect(tree).toMatchSnapshot();
  });
});
