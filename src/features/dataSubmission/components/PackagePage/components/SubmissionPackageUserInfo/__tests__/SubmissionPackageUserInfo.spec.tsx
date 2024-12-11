import React from 'react';
import { getTreeJSONWithRedux, render } from '../../../../../../../utils/testUtils/jestUtils';
import SubmissionPackageUserInfo from '../SubmissionPackageUserInfo';

// TODO add more tests and mock useUser somehow

describe('SubmissionPackageUserInfo component test', () => {
  const onChangeInfoMockHandler = jest.fn();

  test('renders SubmissionPackageUserInfo component without error', () => {
    render(
      <SubmissionPackageUserInfo
        onChangeInfoClick={onChangeInfoMockHandler}
      />,
    );
  });

  it('Should render correctly', () => {
    const tree = getTreeJSONWithRedux(
      <SubmissionPackageUserInfo
        onChangeInfoClick={onChangeInfoMockHandler}
      />,
    );

    expect(tree).toMatchSnapshot();
  });
});
