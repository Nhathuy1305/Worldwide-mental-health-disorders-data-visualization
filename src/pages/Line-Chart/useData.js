import { useState, useEffect } from 'react';
import { csv, timeParse } from 'd3';

const csvUrl =
    'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/02be34e5ec0409835f79f61a547b2b42f2c6dfd7/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-Deaths.csv';

//const csvUrl =
//  'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-Deaths.csv';

const sum = (accumulator, currentValue) => accumulator + currentValue;

const parseDay = timeParse('%m/%d/%y');

const transform = rawData => {
    const days = rawData.columns.slice(4);
    return days.map(day => ({
        date: parseDay(day),
        deathTotal: rawData.map(d => +d[day]).reduce(sum, 0)
    }));
};

export const useData = () => {
    const [data, setData] = useState();

    useEffect(() => {
        csv(csvUrl).then(rawData => {
            setData(transform(rawData));
        });
    }, []);

    return data;
};