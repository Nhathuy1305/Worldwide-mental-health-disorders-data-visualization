// Define basic constraint
const width = 200;
const height = 200;
const padding = 200;

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
    console.log(data);
  });
}
