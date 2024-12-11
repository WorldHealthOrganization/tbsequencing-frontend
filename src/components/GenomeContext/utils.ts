import { IGene } from '../../services/genesApi/models';

const DEFAULT_Y_AXES = 1;

export const formatGenomeContextData = (data: any[], selectedItem?: IGene) => {
  const dataWithYAxes = data.map((item) => ({
    ...item,
    y: DEFAULT_Y_AXES,
  }));

  const sortedData = dataWithYAxes.sort((a, b) => {
    if (a.startPos < b.startPos) return -1;
    if (a.startPos > b.startPos) return 1;
    return 0;
  });

  for (let i = 0; i < sortedData.length; i += 1) {
    const currItem = sortedData[i];
    const nextItem = sortedData[i + 1];
    const prevItem = sortedData[i - 1];

    if (selectedItem && currItem.geneDbCrossrefId === selectedItem.geneDbCrossrefId) {
      currItem.isSelected = true;
    }

    if (!nextItem) {
      break;
    }

    const nextIncludesCurr = nextItem.startPos <= currItem.endPos;
    const prevNotIncludeNext = prevItem && (nextItem.startPos > prevItem.endPos);

    if (nextIncludesCurr) {
      nextItem.y = currItem.y + 1;
    }

    if (prevNotIncludeNext) {
      if (currItem.y !== prevItem.y) nextItem.y = prevItem.y;
    }
  }

  return sortedData;
};
