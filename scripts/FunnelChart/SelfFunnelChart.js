d3.csv("../assets/self/self.csv").then((data) => {
  const label = [
    "Chưa từng",
    "Một - hai lần",
    "Rất nhiều",
    "Khoảng năm lần",
    "Khoảng 10 lần",
  ];

  const englishLabels = [
    "Never",
    "One or two times",
    "Very often",
    "About five times",
    "About ten times",
  ];

  const labelCounts = label.map((category) =>
    data.reduce((count, d) => {
      return d["Bạn từng nghĩ tới việc t.ự s.á.t bao nhiêu lần?"] === category
        ? count + 1
        : count;
    }, 0)
  );

  console.log(labelCounts);

  const total = labelCounts.reduce((sum, count) => sum + count, 0);
  const percentages = labelCounts.map(
    (count) => ((count / total) * 100).toFixed(2) + "%"
  );

  console.log(total);

  const newData = label
    .map((label, i) => {
      return {
        label: englishLabels[i],
        value: labelCounts[i],
        percentage: percentages[i],
      };
    })
    .sort((a, b) => b.value - a.value); // sort data in descending order

  console.log(newData);

  const margin = { top: 20, right: 20, bottom: 20, left: 100 };
  const width = 500 - margin.left - margin.right;
  const height = 300 - margin.top - margin.bottom;

  const xScale = d3
    .scaleLinear()
    .domain([0, d3.max(newData, (d) => d.value)])
    .range([0, width]);

  const yScale = d3
    .scaleBand()
    .domain(newData.map((d) => d.label))
    .range([0, height]) // Reverse the range to display the graph upside down
    .padding(0.2);

  // Add event listener to the entire document
  d3.select(document).on("click", function (event) {
    const isChartClicked = d3.select(event.target).classed("bar");

    // Check if the clicked element is within the chart area
    if (!isChartClicked) {
      // Reset the chart to its default state
      svg
        .selectAll(".bar")
        .style("opacity", 1)
        .attr("fill", "#ade3fb")
        .each(function (data) {
          data.clicked = false;
        });

      tooltip.transition().duration(200).style("opacity", 0);
      svg.select(".total-text").text(`Total: ${total} (${100}%)`);
    }
  });

  const svg = d3
    .select("svg") // Select the SVG element already appended to the DOM
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left + 20},${margin.top})`);

  // Add category labels on the left vertical axis
  svg
    .append("g")
    .attr("class", "axis")
    .call(d3.axisLeft(yScale).tickSize(0))
    .selectAll("text")
    .attr("dy", -5)
    .attr("dx", -margin.left - 15)
    .style("text-anchor", "start")
    .style("font-size", "15px");

  // Add tooltip
  const tooltip = d3
    .select("body") // Select the body element to append the tooltip
    .append("div")
    .attr("id", "tooltip")
    .style("opacity", 0)
    .style("background-color", "rgba(0, 0, 0, 0.7)")
    .style("color", "white")
    .style("padding", "10px") // Increase the padding to make the tooltip box bigger
    .style("border-radius", "4px")
    .style("font-size", "20px")
    .style("position", "absolute")
    .style("pointer-events", "none");

  // Add total count and percentage text
  svg
    .append("text")
    .attr("class", "total-text")
    .attr("x", width + margin.left - 100)
    .attr("y", height + 10)
    .style("text-anchor", "end")
    .style("font-size", "18px")
    .style("font-weight", "bold")
    .text(`Total: ${total} (${100}%)`)
    .style("color", "#13388e");

  svg
    .selectAll(".bar")
    .data(newData)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", (d) => (width - xScale(d.value)) / 2) // center the bars
    .attr("y", (d) => yScale(d.label))
    .attr("width", (d) => xScale(d.value))
    .attr("height", yScale.bandwidth())
    .attr("fill", "#ade3fb")
    .style("cursor", "pointer") // add cursor style for interaction
    .on("mouseover", function (d, event) {
      d3.select(this)
        .attr("fill", "#ade3fb")
        .selectAll(".bar-text")
        .style("fill", "white"); // change text color to white
      tooltip.transition().duration(500).style("opacity", 0);
    })
    .on("mouseout", function () {
      d3.select(this).attr("fill", "#ade3fb");
      tooltip.transition().duration(500).style("opacity", 0);
    })
    .on("click", function (event, d) {
      const clickedBar = d3.select(this);
      const isClicked = !d.clicked;

      svg
        .selectAll(".bar")
        .style("opacity", function (data) {
          if (data === d) {
            data.clicked = isClicked;
            return isClicked ? 1 : 0.2;
          } else {
            data.clicked = false;
            return 0.2;
          }
        })
        .attr("fill", (data) => (data.clicked ? "#94d9f7" : "#ade3fb"));

      if (isClicked) {
        const percentage = ((d.value / total) * 100).toFixed(2);
        tooltip.transition().duration(200).style("opacity", 0.9);
        tooltip
          .html(`Value: ${d.value} </br> (${percentage}%)`)
          .style("left", `${event.pageX + 10}px`)
          .style("top", `${event.pageY - 28}px`);
        svg.select(".total-text").text(`Total: ${d.value} (${percentage}%)`);
      } else {
        tooltip.transition().duration(200).style("opacity", 0);
        svg.select(".total-text").text(`Total: ${total} (${100}%)`);
      }

      d3.select("#info-box").text(info);
    });
  svg
    .selectAll(".bar-text") // Add text elements for values
    .data(newData)
    .enter()
    .append("text")
    .attr("class", "bar-text")
    .attr("x", (d) => (width - xScale(d.value)) / 2 + xScale(d.value) / 2) //
    .attr("y", (d) => yScale(d.label) + yScale.bandwidth() / 2 + 5)
    .style("font-size", "16px")
    .style("text-anchor", "middle")
    .style("dominant-baseline", "middle") // Center-align the text vertically
    .style("fill", "#00316E") // Set the text color to white
    .style("font-weight", "bold")
    .text((d) => d.value);
});
