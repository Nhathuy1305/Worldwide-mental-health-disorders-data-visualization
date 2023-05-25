function vietnam() {
  const width = 1600;
  const height = 500;
  let padding = 90;

  let rowConverter = function (d) {
    return {
      year: parseInt(d["Year"]),
      value: parseFloat(d["Value"]),
      type: d["Disease"],
    };
  };

  padding2 = padding * 1.4;

  d3.csv(
    "https://raw.githubusercontent.com/Nhathuy1305/Worldwide-mental-health-disorders-data-visualization/main/data/vietnam_specific.csv",
    rowConverter,
    function (error, data) {
      if (!error) {
        // Define new dataset with sorted value grouped by gender
        let groupedData = d3
          .nest()
          .key((d) => d.year)
          .sortValues((a, b) => b.value - a.value)
          .entries(data);

        console.log(groupedData);

        // Define new scale for rate values
        let valueScale = d3
          .scaleLinear()
          .domain([
            d3.min(data, function (d) {
              return d.value;
            }),
            d3.max(data, function (d) {
              return d.value;
            }),
          ])
          .rangeRound([0, width - padding2 * 2]);

        // Define new vertical scale
        let yScale = d3
          .scaleBand()
          .domain(d3.range(groupedData.map((item) => item.values)[27].length))
          .rangeRound([0, height - padding2])
          .paddingInner(0.2);

        // Define color scale for bars
        let colorScale = d3
          .scaleOrdinal()
          .domain(d3.range(groupedData.map((item) => item.values)[27].length))
          .range([
            "#e41a1c",
            "#377eb8",
            "#4daf4a",
            "#984ea3",
            "#ff7f00",
            "#ffff33",
            "#a65628",
            "#f781bf",
            "#999999",
          ]);

        // Add new svg
        let svg1 = d3
          .select("#vietnam-area")
          .append("svg")
          .attr("height", height)
          .attr("width", width);

        // Add the bars
        svg1
          .selectAll("rect")
          .data(groupedData.map((item) => item.values)[27])
          .enter()
          .append("rect")
          .attr("x", padding2)
          .attr("y", function (d, i) {
            return yScale(i);
          })
          .attr("width", function (d) {
            return valueScale(d.value);
          })
          .attr("height", yScale.bandwidth())
          .attr("fill", function (d) {
            return colorScale(d.type);
          });

        // Add rate type label
        svg1
          .selectAll(".type")
          .data(groupedData.map((item) => item.values)[27])
          .enter()
          .append("text")
          .text(function (d) {
            return d.type;
          })
          .attr("class", "type")
          .attr("text-anchor", "end")
          .attr("x", padding2 * 0.98)
          .attr("y", function (d, i) {
            return yScale(i) + yScale.bandwidth() / 1.7;
          })
          .attr("font-size", 11)
          .attr("font-weight", "bold")
          .attr("fill", "black");

        // Add data label
        svg1
          .selectAll(".value")
          .data(groupedData.map((item) => item.values)[27])
          .enter()
          .append("text")
          .text(function (d) {
            return d.value;
          })
          .attr("class", "value")
          .attr("text-anchor", "start")
          .attr("x", function (d, i) {
            return valueScale(d.value) + padding2 * 1.1;
          })
          .attr("y", function (d, i) {
            return yScale(i) + yScale.bandwidth() / 1.7;
          })
          .attr("font-size", 14)
          .attr("font-weight", "bold")
          .attr("fill", "black");

        // Add x-axis
        let valueAxis = d3
          .axisBottom(valueScale)
          .ticks(6)
          .tickFormat(d3.format(".2f"));
        svg1
          .append("g")
          .attr("class", "xAxis")
          .attr(
            "transform",
            "translate(" + padding2 + "," + (height - padding2 * 0.9) + ")"
          )
          .style("stroke-width", "2px")
          .attr("font-weight", "bold")
          .call(valueAxis);
        svg1
          .append("text")
          .text(
            "The rate of Vietnamese who suffered different type of disorders in 2017"
          )
          .attr("class", "Axis-label")
          .attr("text-anchor", "middle")
          .attr("x", width / 2)
          .attr("y", height - padding * 0.8)
          .attr("font-weight", "bold")
          .attr("font-size", 14);

        // Define play button
        d3.selectAll("#play-btn-1").on("click", function () {
          let interval,
            i = 0;
          function updateChart() {
            let currentData = groupedData[i];

            svg1
              .selectAll("rect")
              .data(currentData.values)
              .transition()
              .duration(200)
              .attr("width", function (d) {
                return valueScale(d.value);
              });

            svg1
              .selectAll(".value")
              .data(currentData.values)
              .transition()
              .duration(200)
              .text(function (d) {
                return d.value;
              })
              .attr("class", "value")
              .attr("text-anchor", "start")
              .attr("x", function (d, i) {
                return valueScale(d.value) + padding2 * 1.1;
              });

            svg1.selectAll(".Axis-label").exit().remove();
            svg1
              .selectAll(".Axis-label")
              .transition()
              .duration(200)
              .text(
                "The rate of Vietnamese who suffered different type of disorders in " +
                  groupedData.map((item) => item.key)[i]
              )
              .attr("class", "Axis-label")
              .attr("text-anchor", "middle");

            if (i < groupedData.length - 1) i++;
            else clearInterval(interval);
          }
          interval = setInterval(updateChart, 200);
        });
      } else {
        console.log(error);
      }
    }
  );

  // Define row converter for CSV
  let rowConverter2 = function (d) {
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
    rowConverter2,
    function (error, data) {
      if (!error) {
        // Define new dataset with value grouped by gender
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

        // Add new sexes canvas
        let svg1 = d3
          .select("#vietnam-area")
          .append("svg")
          .attr("height", height)
          .attr("width", width);

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

        // Draw line charts
        let maleChart = svg1
          .datum(groupedData[0].values)
          .append("path")
          .attr("d", line)
          .attr("stroke", "#0013de")
          .style("stroke-width", 4)
          .style("fill", "none")
          .attr("class", "sexes-line");

        let femaleChart = svg1
          .datum(groupedData[1].values)
          .append("path")
          .attr("d", line)
          .attr("stroke", "#ff00a8")
          .style("stroke-width", 4)
          .style("fill", "none")
          .attr("class", "sexes-line");

        // Append rectangle to get user mouse position
        svg1
          .append("rect")
          .style("fill", "none")
          .style("pointer-events", "all")
          .attr("width", width)
          .attr("height", height - padding)
          .on("mousemove", mousemove)
          .on("mouseout", mouseout);

        // Pre-append focus circle and text
        svg1
          .append("g")
          .selectAll(".foucus-circle")
          .data(groupedData[1].values)
          .enter()
          .append("circle")
          .attr("class", "focus-circle");
        svg1
          .append("g")
          .selectAll(".focus-text")
          .data(groupedData[1].values)
          .enter()
          .append("text")
          .attr("class", "focus-text")
          .attr("text-anchor", "middle");

        svg1
          .append("text")
          .text("Depression rate between Vietnamese male and female overtime")
          .attr("class", "Axis-label")
          .attr("text-anchor", "middle")
          .attr("x", width / 2)
          .attr("y", height - padding * 0.3)
          .attr("font-size", 14)
          .attr("font-weight", "bold");

        // Add x-axis
        let yearAxis = d3
          .axisBottom(yearScale)
          .ticks(6)
          .tickFormat(d3.format("i"));
        svg1
          .append("g")
          .attr("class", "xAxis")
          .attr("transform", "translate(0," + (height - padding) + ")")
          .attr("font-weight", "bold")
          .style("stroke-width", "2px")
          .call(yearAxis);
        svg1
          .append("text")
          .text("Year")
          .attr("class", "Axis-label")
          .attr("text-anchor", "middle")
          .attr("x", width / 2)
          .attr("y", height - padding * 0.6)
          .attr("font-weight", "bold")
          .attr("font-size", 14);

        // Add y-axis
        let maleAxis = d3
          .axisLeft(maleScale)
          .ticks(5)
          .tickFormat(d3.format(".2f"));
        svg1
          .append("g")
          .attr("class", "yAxis")
          .attr("transform", "translate(" + padding + ",0)")
          .attr("font-weight", "bold")
          .style("stroke-width", "2px")
          .call(maleAxis);
        svg1
          .append("text")
          .text("Male's depression rate")
          .attr("class", "Axis-label")
          .attr("text-anchor", "middle")
          .attr("x", -height / 2)
          .attr("y", padding / 2)
          .attr("font-size", 14)
          .attr("font-weight", "bold")
          .attr("transform", "rotate(-90)");

        // Add y-axis
        let femaleAxis = d3
          .axisRight(femaleScale)
          .ticks(5)
          .tickFormat(d3.format(".2f"));
        svg1
          .append("g")
          .attr("class", "yAxis")
          .attr("transform", "translate(" + (width - padding * 2) + ",0)")
          .attr("font-weight", "bold")
          .style("stroke-width", "2px")
          .call(femaleAxis);
        svg1
          .append("text")
          .text("Female's depression rate")
          .attr("class", "Axis-label")
          .attr("text-anchor", "middle")
          .attr("x", height / 2)
          .attr("y", padding - width)
          .attr("font-size", 14)
          .attr("font-weight", "bold")
          .attr("transform", "rotate(90)");

        // Get nearest x-position
        let bisect = d3.bisector(function (d) {
          return d.year;
        }).left;

        // Define mouse moving out function
        function mouseout() {
          svg1.selectAll(".focus-circle").data(data).attr("stroke", "none");
          svg1.selectAll(".focus-text").data(data).attr("fill", "none");
        }

        // Define mouse moving function
        function mousemove() {
          // get the coordinate we need
          let x0 = yearScale.invert(d3.mouse(this)[0]);
          let i = bisect(groupedData[0].values, x0, 1);
          selectedData = groupedData.map((item) => item.values[i]);

          // Update focus circle
          svg1
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
          svg1
            .selectAll(".focus-text")
            .data(selectedData)
            .text(function (d) {
              return "Rate: " + d.rate;
            })
            .attr("x", function (d) {
              return yearScale(d.year);
            })
            .attr("y", function (d) {
              if (d.gender === "Male") return maleScale(d.rate) + 30;
              return femaleScale(d.rate) - 30;
            })
            .attr("fill", "black");
        }

        // Define play button function
        d3.selectAll("#play-btn-2").on("click", function () {
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
        });

        // Define depressive rate scale
        let depScale = d3
          .scaleLinear()
          .domain([
            d3.min(groupedData[0].values, function (d) {
              return d.depressive;
            }),
            d3.max(groupedData[0].values, function (d) {
              return d.depressive;
            }),
          ])
          .range([(width - padding) / 2, padding]);

        // Define suicide rate scale
        let suiScale = d3
          .scaleLinear()
          .domain([
            d3.min(groupedData[0].values, function (d) {
              return d.suicide;
            }),
            d3.max(groupedData[0].values, function (d) {
              return d.suicide;
            }),
          ])
          .range([height - padding, padding]);

        // Add correlation canvas
        let svg2 = d3
          .select("#vietnam-area")
          .append("svg")
          .attr("height", height)
          .attr("width", width / 2);

        // Add the scatter plot
        svg2
          .selectAll("circle")
          .data(groupedData[0].values)
          .enter()
          .append("circle")
          .attr("cx", function (d) {
            return depScale(d.depressive);
          })
          .attr("cy", function (d) {
            return suiScale(d.suicide);
          })
          .attr("r", 5)
          .attr("fill", function (d, i) {
            return "rgb(0, " + i * 8 + ",0)";
          })
          .attr("class", "correlation")
          .on("mouseover", function (d) {
            d3.select(this).attr("opacity", 0.8);
            d3.select("#tooltip1")
              .html("Year: " + d.year + "<br>Suicide rate: " + d.suicide)
              .style("left", d3.event.pageX + 10 + "px")
              .style("top", d3.event.pageY - 130 + "px")
              .classed("hidden", false);
          })
          .on("mouseout", function () {
            d3.select(this).attr("opacity", 1);
            d3.select("#tooltip1").classed("hidden", true);
          });

        // Add x-axis
        let depAxis = d3.axisBottom(depScale).ticks(6);
        svg2
          .append("g")
          .attr("class", "xAxis")
          .attr("transform", "translate(0," + (height - padding) + ")")
          .style("stroke-width", "2px")
          .attr("font-weight", "bold")
          .call(depAxis);
        svg2
          .append("text")
          .text("Vietnamese depression disorder rate")
          .attr("class", "Axis-label")
          .attr("text-anchor", "middle")
          .attr("x", width / 4 + 20)
          .attr("y", height - padding * 0.6)
          .attr("font-weight", "bold")
          .attr("font-size", 14);

        // Add y-axis
        let suiAxis = d3.axisLeft(suiScale).ticks(5);
        svg2
          .append("g")
          .attr("class", "yAxis")
          .attr("transform", "translate(" + padding + ",0)")
          .style("stroke-width", "2px")
          .attr("font-weight", "bold")
          .call(suiAxis);
        svg2
          .append("text")
          .text("Suicide rate")
          .attr("class", "Axis-label")
          .attr("text-anchor", "middle")
          .attr("x", -height / 2)
          .attr("y", padding / 2)
          .attr("font-size", 14)
          .attr("font-weight", "bold")
          .attr("transform", "rotate(-90)");

        d3.selectAll("#play-btn-3").on("click", function () {
          let currentData = data.slice(0, 0);

          let interval = setInterval(() => {
            if (currentData.length < 28) {
              currentData.push(data[currentData.length]);
            }
            console.log(currentData);
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

            // Add new sccater plot elements
            const update1 = svg2.selectAll(".correlation").data(currentData);
            update1.exit().remove();
            update1
              .enter()
              .append("circle")
              .attr("cx", 8)
              .attr("cy", height - 15)
              .on("mouseover", function (d) {
                d3.select(this).attr("opacity", 0.8);
                d3.select("#tooltip1")
                  .append("p", d.year)
                  .attr("id", "area")
                  .text("Year: " + d.year + " Suicide rate: " + d.suicide);

                //Show the tooltip
                d3.select("#tooltip1").classed("hidden", false);
              })
              .on("mouseout", function () {
                d3.select(this).attr("opacity", 1);
                //Hide the tooltip
                d3.select("#tooltip1").classed("hidden", true);
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
              .attr("fill", function (d, i) {
                return "rgb(0, " + i * 8 + ",0)";
              })
              .attr("class", "correlation");

            svg2.select(".xAxis").call(d3.axisBottom(depScale));
            svg2.select(".yAxis").call(d3.axisLeft(suiScale));
          }, 150);
          setTimeout(function () {
            clearInterval(interval);
            currentData = data.slice(0, 0);
          }, 4200);
        });

        // Define all people who suffered from depression scale
        let allScale = d3
          .scaleLinear()
          .domain([
            d3.min(groupedData[0].values, function (d) {
              return d.all;
            }),
            d3.max(groupedData[0].values, function (d) {
              return d.all;
            }),
          ])
          .range([padding, (width - padding) / 2]);

        // Define population scale
        let popScale = d3
          .scaleLinear()
          .domain([
            d3.min(groupedData[0].values, function (d) {
              return d.population;
            }),
            d3.max(groupedData[0].values, function (d) {
              return d.population;
            }),
          ])
          .range([height - padding, padding]);

        // Add population suffering canvas
        let svg3 = d3
          .select("#vietnam-area")
          .append("svg")
          .attr("height", height)
          .style("position", "absolute")
          .attr("width", width / 2);
        svg3
          .selectAll("circle")
          .data(groupedData[0].values)
          .enter()
          .append("circle")
          .attr("cx", function (d) {
            return allScale(d.all);
          })
          .attr("cy", function (d) {
            return popScale(d.population);
          })
          .attr("r", 5)
          .attr("fill", function (d, i) {
            return "rgb(" + i * 8 + ",0,0)";
          })
          .attr("class", "suffering")
          .on("mouseover", function (d) {
            d3.select(this).attr("opacity", 0.8);
            // Show the tooltip
            d3.select("#tooltip2")
              .html(
                "Population: " +
                  d3.format(",")(d.population) +
                  "<br>Number of people suffering: " +
                  d3.format(",")(d.all)
              )
              .style("left", d3.event.pageX + 10 + "px")
              .style("top", d3.event.pageY - 30 + "px")
              .classed("hidden", false);
          })
          .on("mouseout", function () {
            d3.select(this).attr("opacity", 1);
            // Hide the tooltip
            d3.select("#tooltip2").classed("hidden", true);
          });

        // Add x-axis
        let allAxis = d3
          .axisBottom(allScale)
          .ticks(6)
          .tickFormat(d3.format(".2s"));
        svg3
          .append("g")
          .attr("class", "xAxis")
          .attr("transform", "translate(0," + (height - padding) + ")")
          .style("stroke-width", "2px")
          .attr("font-weight", "bold")
          .call(allAxis);
        svg3
          .append("text")
          .text("The number of Vietnamese suffering from depression")
          .attr("class", "Axis-label")
          .attr("text-anchor", "middle")
          .attr("x", width / 4 + 46)
          .attr("y", height - padding * 0.6)
          .attr("font-weight", "bold")
          .attr("font-size", 14);

        // Add y-axis
        let popAxis = d3
          .axisLeft(popScale)
          .ticks(5)
          .tickFormat(d3.format(".3s"));
        svg3
          .append("g")
          .attr("class", "yAxis")
          .attr("transform", "translate(" + padding + ",0)")
          .style("stroke-width", "2px")
          .attr("font-weight", "bold")
          .call(popAxis);
        svg3
          .append("text")
          .text("Population")
          .attr("class", "Axis-label")
          .attr("text-anchor", "middle")
          .attr("x", -height / 2)
          .attr("y", padding / 2 - 10)
          .attr("font-size", 14)
          .attr("font-weight", "bold")
          .attr("transform", "rotate(-90)");

        d3.selectAll("#play-btn-4").on("click", function () {
          let currentData = data.slice(0, 0);

          let interval = setInterval(() => {
            if (currentData.length < 28) {
              currentData.push(data[currentData.length]);
            }
            // Update the scales
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

            // Add new scatter plot elements
            const update2 = svg3.selectAll(".suffering").data(currentData);
            update2
              .enter()
              .append("circle")
              .attr("cx", width)
              .attr("cy", 0)
              .on("mouseover", function (d) {
                d3.select(this).attr("opacity", 0.8);
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
                d3.select(this).attr("opacity", 1);
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
              .attr("fill", function (d, i) {
                return "rgb(" + i * 8 + ",0,0)";
              })
              .attr("class", "suffering");

            update2.exit().remove();
            svg3
              .select(".xAxis")
              .call(d3.axisBottom(allScale).tickFormat(d3.format(".2s")));
            svg3
              .select(".yAxis")
              .call(d3.axisLeft(popScale).tickFormat(d3.format(".3s")));
          }, 150);
          setTimeout(function () {
            clearInterval(interval);
            currentData = data.slice(0, 0);
          }, 4200);
        });
      } else {
        console.log(error);
      }
    }
  );
}
