/** @jsxImportSource @emotion/react */
import React, { useRef, useEffect, useState } from 'react';
import { Tooltip } from '@mui/material';
import * as styles from './styles';

interface Props {
  tooltip: string;
  text: string;
}

const OverflowMuiTooltip = (props: Props) => {
  const [hoverStatus, setHover] = useState(false);
  const textElementRef = useRef<HTMLDivElement | null>(null);

  const compareSize = () => {
    if (!textElementRef.current) {
      return;
    }

    const compare = textElementRef.current.scrollWidth > textElementRef.current.clientWidth;
    setHover(compare);
  };

  useEffect(() => {
    compareSize();
    window.addEventListener('resize', compareSize);
  }, []);

  useEffect(() => () => {
    window.removeEventListener('resize', compareSize);
  }, []);

  const { tooltip, text } = props;

  return (
    <Tooltip
      title={tooltip}
      disableHoverListener={!hoverStatus}
    >
      <div
        css={styles.text}
        ref={textElementRef}
      >
        {text}
      </div>
    </Tooltip>
  );
};

export default OverflowMuiTooltip;
