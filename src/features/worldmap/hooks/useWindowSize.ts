import { useEffect, useState } from 'react';

interface IWindowSize {
  width: number;
  height: number;
}

export const useWindowSize = () => {
  const initialSize = {
    width: document.body.clientWidth,
    height: document.body.clientHeight,
  };

  const [windowSize, setWindowSize] = useState<IWindowSize>(initialSize);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: document.body.clientWidth,
        height: document.body.clientHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    // TODO add debounce

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return windowSize;
};
