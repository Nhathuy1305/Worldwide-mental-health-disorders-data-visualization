d3.csv("../assets/Condition.csv").then((data) => {
  pieChart(data);
});

function pieChart(data) {
  var counts = {};
  for (var i = 0; i < data.length; i++) {
    var condition = data[i].Condition;
    counts[condition] = counts[condition] ? counts[condition] + 1 : 1;
  }

  var bins = [];
  for (var condition in counts) {
    bins.push({ condition: condition, freq: counts[condition] });
  }

  var width = 500,
    height = 500,
    margin = 50,
    radius = Math.min(width, height) / 2 - margin;

  var svg = d3
    .select("body")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

  var color = d3
    .scaleOrdinal()
    .range(["#FFDBF5", "#C2C3F5", "#FFF8E8", "#BFE3DF", "#EE9D94"]);

  var pie = d3
    .pie()
    .value(function (d) {
      return d.freq;
    });

  var arcGenerator = d3.arc().innerRadius(0).outerRadius(radius);

  svg
    .selectAll("pie")
    .data(pie(bins))
    .enter()
    .append("path")
    .attr("d", d3.arc().innerRadius(0).outerRadius(radius))
    .attr("fill", function (d) {
      return color(d.data.condition);
    })
    .attr("stroke", "black")
    .style("stroke-width", "2px")
    .style("opacity", 0.7);

  svg
    .selectAll("label")
    .data(pie(bins))
    .enter()
    .append("text")
    .text(function (d) {
      return (
        d.data.condition + ":\n" + ((d.data.freq / 1000) * 100).toFixed(2) + "%"
      );
    })
    .attr("transform", function (d) {
      return "translate(" + arcGenerator.centroid(d) + ")";
    })
    .style("text-anchor", "middle")
    .style("font-size", 12);
}
