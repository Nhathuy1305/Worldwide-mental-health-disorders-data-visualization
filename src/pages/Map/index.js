import React from 'react';
import ReactDOM from 'react-dom';
import { useData } from './useData'
import { Marks } from './Marks'
import './index.css'

const width = 960;
const height = 500;

export default function Map() {
  const data = useData();

  if (!data) {
    return <pre>Loading...</pre>;
  }

  return (
    <svg width={width} height={height}>
      <Marks data={data} />
    </svg>
  );
};

const rootElement = document.getElementById('root');
ReactDOM.render(<Map />, rootElement);