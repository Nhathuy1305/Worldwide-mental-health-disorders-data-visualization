import React from 'react';
import { scaleTime, extent, scaleLinear, max, line, timeFormat } from 'd3';
import { YMarkerLine } from './YMarkerLine';
import { XMarkerLine } from './XMarkerLine';
import { XAxis } from './XAxis';

const xValue = d => d.date;
const yValue = d => d.deathTotal;

const margin = { top: 40, right: 80, bottom: 80, left: 150 };

const formatDate = timeFormat('%b %d');

export const LineChart = ({ data, width, height }) => {
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const xScale = scaleTime()
    .domain(extent(data, xValue))
    .range([0, innerWidth]);

  const yScale = scaleLinear()
    .domain([0, max(data, yValue)])
    .range([innerHeight, 0]);

  const lineGenerator = line()
    .x(d => xScale(xValue(d)))
    .y(d => yScale(yValue(d)));

  const mostRecentDate = xScale.domain()[1];

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left},${margin.top})`}>
        <XAxis xScale={xScale} innerHeight={innerHeight} />
        <path d={lineGenerator(data)} />
        <YMarkerLine value={10000} yScale={yScale} innerWidth={innerWidth} />
        <XMarkerLine
          value={mostRecentDate}
          label={formatDate(mostRecentDate)}
          xScale={xScale}
          innerHeight={innerHeight}
        />
      </g>
    </svg>
  );
};
