d3.csv("../assets/family/family.csv").then((data) => {
  const categories = ["Tối thiểu", "Nhẹ", "Trung bình", "Bình thường", "Nặng"];
  const englishCategories = ["Minimum", "Mild", "Moderate", "Normal", "Severe"];

  const categoryCounts = categories.map((category) =>
    data.reduce((count, d) => {
      return d["Mức độ"] === category ? count + 1 : count;
    }, 0)
  );

  console.log(categoryCounts);

  const newData = categories.map((category, i) => {
    return { category: englishCategories[i], value: categoryCounts[i] };
  });

  console.log(newData);

  const color = d3
    .scaleOrdinal()
    .domain(categories)
    .range(["#ade3fb", "#079ee3", "#076ba9", "#005095", "#031347"]);

  const legendWidth = 120,
    legendHeight = categories.length * 15,
    width = Math.max(legendWidth + 500, 400),
    height = Math.max(legendHeight, 350);

  const svg = d3
    .select("#pie-chart")
    .attr("width", width)
    .attr("height", height);

  let g = svg
    .append("g")
    .attr("transform", `translate(${width / 2 - 70}, ${height / 2})`);

  const radius = Math.min(width, height) / 2 - 20;

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

  const tooltip = d3
    .select("body")
    .append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

  let percentage;

  const tooltipWidth = 120;
  const tooltipHeight = 60;

  arcs
    .append("path")
    .attr("d", path)
    .attr("fill", (d) => color(d.data.category))
    .attr("stroke", "white")
    .attr("stroke-width", "2px")
    .style("opacity", (d) => (d.clicked ? 1.5 : 1.5))
    .on("mouseover", function (event, d) {
      d3.select(this)
        .transition()
        .duration(200)
        .attr("transform", `scale(1.1)`);
      percentage = ((d.data.value / total) * 100).toFixed(2);
      tooltip.transition().duration(200);
      tooltip
        .html(`Value: ${d.data.value}, ${percentage}%`)
        .style("left", event.pageX + "px")
        .style("top", event.pageY - 28 + "px");
    })
    .on("mouseout", function () {
      d3.select(this).transition().duration(200).attr("transform", `scale(1)`);
    })
    .on("click", function (event, d) {
      const clickedArc = d3.select(this);
      const isClicked = !d.clicked;

      arcs
        .style("opacity", function (data) {
          if (data === d) {
            data.clicked = isClicked;
            return isClicked ? 1 : 0.2;
          } else {
            data.clicked = false;
            return 0.2;
          }
        })
        .attr("fill", (data) =>
          data.clicked
            ? color(data.data.category)
            : d3.color(color(data.data.category)).brighter(0.5)
        );
      if (isClicked) {
        const percentage = ((d.data.value / total) * 100).toFixed(2);
        tooltip.transition().duration(200).style("opacity", 0.9);
        tooltip
          .html(`Value: ${d.data.value}, ${percentage}%`)
          .style("left", event.pageX + "px")
          .style("top", event.pageY - 28 + "px");
      } else {
        tooltip.transition().duration(200).style("opacity", 0);
      }

      d3.select("#info-box").text(info);
    });

  const total = newData.reduce((acc, curr) => acc + curr.value, 0); // get the total value

  const lines = arcs
    .append("line")
    .attr("x1", (d) => label.centroid(d)[0])
    .attr("y1", (d) => label.centroid(d)[1])
    .attr("x2", (d) => {
      const centroid = label.centroid(d);
      const midAngle = Math.atan2(centroid[1], centroid[0]);
      const x = Math.cos(midAngle) * (radius + 10);
      return x;
    })
    .attr("y2", (d) => {
      const centroid = label.centroid(d);
      const midAngle = Math.atan2(centroid[1], centroid[0]);
      const y = Math.sin(midAngle) * (radius + 10);
      return y;
    })
    .attr("stroke", "#076ba9")
    .attr("stroke-width", "0.5px");

  const lineTexts = arcs
    .append("text")
    .attr("transform", (d) => {
      const centroid = label.centroid(d);
      const midAngle = Math.atan2(centroid[1], centroid[0]);
      const x = Math.cos(midAngle) * (radius + 15);
      const y = Math.sin(midAngle) * (radius + 15);
      return `translate(${x}, ${y})`;
    })
    .text((d) => {
      const percentage = ((d.data.value / total) * 100).toFixed(2);
      return `${d.data.category}`;
    })
    .attr("text-anchor", (d) => {
      const centroid = label.centroid(d);
      return centroid[0] >= 0 ? "start" : "end";
    })
    .attr("fill", "black")
    .attr("dy", "0.35em");

  const legend = svg
    .append("g")
    .attr("transform", `translate(${width - legendWidth - 20}, 20)`)
    .selectAll("g")
    .data(englishCategories)
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

  legend.on("click", function (event, d) {
    const clickedLegend = d3.select(this);
    const isClicked = !d.clicked;

    // Update the clicked property for both arc data and legend data
    arcs.each(function (data) {
      if (data.data.category === d) {
        data.clicked = isClicked;
      } else {
        data.clicked = false;
      }
    });

    legend.each(function (data) {
      if (data === d) {
        data.clicked = isClicked;
      } else {
        data.clicked = false;
      }
    });

    // Update the opacity and fill color of arcs based on the clicked property
    arcs
      .style("opacity", function (data) {
        return data.clicked ? 1 : 0.2;
      })
      .attr("fill", function (data) {
        return data.clicked
          ? color(data.data.category)
          : d3.color(color(data.data.category)).brighter(0.5);
      });

    // Update the opacity and fill color of legend items based on the clicked property
    legend.select("rect").attr("fill", function (data) {
      return data.clicked ? color(data) : d3.color(color(data)).brighter(0.5);
    });

    legend.select("text").attr("fill", function (data) {
      return data.clicked ? "black" : "#777";
    });

    if (isClicked) {
      const clickedArc = arcs.filter((data) => data.data.category === d);
      const percentage = (
        (clickedArc.datum().data.value / total) *
        100
      ).toFixed(2);

      tooltip.transition().duration(200).style("opacity", 0.9);
      tooltip
        .html(`Value: ${clickedArc.datum().data.value}, ${percentage}%`)
        .style("left", `${width / 2 + centroid[0]}px`)
        .style("top", `${height / 2 + centroid[1]}px`)
        .style("transform", `translate(-50%, -50%)`); // Adjust the tooltip position
    } else {
      tooltip.transition().duration(200).style("opacity", 0);
    }

    // Make the colors of other legend items lighter
    legend
      .filter(function (data) {
        return data !== d;
      })
      .select("rect")
      .attr("fill", function (data) {
        return d3.color(color(data)).brighter(0.5);
      });

    legend
      .filter(function (data) {
        return data !== d;
      })
      .select("text")
      .attr("fill", "#777");

    d3.select("#info-box").text(info);
  });
});
