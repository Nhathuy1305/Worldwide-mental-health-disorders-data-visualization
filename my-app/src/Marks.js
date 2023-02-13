import { geoEqualEarth, geoPath } from 'd3';
import './App.css';

const projection = geoEqualEarth();
const path = geoPath(projection);

export const Marks = ({ data }) => (
    <g className="marks">
        <path className="sphere" d={path({ type: 'Sphere' })} />
        {data.features.map(feature => (
            <path className="feature" d={path(feature)} />
        ))}
    </g>
);