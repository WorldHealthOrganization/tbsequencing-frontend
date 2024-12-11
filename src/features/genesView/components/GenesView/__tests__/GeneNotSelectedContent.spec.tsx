import React from 'react';
import { getTreeJSONWithRedux, render } from '../../../../../utils/testUtils/jestUtils';
import GeneNotSelectedContent from '../GeneNotSelectedContent';

describe('GeneNotSelectedContent', () => {
  test('renders GeneNotSelectedContent component without error', () => {
    render(
      <GeneNotSelectedContent
        isMostSearchLoading={false}
        mostSearch={[]}
        isRecentSearchLoading={false}
        recentSearch={[]}
        onGeneClick={() => null}
      />,
    );
  });

  test('Should render correctly', () => {
    const tree = getTreeJSONWithRedux(
      <GeneNotSelectedContent
        isMostSearchLoading={false}
        mostSearch={[]}
        isRecentSearchLoading={false}
        recentSearch={[]}
        onGeneClick={() => null}
      />,
    );

    expect(tree).toMatchSnapshot();
  });
});
