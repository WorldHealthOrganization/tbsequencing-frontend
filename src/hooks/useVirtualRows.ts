import { useVirtual } from 'react-virtual';
import { RefObject, useEffect } from 'react';

interface IUseVirtualRows {
  rows: Record<string, any>[],
  parentRef: RefObject<any>,
  isVirtual: boolean,
  selectedRow?: number,
}

export const useVirtualRows = ({
  rows, parentRef, isVirtual, selectedRow,
}: IUseVirtualRows) => {
  const { virtualItems: virtualRows, scrollToOffset, totalSize } = useVirtual({
    parentRef,
    overscan: 0,
    size: rows.length,
  });

  useEffect(() => {
    if (selectedRow && ~selectedRow) {
      // We use here scrollToOffset because scrollToIndex works weird
      // 50 - height of single row
      // selectedRow - index of row in tableData array
      scrollToOffset(selectedRow * 50);
    }
  }, [selectedRow]);

  if (!isVirtual) return {};

  return {
    virtualRows,
    totalSize,
  };
};
