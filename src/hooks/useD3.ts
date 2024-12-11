import { useEffect, useRef } from 'react';
import { select } from 'd3-selection';

export type RenderFunction = (element: any) => void;
export type Dependencies = any[];

export const useD3 = (renderFunction: RenderFunction, dependencies: Dependencies) => {
  const ref = useRef(null);
  useEffect(() => {
    renderFunction(select(ref.current));
    return () => {};
  }, dependencies);

  return ref;
};
