d3.csv("../assets/self/self.csv").then((data) => {
  const label = [
    "Chưa từng",
    "Một - hai lần",
    "Rất nhiều",
    "Khoảng năm lần",
    "Khoảng 10 lần",
  ];

  const labelCounts = label.map((category) =>
    data.reduce((count, d) => {
      return d["Bạn từng nghĩ tới việc t.ự s.á.t bao nhiêu lần?"] === category
        ? count + 1
        : count;
    }, 0)
  );

  console.log(labelCounts);

  const newData = label
    .map((label, i) => {
      return { label, value: labelCounts[i] };
    })
    .sort((a, b) => b.value - a.value); // sort data in descending order

  console.log(newData);

  const options = {
    block: {
      dynamicHeight: true,
      minHeight: 20,
      fill: {
        type: "gradient",
        gradient: ["#ade3fb", "#079ee3", "#076ba9", "#005095", "#031347"],
      },
      color: ["#031347", "#005095", "#ade3fb", "#ade3fb", "#ade3fb"],
    },
    label: {
      fontFamily: "Arial",
      fontSize: "18px",
      fill: "white",
    },
  };
  // Create the chart
  const chart = new D3Funnel("#funnel");
  chart.draw(newData, options);

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
