(function (React$1, ReactDOM, d3, topojson) {
    'use strict';

    var React$1__default = 'default' in React$1 ? React$1['default'] : React$1;
    ReactDOM = ReactDOM && ReactDOM.hasOwnProperty('default') ? ReactDOM['default'] : ReactDOM;

    const jsonUrl = 'https://unpkg.com/world-atlas@2.0.2/countries-50m.json';

    const useData = () => {
        const [data, setData] = React$1.useState(null);
        console.log(data);

        React$1.useEffect(() => {
            d3.json(jsonUrl).then(topology => {
                const { countries, land } = topology.objects;
                setData({
                    land: topojson.feature(topology, land),
                    interiors: topojson.mesh(topology, countries, (a, b) => a !== b)
                });
            });
        }, []);

        return data;
    };

    const projection = d3.geoNaturalEarth1();
    const path = d3.geoPath(projection);
    const graticule = d3.geoGraticule();

    const Marks = ({ data: { land, interiors } }) => (
        React.createElement('g', { className: "marks" },
            React.createElement('path', { className: "sphere", d: path({ type: 'Sphere' }) }),
            React.createElement('path', { className: "graticules", d: path(graticule()) }),
            land.features.map(feature => (
                React.createElement('path', { className: "land", d: path(feature) })
            )),
            React.createElement('path', { className: "interiors", d: path(interiors) })
        )
    );

    const width = 960;
    const height = 500;

    const App = () => {
        const data = useData();

        if (!data) {
            return React$1__default.createElement('pre', null, "Loading...");
        }

        return (
            React$1__default.createElement('svg', { width: width, height: height },
                React$1__default.createElement(Marks, { data: data })
            )
        );
    };
    const rootElement = document.getElementById('root');
    ReactDOM.render(React$1__default.createElement(App, null), rootElement);

}(React, ReactDOM, d3, topojson));