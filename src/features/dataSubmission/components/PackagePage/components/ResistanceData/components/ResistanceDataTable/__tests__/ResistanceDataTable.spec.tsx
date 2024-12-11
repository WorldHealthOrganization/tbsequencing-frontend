import React from 'react';
import { getTreeJSONWithRedux, render } from '../../../../../../../../../utils/testUtils/jestUtils';
import ResistanceDataTable from '../ResistanceDataTable';
import { IDataSample } from '../../../../../../../../../services/submissionApi/models';

describe('ResistanceDataTable component test', () => {
  const mockSamples: IDataSample[] = [{
    name: 'mock',
    pk: 0,
    url: 'mock',
    micTestsCount: 0,
    pdsTestsCount: 0,
    createdAt: '2022-09-07T21:01:49.455163Z',
    matchSource: 'FASTQ_UPLOADED_NEW_SAMPLE',
    fastqPrefix: 'MOCK',
    verdicts: [{ level: 'warning', verdict: 'mock' }],
    sample: {
      additionalGeographicalInformation: '',
      biosampleId: 0,
      country: 'mock',
      isolationSource: 'mock',
      latitude: 0,
      longitude: 0,
      patiendId: 0,
      samplingDate: '2022-09-07',
      submissionDate: '2022-09-07',
    },
  }];

  test('renders ResistanceDataTable component without error', () => {
    render(
      <ResistanceDataTable samplesData={mockSamples} title="mockTitle" />,
    );
  });

  it('Should render correctly', () => {
    const tree = getTreeJSONWithRedux(
      <ResistanceDataTable samplesData={mockSamples} title="mockTitle" />,
    );

    expect(tree).toMatchSnapshot();
  });
});
