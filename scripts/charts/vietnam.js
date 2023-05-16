function vietnam() {
  const width = 1600;
  const height = 500;
  let padding = 90;

  // Define row converter for CSV
  let rowConverter = function (d) {
    return {
      year: d["Year"],
      rate: parseFloat(d["Rate"]),
      population: parseInt(d["Population"]),
      suicide: parseFloat(d["Suicide Rate"]),
      depressive: parseFloat(d["Depressive Disorder Rates"]),
      all: parseInt(d[" All Ages "]),
      gender: d["Gender"],
    };
  };

  d3.csv(
    "https://raw.githubusercontent.com/Nhathuy1305/Worldwide-mental-health-disorders-data-visualization/main/data/vietnam_data.csv",
    rowConverter,
    function (error, data) {
      if (error) {
        console.log(error);
      } else {
        console.log(data);
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
          .range([width - padding, padding]);

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

        // Add the scatter plot
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
          .attr("fill", "black")
          .attr("class", "correlation")
          .on("mouseover", function (d) {
            d3.select("#tooltip")
              .append("p", d.year)
              .attr("id", "area")
              .text("Year: " + d.year + " Suicide rate: " + d.suicide);

            //Show the tooltip
            d3.select("#tooltip").classed("hidden", false);
          })
          .on("mouseout", function () {
            //Hide the tooltip
            d3.select("#tooltip").classed("hidden", true);
            d3.selectAll("p").remove();
            d3.select(this);
          });

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
          .attr("fill", "black")
          .attr("class", "suffering")
          .on("mouseover", function (d) {
            d3.select("#tooltip")
              .append("p", d.all)
              .attr("id", "area")
              .text(
                "Population: " +
                  d3.format(",")(d.population) +
                  " Number of people suffering: " +
                  d3.format(",")(d.all)
              );

            //Show the tooltip
            d3.select("#tooltip").classed("hidden", false);
          })
          .on("mouseout", function () {
            //Hide the tooltip
            d3.select("#tooltip").classed("hidden", true);
            d3.selectAll("p").remove();
            d3.select(this);
          });

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

        // Define new data based on gender
        let groupedData = d3
          .nest()
          .key((d) => d.gender)
          .entries(data);
        console.log(groupedData);

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
            d3.min(groupedData[0].values, function (d) {
              return d.rate;
            }),
            d3.max(groupedData[0].values, function (d) {
              return d.rate;
            }),
          ])
          .range([height - padding, padding]);

        // Define female rate scale
        let femaleScale = d3
          .scaleLinear()
          .domain([
            d3.min(groupedData[1].values, function (d) {
              return d.rate;
            }),
            d3.max(groupedData[1].values, function (d) {
              return d.rate;
            }),
          ])
          .range([height - padding, padding]);

        // Define line function
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

        // Draw charts
        let maleChart = svg3
          .datum(groupedData[0].values)
          .append("path")
          .attr("d", line)
          .attr("stroke", "#0013de")
          .style("stroke-width", 4)
          .style("fill", "none")
          .attr("class", "sexes-line");

        let femaleChart = svg3
          .datum(groupedData[1].values)
          .append("path")
          .attr("d", line)
          .attr("stroke", "#ff00a8")
          .style("stroke-width", 4)
          .style("fill", "none")
          .attr("class", "sexes-line");

        // Get nearest x-position
        let bisect = d3.bisector(function (d) {
          return d.year;
        }).left;

        // Append rectangle to get user mouse position
        svg3
          .append("rect")
          .style("fill", "none")
          .style("pointer-events", "all")
          .attr("width", width)
          .attr("height", height - padding)
          .on("mousemove", mousemove)
          .on("mouseout", mouseout);
        // Pre-append focus circle and text
        svg3
          .append("g")
          .selectAll(".foucus-circle")
          .data(data)
          .enter()
          .append("circle")
          .attr("class", "focus-circle");
        svg3
          .append("g")
          .selectAll(".focus-text")
          .data(data)
          .enter()
          .append("text")
          .attr("class", "focus-text")
          .attr("text-anchor", "middle");

        function mouseout() {
          svg3.selectAll(".focus-circle").data(data).attr("stroke", "none");
          svg3.selectAll(".focus-text").data(data).attr("fill", "none");
        }

        // Define mouse moving function
        function mousemove() {
          // get the coordinate we need
          let x0 = yearScale.invert(d3.mouse(this)[0]);
          let i = bisect(groupedData[0].values, x0, 1);
          selectedData = groupedData.map((item) => item.values[i]);

          // Update focus circle
          svg3
            .selectAll(".focus-circle")
            .data(selectedData)
            .attr("cx", function (d) {
              return yearScale(d.year);
            })
            .attr("cy", function (d) {
              if (d.rate < 3) return maleScale(d.rate);
              return femaleScale(d.rate);
            })
            .attr("r", 6)
            .attr("fill", "none")
            .attr("stroke", "black")
            .attr("stroke-width", 4);

          // Update focus text
          svg3
            .selectAll(".focus-text")
            .data(selectedData)
            .text(function (d) {
              return "Rate: " + d.rate;
            })
            .attr("x", function (d) {
              return yearScale(d.year);
            })
            .attr("y", function (d) {
              if (d.gender == "Male") return maleScale(d.rate) + 30;
              return femaleScale(d.rate) - 30;
            })
            .attr("fill", "black");
        }

        svg3
          .append("text")
          .text("Depression rate between male and female overtime")
          .attr("class", "Axis-label")
          .attr("text-anchor", "middle")
          .attr("x", width / 2)
          .attr("y", height - padding * 0.3)
          .attr("font-size", 14);

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

        d3.selectAll("#play-btn").on("click", function () {
          let currentData = data.slice(0, 0);
          function tweenDash() {
            const l = this.getTotalLength(),
              i = d3.interpolateString("0," + l, l + "," + l);
            return function (t) {
              return i(t);
            };
          }
          function transition(path) {
            path
              .transition()
              .duration(5500)
              .attrTween("stroke-dasharray", tweenDash);
          }
          maleChart.call(transition);
          femaleChart.call(transition);
          setInterval(() => {
            if (currentData.length < data.length) {
              currentData.push(data[currentData.length]);
            }
            // Update the scales
            depScale.domain([
              d3.min(currentData, function (d) {
                return d.depressive;
              }),
              d3.max(currentData, function (d) {
                return d.depressive;
              }),
            ]);

            suiScale.domain([
              d3.min(currentData, function (d) {
                return d.suicide;
              }),
              d3.max(currentData, function (d) {
                return d.suicide;
              }),
            ]);

            allScale.domain([
              d3.min(currentData, function (d) {
                return d.all;
              }),
              d3.max(currentData, function (d) {
                return d.all;
              }),
            ]);

            popScale.domain([
              d3.min(currentData, function (d) {
                return d.population;
              }),
              d3.max(currentData, function (d) {
                return d.population;
              }),
            ]);

            // Add new elements 1
            var update1 = svg1.selectAll(".correlation").data(currentData);
            update1.exit().remove();
            update1
              .enter()
              .append("circle")
              .attr("cx", 0)
              .attr("cy", height)
              .on("mouseover", function (d) {
                d3.select("#tooltip")
                  .append("p", d.year)
                  .attr("id", "area")
                  .text("Year: " + d.year + " Suicide rate: " + d.suicide);

                //Show the tooltip
                d3.select("#tooltip").classed("hidden", false);
              })
              .on("mouseout", function () {
                //Hide the tooltip
                d3.select("#tooltip").classed("hidden", true);
                d3.selectAll("p").remove();
                d3.select(this);
              })
              .merge(update1)
              .transition()
              .attr("cx", function (d) {
                return depScale(d.depressive);
              })
              .attr("cy", function (d) {
                return suiScale(d.suicide);
              })
              .attr("r", 5)
              .attr("fill", "black")
              .attr("class", "correlation");

            svg1.select(".xAxis").call(d3.axisBottom(depScale));
            svg1.select(".yAxis").call(d3.axisLeft(suiScale));

            // Add new elements 2
            var update2 = svg2.selectAll(".suffering").data(currentData);
            update2
              .enter()
              .append("circle")
              .attr("cx", 0)
              .attr("cy", 0)
              .on("mouseover", function (d) {
                d3.select("#tooltip")
                  .append("p", d.all)
                  .attr("id", "area")
                  .text(
                    "Population: " +
                      d3.format(",")(d.population) +
                      " Number of people suffering: " +
                      d3.format(",")(d.all)
                  );

                //Show the tooltip
                d3.select("#tooltip").classed("hidden", false);
              })
              .on("mouseout", function () {
                //Hide the tooltip
                d3.select("#tooltip").classed("hidden", true);
                d3.selectAll("p").remove();
                d3.select(this);
              })
              .merge(update2)
              .transition()
              .attr("cx", function (d) {
                return allScale(d.all);
              })
              .attr("cy", function (d) {
                return popScale(d.population);
              })
              .attr("r", 5)
              .attr("fill", "black")
              .attr("class", "suffering");

            update2.exit().remove();
            svg2
              .select(".xAxis")
              .call(d3.axisBottom(allScale).tickFormat(d3.format(".2s")));
            svg2
              .select(".yAxis")
              .call(d3.axisLeft(popScale).tickFormat(d3.format(".3s")));
          }, 150);
        });
      }
    }
  );
}
