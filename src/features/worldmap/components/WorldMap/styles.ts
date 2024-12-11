import { css } from '@emotion/react';
import { appZIndex } from '../../../../styles/appZIndex';
import { HEADER_HEIGHT } from '../../../../utils/dimensions';
import appColors from '../../../../styles/colors';

const calcHeight = `calc(100% - ${HEADER_HEIGHT}px)`;
const mapWidgetZIndex = appZIndex.mobileStepper;

export const wrapperStyles = css({
  position: 'relative',
  width: '100%',
  height: calcHeight,
  paddingTop: 144,
});

export const filtersContainer = css({
  position: 'absolute',
  top: 104,
  left: 38,
  zIndex: mapWidgetZIndex,
});

export const pieChartContainer = css({
  position: 'absolute',
  top: '50%',
  left: '50%',
  zIndex: mapWidgetZIndex,
});

export const legendContainer = css({
  position: 'absolute',
  bottom: '24px',
  left: '54px',
  zIndex: mapWidgetZIndex,
});

export const svgTag = css({
  width: '100%',
  height: calcHeight,
  backgroundColor: 'white',
  position: 'relative',
  color: 'black',
});

export const scaleTag = css({
  color: appColors.primary.navy,
});

export const heatMapContainer = css({
  zIndex: mapWidgetZIndex,
  position: 'absolute',
  bottom: 24,
  right: 54,
});

export const mapTitle = css({
  position: 'absolute',
  top: '40px',
  left: '54px',
  zIndex: mapWidgetZIndex,
});

export const footNote = css({
  position: 'absolute',
  top: '50%',
  left: '54px',
  zIndex: mapWidgetZIndex,
});

export const footNoteBottom = css({
  position: 'absolute',
  top: '55%',
  left: '0px',
  zIndex: mapWidgetZIndex,
});

export const footNoteRight = css({
  position: 'absolute',
  bottom: '24px',
  right: '54px',
  zIndex: mapWidgetZIndex,
});

export const footNoteMiddle = css({
  position: 'absolute',
  bottom: '24px',
  left: '50%',
  zIndex: mapWidgetZIndex,
});

export const paper = css({
  width: 620,
});

export const paperRight = css({
  width: 350,
});

export const note = css({
  fontSize: 10,
  lineHeight: '24px',
  textAlign: 'justify',
  textJustify: 'inter-word',
});
