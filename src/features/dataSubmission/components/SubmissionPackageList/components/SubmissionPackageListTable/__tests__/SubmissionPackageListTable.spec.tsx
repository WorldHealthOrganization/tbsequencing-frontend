import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '../../../../../../../utils/testUtils/jestUtils';
import SubmissionPackageListTable from '../SubmissionPackageListTable';
import { IPackage } from '../../../../../../../services/submissionApi/models';

describe('SubmissionPackageListTable component test', () => {
  const packagesData: IPackage[] = [
    {
      description: 'mockDescription',
      name: 'mockName',
      pk: 0,
      origin: 'mockOrigin',
      state: 'DRAFT',
      stateChangedOn: '2022-06-27T09:29:48.260063Z',
      url: 'mockUrl',
      messagesCount: 0,
      micTestsCount: 0,
      pdsTests: [],
      pdsTestsCount: 0,
      micTests: [],
      sequencingDataCount: 0,
      matchingState: 'NEVER_MATCHED',
    },
  ];

  test('renders SubmissionPackageListTable component without error', () => {
    render(
      <BrowserRouter>
        <SubmissionPackageListTable
          packages={packagesData}
          loading={false}
        />
      </BrowserRouter>,
    );
  });

  it('Should render package inside grid', () => {
    render(
      <BrowserRouter>
        <SubmissionPackageListTable
          packages={packagesData}
          loading={false}
        />
      </BrowserRouter>,

    );

    screen.getByText('mockName');
  });

  it('Should render package status inside grid', () => {
    render(
      <BrowserRouter>
        <SubmissionPackageListTable
          packages={packagesData}
          loading={false}
        />
      </BrowserRouter>,

    );

    screen.getByText('DRAFT');
  });

  it('Should render package description inside grid', () => {
    render(
      <BrowserRouter>
        <SubmissionPackageListTable
          packages={packagesData}
          loading={false}
        />
      </BrowserRouter>,

    );

    screen.getByText('mockDescription');
  });
});
