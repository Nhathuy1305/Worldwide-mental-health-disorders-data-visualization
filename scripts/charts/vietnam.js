function vietnam() {
  const width = 1200;
  const height = 400;
  let padding = 90;

  // Define row converter for CSV
  let rowConverter = function (d) {
    return {
      year: d["Year"],
      male: parseFloat(d["Male"]),
      female: parseFloat(d["Female"]),
      population: parseInt(d["Population"]),
      suicide: parseFloat(d["Suicide Rate"]),
      depressive: parseFloat(d["Depressive Disorder Rates"]),
      all: parseInt(d[" All Ages "]),
    };
  };

  d3.csv(
    "https://raw.githubusercontent.com/Nhathuy1305/Worldwide-mental-health-disorders-data-visualization/main/data/vietnam_data.csv",
    rowConverter,
    function (error, data) {
      if (error) {
        console.log(error);
      } else {
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

        // Add correlation canvas
        let svg1 = d3
          .select("#vietnam-area")
          .append("svg")
          .attr("height", height)
          .attr("width", width);
        svg1
          .selectAll("circle")
          .data(data)
          .enter()
          .append("circle")
          .attr("cx", function (d) {
            return depScale(d.depressive);
          })
          .attr("cy", function (d) {
            return suiScale(d.suicide);
          })
          .attr("r", 5)
          .attr("fill", "black");

        // Add x-axis
        let depAxis = d3.axisBottom(depScale).ticks(6);
        svg1
          .append("g")
          .attr("class", "xAxis")
          .attr("transform", "translate(0," + (height - padding) + ")")
          .call(depAxis);
        svg1
          .append("text")
          .text("Depression disorder rate")
          .attr("class", "Axis-label")
          .attr("text-anchor", "middle")
          .attr("x", width / 2)
          .attr("y", height - padding * 0.6)
          .attr("font-size", 14);

        // Add y-axis
        let suiAxis = d3.axisLeft(suiScale).ticks(5);
        svg1
          .append("g")
          .attr("class", "yAxis")
          .attr("transform", "translate(" + padding + ",0)")
          .call(suiAxis);
        svg1
          .append("text")
          .text("Suicide rate")
          .attr("class", "Axis-label")
          .attr("text-anchor", "middle")
          .attr("x", -height / 2)
          .attr("y", padding / 2)
          .attr("font-size", 14)
          .attr("transform", "rotate(-90)");

        // Define all people who suffered from depression scale
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

        // Define population scale
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

        // Add population suffering canvas
        let svg2 = d3
          .select("#vietnam-area")
          .append("svg")
          .attr("height", height)
          .attr("width", width);
        svg2
          .selectAll("circle")
          .data(data)
          .enter()
          .append("circle")
          .attr("cx", function (d) {
            return allScale(d.all);
          })
          .attr("cy", function (d) {
            return popScale(d.population);
          })
          .attr("r", 5)
          .attr("fill", "black");

        // Add x-axis
        let allAxis = d3
          .axisBottom(allScale)
          .ticks(6)
          .tickFormat(d3.format(".2s"));
        svg2
          .append("g")
          .attr("class", "xAxis")
          .attr("transform", "translate(0," + (height - padding) + ")")
          .call(allAxis);
        svg2
          .append("text")
          .text("The number of people suffering from depression")
          .attr("class", "Axis-label")
          .attr("text-anchor", "middle")
          .attr("x", width / 2)
          .attr("y", height - padding * 0.6)
          .attr("font-size", 14);

        // Add y-axis
        let popAxis = d3
          .axisLeft(popScale)
          .ticks(5)
          .tickFormat(d3.format(".3s"));
        svg2
          .append("g")
          .attr("class", "yAxis")
          .attr("transform", "translate(" + padding + ",0)")
          .call(popAxis);
        svg2
          .append("text")
          .text("Population")
          .attr("class", "Axis-label")
          .attr("text-anchor", "middle")
          .attr("x", -height / 2)
          .attr("y", padding / 2)
          .attr("font-size", 14)
          .attr("transform", "rotate(-90)");

        // Grouping data into sexes
        let sexes = ["male", "female"];
        let groupedData = sexes.map(function (sex) {
          return {
            name: sex,
            values: data.map(function (d) {
              return { year: d.year, rate: +d[sex] };
            }),
          };
        });

        // Define yearly scale
        let yearScale = d3
          .scaleLinear()
          .domain([
            d3.min(data, function (d) {
              return d.year;
            }),
            d3.max(data, function (d) {
              return d.year;
            }),
          ])
          .rangeRound([padding, width - padding * 2]);

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

        // Define color scale for each sexes
        let colorScale = d3
          .scaleOrdinal()
          .domain(sexes)
          .range(["#0013de", "#ff00a8"]);

        // Define connected lines between the dots
        let line = d3
          .line()
          .x(function (d) {
            return yearScale(+d.year);
          })
          .y(function (d) {
            if (d.rate < 3) return maleScale(+d.rate);
            return femaleScale(+d.rate);
          });

        // Add new sexes canvas
        let svg3 = d3
          .select("#vietnam-area")
          .append("svg")
          .attr("height", height)
          .attr("width", width);

        svg3
          .selectAll("connected-lines")
          .data(groupedData)
          .enter()
          .append("path")
          .attr("d", function (d) {
            return line(d.values);
          })
          .attr("stroke", function (d) {
            return colorScale(d.name);
          })
          .style("stroke-width", 4)
          .style("fill", "none");
        svg3
          .selectAll("dots")
          .data(groupedData)
          .enter()
          .append("g")
          .style("fill", function (d) {
            return colorScale(d.name);
          })
          .selectAll("circle")
          .data(function (d) {
            return d.values;
          })
          .enter()
          .append("circle")
          .attr("cx", function (d) {
            return yearScale(d.year);
          })
          .attr("cy", function (d) {
            if (d.rate < 3) return maleScale(+d.rate);
            return femaleScale(+d.rate);
          })
          .attr("r", 4)
          .attr("stroke", "white");

        // Add x-axis
        let yearAxis = d3
          .axisBottom(yearScale)
          .ticks(6)
          .tickFormat(d3.format("i"));
        svg3
          .append("g")
          .attr("class", "xAxis")
          .attr("transform", "translate(0," + (height - padding) + ")")
          .call(yearAxis);
        svg3
          .append("text")
          .text("Year")
          .attr("class", "Axis-label")
          .attr("text-anchor", "middle")
          .attr("x", width / 2)
          .attr("y", height - padding * 0.6)
          .attr("font-size", 14);

        // Add y-axis
        let maleAxis = d3
          .axisLeft(maleScale)
          .ticks(5)
          .tickFormat(d3.format(".2f"));
        svg3
          .append("g")
          .attr("class", "yAxis")
          .attr("transform", "translate(" + padding + ",0)")
          .call(maleAxis);
        svg3
          .append("text")
          .text("Male's depression rate")
          .attr("class", "Axis-label")
          .attr("text-anchor", "middle")
          .attr("x", -height / 2)
          .attr("y", padding / 2)
          .attr("font-size", 14)
          .attr("transform", "rotate(-90)");

        // Add y-axis
        let femaleAxis = d3
          .axisRight(femaleScale)
          .ticks(5)
          .tickFormat(d3.format(".2f"));
        svg3
          .append("g")
          .attr("class", "yAxis")
          .attr("transform", "translate(" + (width - padding * 2) + ",0)")
          .call(femaleAxis);
        svg3
          .append("text")
          .text("Female's depression rate")
          .attr("class", "Axis-label")
          .attr("text-anchor", "middle")
          .attr("x", height / 2)
          .attr("y", padding - width)
          .attr("font-size", 14)
          .attr("transform", "rotate(90)");
      }
    }
  );
}
