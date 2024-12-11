import React from 'react';
import { getTreeJSONWithRedux, render } from '../../../../../utils/testUtils/jestUtils';
import { simpleData } from '../../AssociationTable/mock';
import GeneOverview from '../index';
import { formatGenesOverviewData } from '../../GenesView/utils';

const data = formatGenesOverviewData(simpleData);
describe('GeneOverview', () => {
  test('renders GeneOverview component without error', () => {
    render(
      <GeneOverview
        isLoading={false}
        data={data}
      />,
    );
  });

  test('Should render correctly', () => {
    const tree = getTreeJSONWithRedux(
      <GeneOverview
        isLoading={false}
        data={data}
      />,
    );

    expect(tree).toMatchSnapshot();
  });
});
