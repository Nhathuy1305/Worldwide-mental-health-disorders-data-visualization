// Load data from CSV file
d3.csv("../assets/education/education-frequency.csv").then(function (data) {
  // Convert data types from string to number
  data.forEach(function (d) {
    d.label = d["Mức độ thường xuyên nghĩ đến việc tự sát"];
    d.value = parseInt(d[" Số lượng người mắc phải"]);
  });

  const options = {
    block: {
      dynamicHeight: true,
      minHeight: 20,
      fill: {
        type: "gradient",
        gradient: ["#87CEFA", "#1E90FF"],
      },
    },
    label: {
      fontFamily: "Arial",
      fontSize: "14px",
      fill: "white",
    },
  };

  // Create the chart
  const chart = new D3Funnel("#funnel");
  chart.draw(data, options);

  // Add tooltip on block hover
  chart
    .blocks()
    .on("mouseover", function (block) {
      const tooltip = d3.select("#tooltip");
      tooltip.transition().duration(200).style("opacity", 0.9);
      tooltip
        .html(
          "<strong>" +
            block.label.raw +
            "</strong><br>" +
            block.value.toLocaleString() +
            " people"
        )
        .style("left", d3.event.pageX + 10 + "px")
        .style("top", d3.event.pageY - 28 + "px");
    })
    .on("mousemove", function (block) {
      const tooltip = d3.select("#tooltip");
      tooltip
        .style("left", d3.event.pageX + 10 + "px")
        .style("top", d3.event.pageY - 28 + "px");
    })
    .on("mouseout", function () {
      d3.select("#tooltip").transition().duration(500).style("opacity", 0);
    });

  // Add click event on blocks
  chart.blocks().on("click", function (block) {
    console.log("Block clicked: " + block.label.raw);
  });

  // Add resize event on window
  window.addEventListener("resize", function () {
    chart.resize();
  });
});
