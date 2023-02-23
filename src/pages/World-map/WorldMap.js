import React from 'react';
import { Marks } from './Marks'

const margin = { top: 40, right: 80, bottom: 80, left: 150 };

export const WorldMap = ({ data, width, height }) => {
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    return (
        <svg width={innerWidth} height={innerHeight}>
            <Marks data={data} />
        </svg>
    );
}