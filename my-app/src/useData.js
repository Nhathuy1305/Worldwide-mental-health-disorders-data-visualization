import React, { useState, useEffect } from 'react';
import { json } from 'd3';
import { feature } from 'topojson';

const jsonUrl = 'https://unpkg.com/world-atlas@2.0.2/countries-50m.json';

export const useData = () => {
    const [data, setData] = useState(null);
    console.log(data);

    useEffect(() => {
        json(jsonUrl).then(topojsonData => {
            const { countries } = topojsonData.objects;
            setData(feature(topojsonData, countries));
        });
    }, []);

    return data;
}