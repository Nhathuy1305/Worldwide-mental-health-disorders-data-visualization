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
            let xPosition = parseFloat(d3.select(this).attr("cx"));
            let yPosition = parseFloat(d3.select(this).attr("cy"));
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
        groupedData = d3
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
            d3.min(
              groupedData[0].values.map((item) => item.rate),
              function (d) {
                return d.rate;
              }
            ),
            d3.max(
              groupedData[0].values.map((item) => item.rate),
              function (d) {
                return d.rate;
              }
            ),
          ])
          .range([height - padding, padding]);

        // Define female rate scale
        let femaleScale = d3
          .scaleLinear()
          .domain([
            d3.min(
              groupedData[1].values.map((item) => item.rate),
              function (d) {
                return d.rate;
              }
            ),
            d3.max(
              groupedData[1].values.map((item) => item.rate),
              function (d) {
                return d.rate;
              }
            ),
          ])
          .range([height - padding, padding]);

        // Define line function
        let line = d3
          .line()
          .x(function (d) {
            return yearScale(+d.map((item) => item.year));
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
          .datum(groupedData[1])
          .append("path")
          .attr("d", line)
          .attr("stroke", "#0013de")
          .style("stroke-width", 4)
          .style("fill", "none")
          .attr("class", "sexes-line");

        // Get nearest x-position
        let bisect = d3.bisector(function (d) {
          return d.year;
        }).left;

        function mouseout() {
          svg3.selectAll("circle").data(data).attr("stroke", "none");
          svg3.selectAll(".focus").data(data).attr("fill", "none");
        }
        // Define mouse moving function
        function mousemove() {
          // get the coordinate we need
          let x0 = yearScale.invert(d3.mouse(this)[0]);
          let i = bisect(data, x0, 1);
          selectedData = data[i];
          // Update focus circle
          svg3
            .selectAll("circle")
            .data(selectedData)
            .attr("cx", function (d) {
              return yearScale(d.year);
            })
            .attr("cy", function (d) {
              return maleScale(d.male);
            })
            .attr("r", 6)
            .attr("fill", "none")
            .attr("stroke", "black")
            .attr("stroke-width", 4);

          // Update focus text
          svg3
            .selectAll(".focus")
            .data(selectedData)
            .text(function (d) {
              return (
                "Date: " +
                d.date.toLocaleDateString("en-US") +
                " Case(s): " +
                d.cases
              );
            })
            .attr("x", function (d) {
              return xScale(d.date);
            })
            .attr("y", function (d) {
              if (d.country == "France") return yScale(d.cases) + 20;
              return yScale(d.cases) - 20;
            })
            .attr("fill", "black");
        }
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
          .selectAll("circle")
          .data(data)
          .enter()
          .append("circle");
        svg3
          .append("g")
          .selectAll(".focus")
          .data(data)
          .enter()
          .append("text")
          .attr("class", "focus")
          .attr("text-anchor", "middle");

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
          malePath.call(transition);
          femalePath.call(transition);
          setInterval(() => {
            if (currentData.length < data.length) {
              currentData.push(data[currentData.length]);
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
              update1
                .enter()
                .append("circle")
                .attr("cx", 0)
                .attr("cy", height)
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
              update1.exit().remove();
              svg1.select(".xAxis").call(d3.axisBottom(depScale));
              svg1.select(".yAxis").call(d3.axisLeft(suiScale));

              // Add new elements 2
              var update2 = svg2.selectAll(".suffering").data(currentData);
              update2
                .enter()
                .append("circle")
                .attr("cx", 0)
                .attr("cy", 0)
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
            }
          }, 150);
        });
      }
    }
  );
}
