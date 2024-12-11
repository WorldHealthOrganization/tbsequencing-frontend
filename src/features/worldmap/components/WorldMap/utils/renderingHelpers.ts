export interface IRectDimensions {
  top: number;
  left: number;
}

export const getOffset = (el?: SVGPathElement):IRectDimensions => {
  if (!el) {
    return {
      left: 0,
      top: 0,
    };
  }

  const rect = el.getBoundingClientRect();

  return {
    left: rect.left,
    top: rect.top,
  };
};
