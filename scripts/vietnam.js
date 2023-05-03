// Define basic constraint
const width = 200;
const height = 200;

// Define row converter for CSV
let rowConverter = function (d) {
  return {
    year: parseInt(d["Year"]),
    male: parseFloat(d["Male"]),
    female: parseFloat(d["Female"]),
    population: parseInt(d["Population"]),
    suicide: parseFloat(d["Suicide Rate"]),
    depressive: parseFloat(d["Depressive Disorder Rates"]),
    all: parseFloat(d["All Ages"]),
    age1014: parseFloat(d["10-14 years old (%)"]),
    age1519: parseFloat(d["15-19 years old (%)"]),
    age2024: parseFloat(d["20-24 years old (%)"]),
    age2529: parseFloat(d["25-29 years old (%)"]),
    age3034: parseFloat(d["30-34 years old (%)"]),
    age3549: parseFloat(d["35-49 years old (%)"]),
    age5069: parseFloat(d["50-69 years old (%)"]),
    age70: parseFloat(d["70+ years old (%)"]),
  };
};

function vietnam() {
  d3.csv(
    "https://raw.githubusercontent.com/Nhathuy1305/DSDV-project/main/Vietnam.csv",
    rowConverter
  ).then((data) => {
    // Define depressive rate scale
    let depScale = d3
      .scaleLinear()
      .domain([
        d3.min(data, function (d) {
          return d.depressive;
        }),
        d3.max(data, function (d) {
          return d.depressive;
        }),
      ])
      .range([padding, width - padding]);

    // Define suicide rate scale
    let suiScale = d3
      .scaleLinear()
      .domain([
        d3.min(data, function (d) {
          return d.suicide;
        }),
        d3.max(data, function (d) {
          return d.suicide;
        }),
      ])
      .range([height - padding, padding]);

    // Define depressive rate scale
    let allScale = d3
      .scaleLinear()
      .domain([
        d3.min(data, function (d) {
          return d.all;
        }),
        d3.max(data, function (d) {
          return d.all;
        }),
      ])
      .range([padding, width - padding]);

    // Define suicide rate scale
    let popScale = d3
      .scaleLinear()
      .domain([
        d3.min(data, function (d) {
          return d.population;
        }),
        d3.max(data, function (d) {
          return d.population;
        }),
      ])
      .range([height - padding, padding]);

    // Define male rate scale
    let maleScale = d3
      .scaleLinear()
      .domain([
        d3.min(data, function (d) {
          return d.male;
        }),
        d3.max(data, function (d) {
          return d.male;
        }),
      ])
      .range([height - padding, padding]);

    // Define female rate scale
    let femaleScale = d3
      .scaleLinear()
      .domain([
        d3.min(data, function (d) {
          return d.female;
        }),
        d3.max(data, function (d) {
          return d.female;
        }),
      ])
      .range([height - padding, padding]);

    // Define yearly scale
    let yearScale = d3
      .scaleBand()
      .domain(d3.range(data.length))
      .rangeRound([0, height - padding])
      .paddingInner(0.2);

    // Add new canvas
    let svg1 = d3
      .select(".task")
      .append("svg")
      .attr("height", height)
      .attr("width", width);

    let svg2 = d3
      .select(".task")
      .append("svg")
      .attr("height", height)
      .attr("width", width);
    let svg3 = d3
      .select(".task")
      .append("svg")
      .attr("height", height)
      .attr("width", width);
    let svg4 = d3
      .select(".task")
      .append("svg")
      .attr("height", height)
      .attr("width", width);
  });
}
