d3.csv("../assets/Academic Level.csv").then((data) => {
  treemap(data);
});

function treemap(data) {
  var counts = {};
  for (var i = 0; i < data.length; i++) {
    var academicLevel = data[i].AcademicLevel;
    counts[academicLevel] = counts[academicLevel]
      ? counts[academicLevel] + 1
      : 1;
  }

  var bins = [];
  for (var academicLevel in counts) {
    bins.push({ academicLevel: academicLevel, freq: counts[academicLevel] });
  }

  console.log(bins);

  var margin = { top: 10, right: 10, bottom: 10, left: 10 },
    width = 1250 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

  var svg = d3
    .select("body")
    .append("svg")
    .attr("width", width + margin.left + margin.right + 2000)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var root = d3.hierarchy({ children: bins }).sum(function (d) {
    return d.freq;
  });

  d3
    .treemap()
    .size([width, height])
    .paddingTop(28)
    .paddingRight(7)
    .paddingInner(3)(root);

  var opacity = d3.scaleLinear().domain([0, 400]).range([0.5, 1]);

  svg
    .selectAll("rect")
    .data(root.leaves())
    .enter()
    .append("rect")
    .attr("x", function (d) {
      return d.x0;
    })
    .attr("y", function (d) {
      return d.y0;
    })
    .attr("width", function (d) {
      return d.x1 - d.x0;
    })
    .attr("height", function (d) {
      return d.y1 - d.y0;
    })
    .style("stroke", "black")
    .style("fill", "#A7C1EB")
    .style("opacity", function (d) {
      return opacity(d.data.freq);
    });

  svg
    .selectAll("text")
    .data(root.leaves())
    .enter()
    .append("text")
    .attr("x", function (d) {
      return d.x0 + 10;
    })
    .attr("y", function (d) {
      return d.y0 + 20;
    })
    .text(function (d) {
      return d.data.academicLevel;
    })
    .attr("font-size", "15px")
    .attr("fill", "black");
}
