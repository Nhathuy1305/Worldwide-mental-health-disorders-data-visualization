d3.csv("../assets/Sex.csv").then((data) => {
  horizontalBarChart(data);
});

function horizontalBarChart(data) {
  var counts = {};
  for (var i = 0; i < data.length; i++) {
    var sex = data[i].Sex;
    counts[sex] = counts[sex] ? counts[sex] + 1 : 1;
  }

  var bins = [];
  for (var sex in counts) {
    bins.push({ sex: sex, freq: counts[sex] });
  }

  var margin = { top: 50, right: 50, bottom: 50, left: 50 },
    width = 600 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom,
    color = d3.scaleOrdinal().range(["#fc749d", "#f7bed0"]);

  var svg = d3
    .select("body")
    .append("svg")
    .attr("class", "chart-1")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var x = d3.scaleLinear().domain([0, 600]).range([0, width]);

  var y = d3
    .scaleBand()
    .domain(
      bins.map(function (d) {
        return d.sex;
      })
    )
    .range([height, 0])
    .padding(0.1);

  svg.append("g").call(d3.axisLeft(y));

  svg
    .append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  svg
    .selectAll("rect")
    .data(bins)
    .enter()
    .append("rect")
    .attr("x", x(0))
    .attr("y", function (d) {
      return y(d.sex) + y.bandwidth() / 2 - 25;
    })
    .attr("width", function (d) {
      return x(d.freq);
    })
    .attr("height", 50)
    .attr("fill", function (d) {
      return color(d.sex);
    });

  svg
    .selectAll(".text")
    .data(bins)
    .enter()
    .append("text")
    .attr("class", "label")
    .attr("x", function (d) {
      return x(d.freq) / 2;
    })
    .attr("y", function (d) {
      return y(d.sex) + y.bandwidth() / 2 + 5;
    })
    .text(function (d) {
      return d.freq;
    });
}
