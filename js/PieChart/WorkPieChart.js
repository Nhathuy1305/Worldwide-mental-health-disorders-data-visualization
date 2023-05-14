d3.csv("../assets/work/work.csv").then((data) => {
  const categories = ["Tối thiểu", "Nhẹ", "Trung bình", "Bình thường", "Nặng"];

  const categoryCounts = categories.map((category) =>
    data.reduce((count, d) => {
      return d["Mức độ"] === category ? count + 1 : count;
    }, 0)
  );

  console.log(categoryCounts);

  const newData = categories.map((category, i) => {
    return { category, value: categoryCounts[i] };
  });

  console.log(newData);

  const color = d3
    .scaleOrdinal()
    .domain(categories)
    .range(["#ade3fb", "#079ee3", "#076ba9", "#005095", "#031347"]);

  const legendWidth = 120,
    legendHeight = categories.length * 15,
    width = legendWidth + 550,
    height = Math.max(legendHeight, 350);

  const svg = d3
    .select("#pie-chart")
    .attr("width", width)
    .attr("height", height);

  let g = svg
    .append("g")
    .attr("transform", `translate(${width / 2 - 150}, ${height / 2 - 0})`);

  const radius = Math.min(width, height) / 2 - 1;

  const pie = d3
    .pie()
    .value((d) => d.value)
    .sort(null);

  const path = d3.arc().outerRadius(radius).innerRadius(0);

  const label = d3
    .arc()
    .outerRadius(radius)
    .innerRadius(radius - 100);

  const arcs = g
    .selectAll(".arc")
    .data(pie(newData))
    .enter()
    .append("g")
    .attr("class", "arc");

  arcs
    .append("path")
    .attr("d", path)
    .attr("fill", (d) => color(d.data.category))
    .attr("stroke", "white")
    .attr("stroke-width", "2px")
    .on("mouseover", function () {
      d3.select(this)
        .transition()
        .duration(200)
        .attr("transform", `scale(1.1)`);
    })
    .on("mouseout", function () {
      d3.select(this).transition().duration(200).attr("transform", `scale(1)`);
    });

  const total = newData.reduce((acc, curr) => acc + curr.value, 0); // get the total value

  arcs
    .append("text")
    .attr("transform", (d) => `translate(${label.centroid(d)})`)
    .text(
      (d) =>
        `${d.data.category} (${d.data.value}, ${(
          (d.data.value / total) *
          100
        ).toFixed(2)}%)`
    )
    .attr("text-anchor", "middle")
    .attr("fill", "white")
    .attr("dy", "0.35em");

  const legend = svg
    .append("g")
    .attr("transform", `translate(${width - legendWidth - 150}, 20)`)
    .selectAll("g")
    .data(categories)
    .enter()
    .append("g")
    .attr("transform", (d, i) => `translate(0,${i * 0.5 * legendHeight})`);

  legend
    .append("rect")
    .attr("width", 20)
    .attr("height", 20)
    .attr("fill", (d) => color(d));

  legend
    .append("text")
    .text((d) => d)
    .attr("fill", "black")
    .attr("x", 25)
    .attr("y", 14);
});
