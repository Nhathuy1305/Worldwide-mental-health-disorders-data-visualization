import { geoEqualEarth, geoPath, geoGraticule } from 'd3';
import './App.css';

const projection = geoEqualEarth();
const path = geoPath(projection);
const graticule = geoGraticule();

export const Marks = ({  data: { land, interiors } }) => (
    <g className="marks">
        <path className="sphere" d={path({ type: 'Sphere' })} />
        <path className="graticules" d={path(graticule())} />
        {land.features.map(feature => (
            <path className="land" d={path(feature)} />
        ))}
        <path className="interiors" d={path(interiors)} />
    </g>
);