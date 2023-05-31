d3.csv("../assets/Pressure.csv").then((data) => {
  verticalBarChart(data);
});

function verticalBarChart(data) {
  var counts = {};
  for (var i = 0; i < data.length; i++) {
    var category = data[i].Category;
    counts[category] = counts[category] ? counts[category] + 1 : 1;
  }

  var bins = [];
  for (var category in counts) {
    bins.push({ category: category, freq: counts[category] });
  }

  bins.sort(function (a, b) {
    return d3.descending(a.freq, b.freq);
  });

  var margin = { top: 50, right: 50, bottom: 50, left: 50 },
    width = 500 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

  var svg = d3
    .select("body")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var x = d3
    .scaleBand()
    .domain(
      bins.map(function (d) {
        return d.category;
      })
    )
    .range([0, width])
    .padding(0.1);

  var y = d3.scaleLinear().domain([0, 400]).range([height, 0]);

  svg
    .append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  svg.append("g").call(d3.axisLeft(y));

  svg
    .selectAll("rect")
    .data(bins)
    .enter()
    .append("rect")
    .attr("x", function (d, i) {
      return x(d.category) + x.bandwidth() / 2 - 25;
    })
    .attr("y", function (d) {
      return y(d.freq);
    })
    .attr("width", 50)
    .attr("height", function (d) {
      return height - y(d.freq);
    })
    .attr("fill", "#fec8d8");

  svg
    .selectAll(".text")
    .data(bins)
    .enter()
    .append("text")
    .attr("class", "label")
    .attr("x", function (d) {
      return x(d.category) + x.bandwidth() / 2;
    })
    .attr("y", function (d) {
      return y(d.freq) - 5;
    })
    .text(function (d) {
      return d.freq;
    })
    .attr("text-anchor", "middle");
}
