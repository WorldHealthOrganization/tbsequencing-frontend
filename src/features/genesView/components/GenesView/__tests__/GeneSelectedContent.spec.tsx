import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { getTreeJSONWithRedux, render } from '../../../../../utils/testUtils/jestUtils';
import GeneSelectedContent from '../GeneSelectedContent';
import { IGene } from '../../../../../services/genesApi/models';

const mockGene: IGene = {
  endPos: 0,
  startPos: 0,
  geneDbCrossrefId: 1,
  geneName: 'rpoC',
  locusTag: 'RVca92',
  id: 1,
  strand: 1,
};

describe('GeneSelectedContent', () => {
  test('renders GeneSelectedContent component without error', () => {
    render(
      <BrowserRouter>
        <GeneSelectedContent selectedGene={mockGene} />
      </BrowserRouter>,
    );
  });

  test('Should render correctly', () => {
    const tree = getTreeJSONWithRedux(
      <BrowserRouter>
        <GeneSelectedContent selectedGene={mockGene} />
      </BrowserRouter>,
    );

    expect(tree).toMatchSnapshot();
  });
});
