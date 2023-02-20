import React from 'react';
import { useData } from './useData';
import { LineChart } from './LineChart';
import './index.css'

const width = window.innerWidth;
const height = window.innerHeight;

const LineChartCons = () => {
    const data = useData();
    return data
        ? <LineChart data={data} width={width} height={height} />
        : <div>Loading...</div>;
};

export default LineChartCons;