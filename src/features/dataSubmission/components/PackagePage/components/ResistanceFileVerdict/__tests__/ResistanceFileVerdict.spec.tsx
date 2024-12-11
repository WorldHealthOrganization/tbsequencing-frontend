import React from 'react';
import { render, getTreeJSONWithRedux } from '../../../../../../../utils/testUtils/jestUtils';
import ResistanceFileVerdict from '../ResistanceFileVerdict';
import { IVerdict } from '../../../../../../../services/submissionApi/models';

describe('ResistanceFileVerdict component test', () => {
  const mockVerdict: IVerdict = {
    verdict: 'mock',
    level: 'warning',
  };

  test('renders ResistanceFileVerdict component without error', () => {
    render(
      <ResistanceFileVerdict verdict={mockVerdict} />,
    );
  });

  it('Should render correctly', () => {
    const tree = getTreeJSONWithRedux(
      <ResistanceFileVerdict verdict={mockVerdict} />,
    );

    expect(tree).toMatchSnapshot();
  });
});
