import { IGene } from '../../services/genesApi/models';

const mockGene: IGene = {
  id: 1,
  locusTag: null,
  geneDbCrossrefId: 1,
  startPos: 760000,
  endPos: 761200,
  strand: 1,
  geneName: '1',
};

const mockData: IGene[] = [
  {
    id: 1,
    locusTag: null,
    geneDbCrossrefId: 1,
    startPos: 760000,
    endPos: 761200,
    strand: 1,
    geneName: '1',
  },
  {
    id: 2,
    locusTag: null,
    geneDbCrossrefId: 2,
    startPos: 759899,
    endPos: 760200,
    strand: 1,
    geneName: '2',
  },
  {
    id: 3,
    locusTag: null,
    geneDbCrossrefId: 3,
    startPos: 763000,
    endPos: 763300,
    strand: -1,
    geneName: '3',
  },
  {
    id: 4,
    locusTag: null,
    geneDbCrossrefId: 4,
    startPos: 760502,
    endPos: 760999,
    strand: 1,
    geneName: '4',
  },
  {
    id: 5,
    locusTag: null,
    geneDbCrossrefId: 5,
    startPos: 761000,
    endPos: 762000,
    strand: -1,
    geneName: '5',
  }, {
    id: 6,
    locusTag: null,
    geneDbCrossrefId: 6,
    startPos: 760460,
    endPos: 761000,
    strand: -1,
    geneName: '6',
  },
  {
    id: 7,
    locusTag: null,
    geneDbCrossrefId: 7,
    startPos: 759999,
    endPos: 761050,
    strand: 1,
    geneName: '7',
  },
  {
    id: 8,
    locusTag: null,
    geneDbCrossrefId: 8,
    startPos: 763000,
    endPos: 763325,
    strand: 1,
    geneName: '8',
  },
  {
    id: 9,
    locusTag: null,
    geneDbCrossrefId: 9,
    startPos: 761066,
    endPos: 762066,
    strand: -1,
    geneName: '9',
  },
  {
    id: 10,
    locusTag: null,
    geneDbCrossrefId: 10,
    startPos: 763000,
    endPos: 763112,
    strand: 1,
    geneName: '10',
  },
];

const dataSet1 = [
  {
    startPos: 1,
    endPos: 10,
  },
  {
    startPos: 2,
    endPos: 15,
  },
  {
    startPos: 20,
    endPos: 40,
  },
];

const result1 = [
  {
    y: 1,
    startPos: 1,
    endPos: 10,
  },
  {
    y: 2,
    startPos: 2,
    endPos: 15,
  },
  {
    y: 1,
    startPos: 20,
    endPos: 40,
  },
];

const dataSet2 = [
  {
    startPos: 1,
    endPos: 10,
  },
  {
    startPos: 2,
    endPos: 9,
  },
  {
    startPos: 3,
    endPos: 40,
  },
];

const result2 = [
  {
    y: 1,
    startPos: 1,
    endPos: 10,
  },
  {
    y: 2,
    startPos: 2,
    endPos: 9,
  },
  {
    y: 3,
    startPos: 3,
    endPos: 40,
  },
];

const dataSet3 = [
  {
    startPos: 1,
    endPos: 10,
  },
  {
    startPos: 20,
    endPos: 22,
  },
  {
    startPos: 40,
    endPos: 50,
  },
];

const result3 = [
  {
    y: 1,
    startPos: 1,
    endPos: 10,
  },
  {
    y: 1,
    startPos: 20,
    endPos: 22,
  },
  {
    y: 1,
    startPos: 40,
    endPos: 50,
  },
];

const dataSet4 = [
  {
    startPos: 1,
    endPos: 10,
  },
  {
    startPos: 10,
    endPos: 20,
  },
  {
    startPos: 20,
    endPos: 50,
  },
];

const result4 = [
  {
    y: 1,
    startPos: 1,
    endPos: 10,
  },
  {
    y: 2,
    startPos: 10,
    endPos: 20,
  },
  {
    y: 1,
    startPos: 20,
    endPos: 50,
  },
];

const dataSet5 = [
  {
    startPos: 50,
    endPos: 80,
  },
  {
    startPos: 30,
    endPos: 50,
  },
  {
    startPos: 200,
    endPos: 250,
  },
];

const result5 = [
  {
    y: 1,
    startPos: 30,
    endPos: 50,
  },
  {
    y: 2,
    startPos: 50,
    endPos: 80,
  },
  {
    y: 1,
    startPos: 200,
    endPos: 250,
  },
];

export {
  dataSet1,
  dataSet2,
  dataSet3,
  dataSet4,
  dataSet5,
  result1,
  result2,
  result3,
  result4,
  result5,
  mockData,
  mockGene,
};
