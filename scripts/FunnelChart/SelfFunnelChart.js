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

  const total = labelCounts.reduce((sum, count) => sum + count, 0);
  const percentages = labelCounts.map(
    (count) => ((count / total) * 100).toFixed(2) + "%"
  );

  const newData = label
    .map((label, i) => {
      return {
        label: englishLabels[i],
        value: labelCounts[i],
        percentage: percentages[i],
      };
    })
    .sort((a, b) => b.value - a.value); // sort data in descending order

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
    .style("padding", "8px")
    .style("border-radius", "4px")
    .style("position", "absolute")
    .style("pointer-events", "none");

  // Add total count and percentage text
  svg
    .append("text")
    .attr("class", "total-text")
    .attr("x", width + margin.left + 10)
    .attr("y", height - 10)
    .style("text-anchor", "end")
    .style("font-size", "12px")
    .text(`Total: ${total} (${100}%)`);

  svg
    .selectAll(".bar")
    .data(newData)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", (d) => (width + 5 - xScale(d.value)) / 2) // center the bars
    .attr("y", (d) => yScale(d.label))
    .attr("width", (d) => xScale(d.value))
    .attr("height", yScale.bandwidth())
    .attr("fill", "#ade3fb")
    .on("mouseover", function (d, event) {
      d3.select(this).attr("fill", "#005095");
      tooltip.transition().duration(200).style("opacity", 0.9);
      tooltip
        .html(`${d.label}: ${d.value}`)
        .style("left", event.pageX + 10 + "px")
        .style("top", event.pageY - 28 + "px");
    })
    .on("mouseout", function () {
      d3.select(this).attr("fill", "#ade3fb");
      tooltip.transition().duration(500).style("opacity", 0);
    })
    .on("click", function (d) {
      // Get the current fill color of the clicked bar
      const currentFill = d3.select(this).attr("fill");
      // Check if the current fill color is the original color
      const isOriginalColor = currentFill === "#ade3fb";
      // Change the color of all bars to the original color
      svg.selectAll(".bar").attr("fill", "#ade3fb");
      // Change the color of the clicked bar to a darker shade if it was the original color
      if (isOriginalColor) {
        d3.select(this).attr("fill", "#003b5c");
      }
    })
    .each(function (d) {
      // Add label counts to each bar
      svg
        .append("text")
        .attr("class", "bar-label")
        .attr("x", (width + 5 - xScale(d.value)) / 2 + xScale(d.value) + 5)
        .attr("y", yScale(d.label) + yScale.bandwidth() / 2)
        .attr("dy", "0.35em")
        .style("font-size", "12px")
        .style("fill", "white")
        .style("text-anchor", "start")
        .text(d.value);
    });

  // Update total count and percentage text when data changes
  function updateTotalText() {
    svg
      .select(".total-text")
      .text(`Total: ${total} (${100}%)`)
      .transition()
      .duration(500);
  }
});
