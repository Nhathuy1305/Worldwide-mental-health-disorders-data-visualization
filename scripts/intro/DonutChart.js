d3.csv("../assets/LGBT.csv").then((data) => {
  donutChart(data);
});

function donutChart(data) {
  var counts = {};
  for (var i = 0; i < data.length; i++) {
    var lgbt = data[i].LGBT;
    counts[lgbt] = counts[lgbt] ? counts[lgbt] + 1 : 1;
  }

  var bins = [];
  for (var lgbt in counts) {
    bins.push({ lgbt: lgbt, freq: counts[lgbt] });
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

  var color = d3.scaleOrdinal().range(["#95FF9A", "#95ECFF", "#95ABFF"]);

  var pie = d3
    .pie()
    .sort(null)
    .value(function (d) {
      return d.freq;
    });

  var arc = d3
    .arc()
    .innerRadius(radius * 0.5)
    .outerRadius(radius * 0.8);

  var outerArc = d3
    .arc()
    .innerRadius(radius * 0.9)
    .outerRadius(radius * 0.9);

  svg.selectAd3.csv("../assets/Sex.csv").then((data) => {
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
      width = 200 - margin.left - margin.right,
      height = 200 - margin.top - margin.bottom,
      color = d3.scaleOrdinal().range(["#fc749d", "#f7bed0"]);

    var svg = d3
      .select("body")
      .append("svg")
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
  ll("path.slice")
    .data(pie(bins))
    .enter()
    .append("path")
    .attr("class", "slice")
    .attr("d", arc)
    .attr("fill", function (d) {
      return color(d.data.lgbt);
    })
    .attr("stroke", "black")
    .attr("stroke-width", "2px")
    .style("opacity", 0.7);

  svg
    .selectAll("allPolylines")
    .data(pie(bins))
    .enter()
    .append("polyline")
    .attr("stroke", "black")
    .style("fill", "none")
    .attr("stroke-width", 1)
    .attr("points", function (d) {
      var posA = arc.centroid(d);
      var posB = outerArc.centroid(d);
      var posC = outerArc.centroid(d);
      var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
      posC[0] = radius * 0.7 * (midangle < Math.PI ? 1 : -1);
      return [posA, posB, posC];
    });

  svg
    .selectAll("allLabels")
    .data(pie(bins))
    .enter()
    .append("text")
    .text(function (d) {
      return d.data.freq;
    })
    .attr("transform", function (d) {
      var pos = outerArc.centroid(d);
      var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
      pos[0] = radius * 0.75 * (midangle < Math.PI ? 1 : -1);
      return "translate(" + pos + ")";
    })
    .style("text-anchor", function (d) {
      var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
      return midangle < Math.PI ? "start" : "end";
    });

  var legend = svg
    .selectAll(".legend")
    .data(color.domain())
    .enter()
    .append("g")
    .attr("class", "legend")
    .attr("transform", function (d, i) {
      return "translate(" + -width / 50 + "," + (i * 25 + 100) + ")";
    });

  legend
    .append("rect")
    .attr("x", radius + 30)
    .attr("width", 18)
    .attr("height", 18)
    .style("fill", function (d) {
      return color(d);
    });

  legend
    .append("text")
    .attr("x", radius + 26)
    .attr("y", 9)
    .attr("dy", ".35em")
    .style("text-anchor", "end")
    .text(function (d) {
      return d;
    });
}
