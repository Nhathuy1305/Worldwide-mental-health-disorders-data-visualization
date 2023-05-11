const data = [
  { category: "Nhẹ", value: 75 },
  { category: "Tối thiểu", value: 89 },
  { category: "Trung bình", value: 49 },
  { category: "Bình thường", value: 51 },
  { category: "Nặng", value: 27 },
];

const legendWidth = 120, // width of the legend
  legendHeight = data.length * 25, // height of the legend based on number of categories
  width = legendWidth + 450, // total width of chart
  height = Math.max(legendHeight, 380); // total height of chart

const svg = d3.select("svg").attr("width", width).attr("height", height);

let g = svg
  .append("g")
  .attr("transform", `translate(${width / 2}, ${height / 2})`);

const color = d3.scaleOrdinal([
  "#ade3fb",
  "#079ee3",
  "#076ba9",
  "#005095",
  "#031347",
]);

const radius = Math.min(width, height) / 2 - 20;

const pie = d3.pie().value((d) => d.value);

const path = d3.arc().outerRadius(radius).innerRadius(0);

const label = d3
  .arc()
  .outerRadius(radius)
  .innerRadius(radius - 100);

const arcs = g
  .selectAll(".arc")
  .data(pie(data))
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
    d3.select(this).transition().duration(200).attr("transform", `scale(1.1)`);
  })
  .on("mouseout", function () {
    d3.select(this).transition().duration(200).attr("transform", `scale(1)`);
  });

arcs
  .append("text")
  .attr("transform", (d) => `translate(${label.centroid(d)})`)
  .text((d) => `${d.data.category} (${d.data.value})`) // modified to include value
  .attr("text-anchor", "middle")
  .attr("fill", "white")
  .attr("dy", "0.35em");

// Create legend
const legend = svg
  .append("g")
  .attr("transform", `translate(${width - legendWidth}, 20)`)
  .selectAll("g")
  .data(data)
  .enter()
  .append("g")
  .attr("transform", (d, i) => `translate(0,${i * 25})`);

legend
  .append("rect")
  .attr("width", 20)
  .attr("height", 20)
  .attr("fill", (d) => color(d.category));

legend
  .append("text")
  .attr("x", 30)
  .attr("y", 15)
  .text((d) => d.category)
  .attr("text-anchor", "start")
  .attr("alignment-baseline", "central");
