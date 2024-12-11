import React from 'react';
// @ts-ignore
import { RegionViewer } from '@gnomad/region-viewer';
import { getTreeJSONWithRedux, render } from '../../../utils/testUtils/jestUtils';
import VariantTrack from '../VariantTrack';

describe('VariantTrack component test', () => {
  test('renders VariantTrack component without error', () => {
    render(
      <RegionViewer regions={[]}>
        <VariantTrack variants={[]} width={1220} />
      </RegionViewer>,
    );
  });

  it('Should render correctly', () => {
    const tree = getTreeJSONWithRedux(
      <RegionViewer regions={[]}>
        <VariantTrack variants={[]} width={1220} />
      </RegionViewer>,
    );

    expect(tree).toMatchSnapshot();
  });
});
