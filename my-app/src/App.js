import React, { useState, useCallback, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useData } from './useData';
import { Marks } from './Marks';

const width = 960;
const height = 500;

const App = () => {
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
ReactDOM.render(<App />, rootElement);

// function App() {
//   return (
//     <div className="App">
      
//     </div>
//   );
// }

export default App;
