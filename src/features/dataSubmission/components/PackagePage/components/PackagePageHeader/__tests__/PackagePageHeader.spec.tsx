import React from 'react';

import {
  getTreeJSONWithRedux, render, screen, wrappedInRouter,
} from '../../../../../../../utils/testUtils/jestUtils';
import PackagePageHeader from '../PackagePageHeader';
import PackageDataGridCell from '../../PackageDataGridCell';

describe('PackagePageHeader component test', () => {
  const mockOnChatClick = jest.fn();
  const mockOnSyncClick = jest.fn();
  const mockPackageId = 12;
  const mockName = 'mockName';

  test('renders PackagePageHeader component without error', () => {
    render(
      wrappedInRouter(<PackagePageHeader
        controlsDisabled={false}
        onSyncClick={mockOnSyncClick}
        name={mockName}
        packageId={mockPackageId}
        onChatClick={mockOnChatClick}
        isSubmitAllowed={false}
        packageState="ACCEPTED"
      />),
    );
  });

  it('Should render name properly', () => {
    render(
      wrappedInRouter(<PackagePageHeader
        onSyncClick={mockOnSyncClick}
        name={mockName}
        packageId={mockPackageId}
        onChatClick={mockOnChatClick}
        isSubmitAllowed={false}
        packageState="ACCEPTED"
        controlsDisabled={false}
      />),
    );

    screen.getByText(mockName);
  });

  it('Should call proper callbacks', () => {
    render(
      wrappedInRouter(
        <PackagePageHeader
          onSyncClick={mockOnSyncClick}
          name={mockName}
          packageId={mockPackageId}
          onChatClick={mockOnChatClick}
          isSubmitAllowed={false}
          packageState="PENDING"
          controlsDisabled={false}
        />,
      ),
    );

    const instructionsBtn = screen.queryByText('Instruction');
    const chatBtn = screen.queryByText('Chat with Admin');

    instructionsBtn?.click();
    chatBtn?.click();

    expect(mockOnChatClick).toBeCalled();
  });

  it('Should not be able to send invalid package', () => {
    render(
      wrappedInRouter(
        <PackagePageHeader
          onSyncClick={mockOnSyncClick}
          name={mockName}
          packageId={mockPackageId}
          onChatClick={mockOnChatClick}
          isSubmitAllowed={false}
          packageState="ACCEPTED"
          controlsDisabled={false}
        />,
      ),
    );

    const sendBtn = screen.queryByText('Send package');
    sendBtn?.click();
    expect(mockOnChatClick).toHaveBeenCalledTimes(0);
  });

  it('Should render correctly', () => {
    const tree = getTreeJSONWithRedux(
      wrappedInRouter(
        <PackageDataGridCell>
          <PackagePageHeader
            onSyncClick={mockOnSyncClick}
            name={mockName}
            packageId={mockPackageId}
            onChatClick={mockOnChatClick}
            isSubmitAllowed={false}
            packageState="ACCEPTED"
            controlsDisabled={false}
          />
        </PackageDataGridCell>,
      ),
    );

    expect(tree).toMatchSnapshot();
  });
});
