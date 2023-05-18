function age() {
    const width = 960,
        height = 480;

    const years = [
        {year: 1990, value: "data1"}, {year: 1991, value: "data2"}, {year: 1992, value: "data3"}, {year: 1993, value: "data4"},
        {year: 1994, value: "data5"}, {year: 1995, value: "data6"}, {year: 1996, value: "data7"}, {year: 1997, value: "data8"},
        {year: 1998, value: "data9"}, {year: 1999, value: "data10"}, {year: 2000, value: "data11"}, {year: 2001, value: "data12"},
        {year: 2002, value: "data13"}, {year: 2003, value: "data14"}, {year: 2004, value: "data15"}, {year: 2005, value: "data16"},
        {year: 2006, value: "data17"}, {year: 2007, value: "data18"}, {year: 2008, value: "data19"}, {year: 2009, value: "data20"},
        {year: 2010, value: "data21"}, {year: 2011, value: "data22"}, {year: 2012, value: "data23"}, {year: 2013, value: "data24"},
        {year: 2014, value: "data25"}, {year: 2015, value: "data26"}, {year: 2016, value: "data27"}, {year: 2017, value: "data28"}
    ]

    const options = [
        {name: "Equirectangular (Plate Carrée)", projection: d3.geoEquirectangular()},
    ];

    options.forEach(function(o) {
        o.projection.rotate([0, 0]).center([0, 0]);
    });

    let i = 0;
    let projection = options[i].projection;
    const path = d3.geoPath(projection);
    const svg = d3.select("body")
        .append("svg")
        .attr("class", "world")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", `0 23 ${width} 455`);

    svg.append("defs")
        .append("path")
        .datum({type: "Sphere"})
        .attr("id", "sphere")
        .attr("d", path);
    svg.append("use")
        .attr("class", "fill")
        .attr("xlink:href", "#sphere");

    function zoomToBoundingBox(bbox) {
        const [[x0, y0], [x1, y1]] = bbox;
        const bounds = [[x0, y0], [x1, y1]];

        // Compute the center of the bounding box
        const center = [
            (bounds[0][0] + bounds[1][0]) / 2,
            (bounds[0][1] + bounds[1][1]) / 2
        ];

        // Compute the zoom level based on the bounding box width
        const dx = bounds[1][0] - bounds[0][0];
        const dy = bounds[1][1] - bounds[0][1];
        const zoom = Math.min(12, 0.9 / Math.max(dx / width, dy / height));

        // Return the center and zoom level, but don't apply the zoom and pan to the map
        return { center, zoom };
    }

    const zoomFunction = d3.zoom()
        .scaleExtent([1, 8])
        .on("zoom", zoomed);

    function zoomed() {
        svg.selectAll("path")
            .attr("transform", d3.event.transform);
    }

    svg.call(zoomFunction);

    d3.select("body")
        .on("click", (event) => {
            const clickedElement = event.target;

            // Exclude clicks on the select element with an id of "years-menu"
            if (clickedElement.id !== "years-menu") {
                const { center, zoom } = zoomToBoundingBox([[10, 20], [30, 40]]);
                svg.transition().duration(750)
                    .call(zoomFunction.transform, d3.zoomIdentity
                        .translate(width / 2, height / 2)
                        .scale(zoom)
                        .translate(-projection(center)[0], -projection(center)[1])
                    );
            }
        });

    const menu = d3.select("#projection-menu")
        .on("change", change)
        .style("border-radius", "3px")
        .style("right", "210px")

    menu.selectAll("option")
        .data(options)
        .enter().append("option")
        .text(function(d) { return d.name; });

    function change() {
        const selectedOption = options[this.selectedIndex];
        update(selectedOption);
    }

    function update(option) {
        svg.selectAll("path").interrupt().transition()
            .duration(1000).ease(d3.easeLinear)
            .attrTween("d", projectionTween(projection, projection = option.projection))
    }

// Years
    const menuYear = d3.select("#years-menu")
        .style("border-radius", "3px")
        .style("right", "210px")

    menuYear.selectAll("option")
        .data(years)
        .enter().append("option")
        .attr("value", function(d) {
            return d.value;
        })
        .text(function(d) { return d.year; });

    const data = d3.map();

    const colorScale = d3.scaleThreshold()
        .domain([1, 2, 3, 4, 5, 6, 7])
        .range(d3.schemeRdPu[7]);

    function update1990() {
        svg.selectAll(".state").remove();

        d3.queue()
            .defer(d3.json, "data/world.geojson")
            .defer(d3.csv, "data/age_range_data.csv", function(d) {
                if (d.Year === "1990") {
                    data.set(d.Code, parseFloat(+d.AllAges));
                    console.log(parseFloat(d))
                }
            })
            .await(draw);

        function draw (error, world) {
            if (error) throw error;

            // create a group for the land path elements
            const landGroup = svg.append("g");

            // create a tooltip element and hide it initially
            const tooltip = d3.select("body").append("div")
                .attr("class", "tooltip")
                .style("opacity", 0);

            // add the land areas to the map as path elements
            landGroup.selectAll("path")
                .data(world.features)
                .enter()
                .append("path")
                // draw each country
                .attr("d", d3.geoPath()
                    .projection(projection)
                )
                // set the color of each country
                .attr("fill", function (d) {
                    d.total = data.get(d.id) || 0;
                    return colorScale(d.total);
                })
                .style("stroke", "transparent")
                .attr("class", function(d){ return "Country" } )
                .style("opacity", .8)
                // add event handlers for mouseover and mouseout events
                .on("mouseover", function(d) {
                    // change the fill color of the hovered path element
                    d3.selectAll(".Country")
                        .transition()
                        .duration(200)
                        .style("opacity", .5);
                    d3.select(this)
                        .transition()
                        .duration(200)
                        .style("opacity", 1)
                        .style("stroke", "black");
                    // show tooltip with country name and total value
                    tooltip.html(`<strong>${d.properties.name}</strong><br/>Age: ${d.total}`)
                        .style("left", (d3.event.pageX + 10) + "px")
                        .style("top", (d3.event.pageY + 10) + "px")
                        .transition()
                        .duration(200)
                        .style("opacity", .9);
                })
                .on("mouseout", function(d) {
                    // change the fill color of the previously hovered path element
                    d3.selectAll(".Country")
                        .transition()
                        .duration(200)
                        .style("opacity", .8);
                    d3.select(this)
                        .transition()
                        .duration(200)
                        .style("stroke", "transparent");
                    // hide tooltip
                    tooltip.transition()
                        .duration(200)
                        .style("opacity", 0);
                });
        }
    }

    update1990();

    d3.select("#years-menu").on("change", function() {
        const selectedOption = d3.select(this).property("value");
        if (selectedOption === "data2") {
            update1991();
        }
        else if (selectedOption === "data3") {
            update1992();
        }
        else if (selectedOption === "data4") {
            update1993();
        }
        else if (selectedOption === "data5") {
            update1994();
        }
        else if (selectedOption === "data6") {
            update1995();
        }
        else if (selectedOption === "data7") {
            update1996();
        }
        else if (selectedOption === "data8") {
            update1997();
        }
        else if (selectedOption === "data9") {
            update1998();
        }
        else if (selectedOption === "data10") {
            update1999();
        }
        else if (selectedOption === "data11") {
            update2000();
        }
        else if (selectedOption === "data12") {
            update2001();
        }
        else if (selectedOption === "data13") {
            update2002();
        }
        else if (selectedOption === "data14") {
            update2003();
        }
        else if (selectedOption === "data15") {
            update2004();
        }
        else if (selectedOption === "data16") {
            update2005();
        }
        else if (selectedOption === "data17") {
            update2006();
        }
        else if (selectedOption === "data18") {
            update2007();
        }
        else if (selectedOption === "data19") {
            update2008();
        }
        else if (selectedOption === "data20") {
            update2009();
        }
        else if (selectedOption === "data21") {
            update2010();
        }
        else if (selectedOption === "data22") {
            update2011();
        }
        else if (selectedOption === "data23") {
            update2012();
        }
        else if (selectedOption === "data24") {
            update2013();
        }
        else if (selectedOption === "data25") {
            update2014();
        }
        else if (selectedOption === "data26") {
            update2015();
        }
        else if (selectedOption === "data27") {
            update2016();
        }
        else if (selectedOption === "data28") {
            update2017();
        }
        else {
            update1990();
        }
    })

    function projectionTween(projection0, projection1) {
        return function(d) {
            let t = 0;
            const projection = d3.geoProjection(project)
                .scale(1)
                .translate([width / 2, height / 2]);
            const path = d3.geoPath(projection);

            function project(a, b) {
                a *= 180 / Math.PI, b *= 180 / Math.PI;
                const p0 = projection0([a, b]), p1 = projection1([a, b]);
                return [(1 - t) * p0[0] + t * p1[0], (1 - t) * -p0[1] + t * -p1[1]];
            }
            return function(_) {
                t = _;
                return path(d);
            };
        };
    }

    function update1991() {
        svg.selectAll(".state").remove();

        d3.queue()
            .defer(d3.json, "data/world.geojson")
            .defer(d3.csv, "data/age_range_data.csv", function(d) {
                if (d.Year === "1991") {
                    data.set(d.Code, parseFloat(+d.AllAges));
                    console.log(parseFloat(d))
                }
            })
            .await(draw);

        function draw (error, world) {
            if (error) throw error;

            // create a group for the land path elements
            const landGroup = svg.append("g");

            // create a tooltip element and hide it initially
            const tooltip = d3.select("body").append("div")
                .attr("class", "tooltip")
                .style("opacity", 0);

            // add the land areas to the map as path elements
            landGroup.selectAll("path")
                .data(world.features)
                .enter()
                .append("path")
                // draw each country
                .attr("d", d3.geoPath()
                    .projection(projection)
                )
                // set the color of each country
                .attr("fill", function (d) {
                    d.total = data.get(d.id) || 0;
                    return colorScale(d.total);
                })
                .style("stroke", "transparent")
                .attr("class", function(d){ return "Country" } )
                .style("opacity", .8)
                // add event handlers for mouseover and mouseout events
                .on("mouseover", function(d) {
                    // change the fill color of the hovered path element
                    d3.selectAll(".Country")
                        .transition()
                        .duration(200)
                        .style("opacity", .5);
                    d3.select(this)
                        .transition()
                        .duration(200)
                        .style("opacity", 1)
                        .style("stroke", "black");
                    // show tooltip with country name and total value
                    tooltip.html(`<strong>${d.properties.name}</strong><br/>Age: ${d.total}`)
                        .style("left", (d3.event.pageX + 10) + "px")
                        .style("top", (d3.event.pageY + 10) + "px")
                        .transition()
                        .duration(200)
                        .style("opacity", .9);
                })
                .on("mouseout", function(d) {
                    // change the fill color of the previously hovered path element
                    d3.selectAll(".Country")
                        .transition()
                        .duration(200)
                        .style("opacity", .8);
                    d3.select(this)
                        .transition()
                        .duration(200)
                        .style("stroke", "transparent");
                    // hide tooltip
                    tooltip.transition()
                        .duration(200)
                        .style("opacity", 0);
                });
        }
    }

    function update1992() {
        svg.selectAll(".state").remove();

        d3.queue()
            .defer(d3.json, "data/world.geojson")
            .defer(d3.csv, "data/age_range_data.csv", function(d) {
                if (d.Year === "1992") {
                    data.set(d.Code, parseFloat(+d.AllAges));
                    console.log(parseFloat(d))
                }
            })
            .await(draw);

        function draw (error, world) {
            if (error) throw error;

            // create a group for the land path elements
            const landGroup = svg.append("g");

            // create a tooltip element and hide it initially
            const tooltip = d3.select("body").append("div")
                .attr("class", "tooltip")
                .style("opacity", 0);

            // add the land areas to the map as path elements
            landGroup.selectAll("path")
                .data(world.features)
                .enter()
                .append("path")
                // draw each country
                .attr("d", d3.geoPath()
                    .projection(projection)
                )
                // set the color of each country
                .attr("fill", function (d) {
                    d.total = data.get(d.id) || 0;
                    return colorScale(d.total);
                })
                .style("stroke", "transparent")
                .attr("class", function(d){ return "Country" } )
                .style("opacity", .8)
                // add event handlers for mouseover and mouseout events
                .on("mouseover", function(d) {
                    // change the fill color of the hovered path element
                    d3.selectAll(".Country")
                        .transition()
                        .duration(200)
                        .style("opacity", .5);
                    d3.select(this)
                        .transition()
                        .duration(200)
                        .style("opacity", 1)
                        .style("stroke", "black");
                    // show tooltip with country name and total value
                    tooltip.html(`<strong>${d.properties.name}</strong><br/>Age: ${d.total}`)
                        .style("left", (d3.event.pageX + 10) + "px")
                        .style("top", (d3.event.pageY + 10) + "px")
                        .transition()
                        .duration(200)
                        .style("opacity", .9);
                })
                .on("mouseout", function(d) {
                    // change the fill color of the previously hovered path element
                    d3.selectAll(".Country")
                        .transition()
                        .duration(200)
                        .style("opacity", .8);
                    d3.select(this)
                        .transition()
                        .duration(200)
                        .style("stroke", "transparent");
                    // hide tooltip
                    tooltip.transition()
                        .duration(200)
                        .style("opacity", 0);
                });
        }
    }

    function update1993() {
        svg.selectAll(".state").remove();

        d3.queue()
            .defer(d3.json, "data/world.geojson")
            .defer(d3.csv, "data/age_range_data.csv", function(d) {
                if (d.Year === "1993") {
                    data.set(d.Code, parseFloat(+d.AllAges));
                    console.log(parseFloat(d))
                }
            })
            .await(draw);

        function draw (error, world) {
            if (error) throw error;

            // create a group for the land path elements
            const landGroup = svg.append("g");

            // create a tooltip element and hide it initially
            const tooltip = d3.select("body").append("div")
                .attr("class", "tooltip")
                .style("opacity", 0);

            // add the land areas to the map as path elements
            landGroup.selectAll("path")
                .data(world.features)
                .enter()
                .append("path")
                // draw each country
                .attr("d", d3.geoPath()
                    .projection(projection)
                )
                // set the color of each country
                .attr("fill", function (d) {
                    d.total = data.get(d.id) || 0;
                    return colorScale(d.total);
                })
                .style("stroke", "transparent")
                .attr("class", function(d){ return "Country" } )
                .style("opacity", .8)
                // add event handlers for mouseover and mouseout events
                .on("mouseover", function(d) {
                    // change the fill color of the hovered path element
                    d3.selectAll(".Country")
                        .transition()
                        .duration(200)
                        .style("opacity", .5);
                    d3.select(this)
                        .transition()
                        .duration(200)
                        .style("opacity", 1)
                        .style("stroke", "black");
                    // show tooltip with country name and total value
                    tooltip.html(`<strong>${d.properties.name}</strong><br/>Age: ${d.total}`)
                        .style("left", (d3.event.pageX + 10) + "px")
                        .style("top", (d3.event.pageY + 10) + "px")
                        .transition()
                        .duration(200)
                        .style("opacity", .9);
                })
                .on("mouseout", function(d) {
                    // change the fill color of the previously hovered path element
                    d3.selectAll(".Country")
                        .transition()
                        .duration(200)
                        .style("opacity", .8);
                    d3.select(this)
                        .transition()
                        .duration(200)
                        .style("stroke", "transparent");
                    // hide tooltip
                    tooltip.transition()
                        .duration(200)
                        .style("opacity", 0);
                });
        }
    }

    function update1994() {
        svg.selectAll(".state").remove();

        d3.queue()
            .defer(d3.json, "data/world.geojson")
            .defer(d3.csv, "data/age_range_data.csv", function(d) {
                if (d.Year === "1994") {
                    data.set(d.Code, parseFloat(+d.AllAges));
                    console.log(parseFloat(d))
                }
            })
            .await(draw);

        function draw (error, world) {
            if (error) throw error;

            // create a group for the land path elements
            const landGroup = svg.append("g");

            // create a tooltip element and hide it initially
            const tooltip = d3.select("body").append("div")
                .attr("class", "tooltip")
                .style("opacity", 0);

            // add the land areas to the map as path elements
            landGroup.selectAll("path")
                .data(world.features)
                .enter()
                .append("path")
                // draw each country
                .attr("d", d3.geoPath()
                    .projection(projection)
                )
                // set the color of each country
                .attr("fill", function (d) {
                    d.total = data.get(d.id) || 0;
                    return colorScale(d.total);
                })
                .style("stroke", "transparent")
                .attr("class", function(d){ return "Country" } )
                .style("opacity", .8)
                // add event handlers for mouseover and mouseout events
                .on("mouseover", function(d) {
                    // change the fill color of the hovered path element
                    d3.selectAll(".Country")
                        .transition()
                        .duration(200)
                        .style("opacity", .5);
                    d3.select(this)
                        .transition()
                        .duration(200)
                        .style("opacity", 1)
                        .style("stroke", "black");
                    // show tooltip with country name and total value
                    tooltip.html(`<strong>${d.properties.name}</strong><br/>Age: ${d.total}`)
                        .style("left", (d3.event.pageX + 10) + "px")
                        .style("top", (d3.event.pageY + 10) + "px")
                        .transition()
                        .duration(200)
                        .style("opacity", .9);
                })
                .on("mouseout", function(d) {
                    // change the fill color of the previously hovered path element
                    d3.selectAll(".Country")
                        .transition()
                        .duration(200)
                        .style("opacity", .8);
                    d3.select(this)
                        .transition()
                        .duration(200)
                        .style("stroke", "transparent");
                    // hide tooltip
                    tooltip.transition()
                        .duration(200)
                        .style("opacity", 0);
                });
        }
    }

    function update1995() {
        svg.selectAll(".state").remove();

        d3.queue()
            .defer(d3.json, "data/world.geojson")
            .defer(d3.csv, "data/age_range_data.csv", function(d) {
                if (d.Year === "1995") {
                    data.set(d.Code, parseFloat(+d.AllAges));
                    console.log(parseFloat(d))
                }
            })
            .await(draw);

        function draw (error, world) {
            if (error) throw error;

            // create a group for the land path elements
            const landGroup = svg.append("g");

            // create a tooltip element and hide it initially
            const tooltip = d3.select("body").append("div")
                .attr("class", "tooltip")
                .style("opacity", 0);

            // add the land areas to the map as path elements
            landGroup.selectAll("path")
                .data(world.features)
                .enter()
                .append("path")
                // draw each country
                .attr("d", d3.geoPath()
                    .projection(projection)
                )
                // set the color of each country
                .attr("fill", function (d) {
                    d.total = data.get(d.id) || 0;
                    return colorScale(d.total);
                })
                .style("stroke", "transparent")
                .attr("class", function(d){ return "Country" } )
                .style("opacity", .8)
                // add event handlers for mouseover and mouseout events
                .on("mouseover", function(d) {
                    // change the fill color of the hovered path element
                    d3.selectAll(".Country")
                        .transition()
                        .duration(200)
                        .style("opacity", .5);
                    d3.select(this)
                        .transition()
                        .duration(200)
                        .style("opacity", 1)
                        .style("stroke", "black");
                    // show tooltip with country name and total value
                    tooltip.html(`<strong>${d.properties.name}</strong><br/>Age: ${d.total}`)
                        .style("left", (d3.event.pageX + 10) + "px")
                        .style("top", (d3.event.pageY + 10) + "px")
                        .transition()
                        .duration(200)
                        .style("opacity", .9);
                })
                .on("mouseout", function(d) {
                    // change the fill color of the previously hovered path element
                    d3.selectAll(".Country")
                        .transition()
                        .duration(200)
                        .style("opacity", .8);
                    d3.select(this)
                        .transition()
                        .duration(200)
                        .style("stroke", "transparent");
                    // hide tooltip
                    tooltip.transition()
                        .duration(200)
                        .style("opacity", 0);
                });
        }
    }

    function update1996() {
        svg.selectAll(".state").remove();

        d3.queue()
            .defer(d3.json, "data/world.geojson")
            .defer(d3.csv, "data/age_range_data.csv", function(d) {
                if (d.Year === "1996") {
                    data.set(d.Code, parseFloat(+d.AllAges));
                    console.log(parseFloat(d))
                }
            })
            .await(draw);

        function draw (error, world) {
            if (error) throw error;

            // create a group for the land path elements
            const landGroup = svg.append("g");

            // create a tooltip element and hide it initially
            const tooltip = d3.select("body").append("div")
                .attr("class", "tooltip")
                .style("opacity", 0);

            // add the land areas to the map as path elements
            landGroup.selectAll("path")
                .data(world.features)
                .enter()
                .append("path")
                // draw each country
                .attr("d", d3.geoPath()
                    .projection(projection)
                )
                // set the color of each country
                .attr("fill", function (d) {
                    d.total = data.get(d.id) || 0;
                    return colorScale(d.total);
                })
                .style("stroke", "transparent")
                .attr("class", function(d){ return "Country" } )
                .style("opacity", .8)
                // add event handlers for mouseover and mouseout events
                .on("mouseover", function(d) {
                    // change the fill color of the hovered path element
                    d3.selectAll(".Country")
                        .transition()
                        .duration(200)
                        .style("opacity", .5);
                    d3.select(this)
                        .transition()
                        .duration(200)
                        .style("opacity", 1)
                        .style("stroke", "black");
                    // show tooltip with country name and total value
                    tooltip.html(`<strong>${d.properties.name}</strong><br/>Age: ${d.total}`)
                        .style("left", (d3.event.pageX + 10) + "px")
                        .style("top", (d3.event.pageY + 10) + "px")
                        .transition()
                        .duration(200)
                        .style("opacity", .9);
                })
                .on("mouseout", function(d) {
                    // change the fill color of the previously hovered path element
                    d3.selectAll(".Country")
                        .transition()
                        .duration(200)
                        .style("opacity", .8);
                    d3.select(this)
                        .transition()
                        .duration(200)
                        .style("stroke", "transparent");
                    // hide tooltip
                    tooltip.transition()
                        .duration(200)
                        .style("opacity", 0);
                });
        }
    }

    function update1997() {
        svg.selectAll(".state").remove();

        d3.queue()
            .defer(d3.json, "data/world.geojson")
            .defer(d3.csv, "data/age_range_data.csv", function(d) {
                if (d.Year === "1997") {
                    data.set(d.Code, parseFloat(+d.AllAges));
                    console.log(parseFloat(d))
                }
            })
            .await(draw);

        function draw (error, world) {
            if (error) throw error;

            // create a group for the land path elements
            const landGroup = svg.append("g");

            // create a tooltip element and hide it initially
            const tooltip = d3.select("body").append("div")
                .attr("class", "tooltip")
                .style("opacity", 0);

            // add the land areas to the map as path elements
            landGroup.selectAll("path")
                .data(world.features)
                .enter()
                .append("path")
                // draw each country
                .attr("d", d3.geoPath()
                    .projection(projection)
                )
                // set the color of each country
                .attr("fill", function (d) {
                    d.total = data.get(d.id) || 0;
                    return colorScale(d.total);
                })
                .style("stroke", "transparent")
                .attr("class", function(d){ return "Country" } )
                .style("opacity", .8)
                // add event handlers for mouseover and mouseout events
                .on("mouseover", function(d) {
                    // change the fill color of the hovered path element
                    d3.selectAll(".Country")
                        .transition()
                        .duration(200)
                        .style("opacity", .5);
                    d3.select(this)
                        .transition()
                        .duration(200)
                        .style("opacity", 1)
                        .style("stroke", "black");
                    // show tooltip with country name and total value
                    tooltip.html(`<strong>${d.properties.name}</strong><br/>Age: ${d.total}`)
                        .style("left", (d3.event.pageX + 10) + "px")
                        .style("top", (d3.event.pageY + 10) + "px")
                        .transition()
                        .duration(200)
                        .style("opacity", .9);
                })
                .on("mouseout", function(d) {
                    // change the fill color of the previously hovered path element
                    d3.selectAll(".Country")
                        .transition()
                        .duration(200)
                        .style("opacity", .8);
                    d3.select(this)
                        .transition()
                        .duration(200)
                        .style("stroke", "transparent");
                    // hide tooltip
                    tooltip.transition()
                        .duration(200)
                        .style("opacity", 0);
                });
        }
    }

    function update1998() {
        svg.selectAll(".state").remove();

        d3.queue()
            .defer(d3.json, "data/world.geojson")
            .defer(d3.csv, "data/age_range_data.csv", function(d) {
                if (d.Year === "1998") {
                    data.set(d.Code, parseFloat(+d.AllAges));
                    console.log(parseFloat(d))
                }
            })
            .await(draw);

        function draw (error, world) {
            if (error) throw error;

            // create a group for the land path elements
            const landGroup = svg.append("g");

            // create a tooltip element and hide it initially
            const tooltip = d3.select("body").append("div")
                .attr("class", "tooltip")
                .style("opacity", 0);

            // add the land areas to the map as path elements
            landGroup.selectAll("path")
                .data(world.features)
                .enter()
                .append("path")
                // draw each country
                .attr("d", d3.geoPath()
                    .projection(projection)
                )
                // set the color of each country
                .attr("fill", function (d) {
                    d.total = data.get(d.id) || 0;
                    return colorScale(d.total);
                })
                .style("stroke", "transparent")
                .attr("class", function(d){ return "Country" } )
                .style("opacity", .8)
                // add event handlers for mouseover and mouseout events
                .on("mouseover", function(d) {
                    // change the fill color of the hovered path element
                    d3.selectAll(".Country")
                        .transition()
                        .duration(200)
                        .style("opacity", .5);
                    d3.select(this)
                        .transition()
                        .duration(200)
                        .style("opacity", 1)
                        .style("stroke", "black");
                    // show tooltip with country name and total value
                    tooltip.html(`<strong>${d.properties.name}</strong><br/>Age: ${d.total}`)
                        .style("left", (d3.event.pageX + 10) + "px")
                        .style("top", (d3.event.pageY + 10) + "px")
                        .transition()
                        .duration(200)
                        .style("opacity", .9);
                })
                .on("mouseout", function(d) {
                    // change the fill color of the previously hovered path element
                    d3.selectAll(".Country")
                        .transition()
                        .duration(200)
                        .style("opacity", .8);
                    d3.select(this)
                        .transition()
                        .duration(200)
                        .style("stroke", "transparent");
                    // hide tooltip
                    tooltip.transition()
                        .duration(200)
                        .style("opacity", 0);
                });
        }
    }

    function update1999() {
        svg.selectAll(".state").remove();

        d3.queue()
            .defer(d3.json, "data/world.geojson")
            .defer(d3.csv, "data/age_range_data.csv", function(d) {
                if (d.Year === "1999") {
                    data.set(d.Code, parseFloat(+d.AllAges));
                    console.log(parseFloat(d))
                }
            })
            .await(draw);

        function draw (error, world) {
            if (error) throw error;

            // create a group for the land path elements
            const landGroup = svg.append("g");

            // create a tooltip element and hide it initially
            const tooltip = d3.select("body").append("div")
                .attr("class", "tooltip")
                .style("opacity", 0);

            // add the land areas to the map as path elements
            landGroup.selectAll("path")
                .data(world.features)
                .enter()
                .append("path")
                // draw each country
                .attr("d", d3.geoPath()
                    .projection(projection)
                )
                // set the color of each country
                .attr("fill", function (d) {
                    d.total = data.get(d.id) || 0;
                    return colorScale(d.total);
                })
                .style("stroke", "transparent")
                .attr("class", function(d){ return "Country" } )
                .style("opacity", .8)
                // add event handlers for mouseover and mouseout events
                .on("mouseover", function(d) {
                    // change the fill color of the hovered path element
                    d3.selectAll(".Country")
                        .transition()
                        .duration(200)
                        .style("opacity", .5);
                    d3.select(this)
                        .transition()
                        .duration(200)
                        .style("opacity", 1)
                        .style("stroke", "black");
                    // show tooltip with country name and total value
                    tooltip.html(`<strong>${d.properties.name}</strong><br/>Age: ${d.total}`)
                        .style("left", (d3.event.pageX + 10) + "px")
                        .style("top", (d3.event.pageY + 10) + "px")
                        .transition()
                        .duration(200)
                        .style("opacity", .9);
                })
                .on("mouseout", function(d) {
                    // change the fill color of the previously hovered path element
                    d3.selectAll(".Country")
                        .transition()
                        .duration(200)
                        .style("opacity", .8);
                    d3.select(this)
                        .transition()
                        .duration(200)
                        .style("stroke", "transparent");
                    // hide tooltip
                    tooltip.transition()
                        .duration(200)
                        .style("opacity", 0);
                });
        }
    }

    function update2000() {
        svg.selectAll(".state").remove();

        d3.queue()
            .defer(d3.json, "data/world.geojson")
            .defer(d3.csv, "data/age_range_data.csv", function(d) {
                if (d.Year === "2000") {
                    data.set(d.Code, parseFloat(+d.AllAges));
                    console.log(parseFloat(d))
                }
            })
            .await(draw);

        function draw (error, world) {
            if (error) throw error;

            // create a group for the land path elements
            const landGroup = svg.append("g");

            // create a tooltip element and hide it initially
            const tooltip = d3.select("body").append("div")
                .attr("class", "tooltip")
                .style("opacity", 0);

            // add the land areas to the map as path elements
            landGroup.selectAll("path")
                .data(world.features)
                .enter()
                .append("path")
                // draw each country
                .attr("d", d3.geoPath()
                    .projection(projection)
                )
                // set the color of each country
                .attr("fill", function (d) {
                    d.total = data.get(d.id) || 0;
                    return colorScale(d.total);
                })
                .style("stroke", "transparent")
                .attr("class", function(d){ return "Country" } )
                .style("opacity", .8)
                // add event handlers for mouseover and mouseout events
                .on("mouseover", function(d) {
                    // change the fill color of the hovered path element
                    d3.selectAll(".Country")
                        .transition()
                        .duration(200)
                        .style("opacity", .5);
                    d3.select(this)
                        .transition()
                        .duration(200)
                        .style("opacity", 1)
                        .style("stroke", "black");
                    // show tooltip with country name and total value
                    tooltip.html(`<strong>${d.properties.name}</strong><br/>Age: ${d.total}`)
                        .style("left", (d3.event.pageX + 10) + "px")
                        .style("top", (d3.event.pageY + 10) + "px")
                        .transition()
                        .duration(200)
                        .style("opacity", .9);
                })
                .on("mouseout", function(d) {
                    // change the fill color of the previously hovered path element
                    d3.selectAll(".Country")
                        .transition()
                        .duration(200)
                        .style("opacity", .8);
                    d3.select(this)
                        .transition()
                        .duration(200)
                        .style("stroke", "transparent");
                    // hide tooltip
                    tooltip.transition()
                        .duration(200)
                        .style("opacity", 0);
                });
        }
    }

    function update2001() {
        svg.selectAll(".state").remove();

        d3.queue()
            .defer(d3.json, "data/world.geojson")
            .defer(d3.csv, "data/age_range_data.csv", function(d) {
                if (d.Year === "2001") {
                    data.set(d.Code, parseFloat(+d.AllAges));
                    console.log(parseFloat(d))
                }
            })
            .await(draw);

        function draw (error, world) {
            if (error) throw error;

            // create a group for the land path elements
            const landGroup = svg.append("g");

            // create a tooltip element and hide it initially
            const tooltip = d3.select("body").append("div")
                .attr("class", "tooltip")
                .style("opacity", 0);

            // add the land areas to the map as path elements
            landGroup.selectAll("path")
                .data(world.features)
                .enter()
                .append("path")
                // draw each country
                .attr("d", d3.geoPath()
                    .projection(projection)
                )
                // set the color of each country
                .attr("fill", function (d) {
                    d.total = data.get(d.id) || 0;
                    return colorScale(d.total);
                })
                .style("stroke", "transparent")
                .attr("class", function(d){ return "Country" } )
                .style("opacity", .8)
                // add event handlers for mouseover and mouseout events
                .on("mouseover", function(d) {
                    // change the fill color of the hovered path element
                    d3.selectAll(".Country")
                        .transition()
                        .duration(200)
                        .style("opacity", .5);
                    d3.select(this)
                        .transition()
                        .duration(200)
                        .style("opacity", 1)
                        .style("stroke", "black");
                    // show tooltip with country name and total value
                    tooltip.html(`<strong>${d.properties.name}</strong><br/>Age: ${d.total}`)
                        .style("left", (d3.event.pageX + 10) + "px")
                        .style("top", (d3.event.pageY + 10) + "px")
                        .transition()
                        .duration(200)
                        .style("opacity", .9);
                })
                .on("mouseout", function(d) {
                    // change the fill color of the previously hovered path element
                    d3.selectAll(".Country")
                        .transition()
                        .duration(200)
                        .style("opacity", .8);
                    d3.select(this)
                        .transition()
                        .duration(200)
                        .style("stroke", "transparent");
                    // hide tooltip
                    tooltip.transition()
                        .duration(200)
                        .style("opacity", 0);
                });
        }
    }

    function update2002() {
        svg.selectAll(".state").remove();

        d3.queue()
            .defer(d3.json, "data/world.geojson")
            .defer(d3.csv, "data/age_range_data.csv", function(d) {
                if (d.Year === "2002") {
                    data.set(d.Code, parseFloat(+d.AllAges));
                    console.log(parseFloat(d))
                }
            })
            .await(draw);

        function draw (error, world) {
            if (error) throw error;

            // create a group for the land path elements
            const landGroup = svg.append("g");

            // create a tooltip element and hide it initially
            const tooltip = d3.select("body").append("div")
                .attr("class", "tooltip")
                .style("opacity", 0);

            // add the land areas to the map as path elements
            landGroup.selectAll("path")
                .data(world.features)
                .enter()
                .append("path")
                // draw each country
                .attr("d", d3.geoPath()
                    .projection(projection)
                )
                // set the color of each country
                .attr("fill", function (d) {
                    d.total = data.get(d.id) || 0;
                    return colorScale(d.total);
                })
                .style("stroke", "transparent")
                .attr("class", function(d){ return "Country" } )
                .style("opacity", .8)
                // add event handlers for mouseover and mouseout events
                .on("mouseover", function(d) {
                    // change the fill color of the hovered path element
                    d3.selectAll(".Country")
                        .transition()
                        .duration(200)
                        .style("opacity", .5);
                    d3.select(this)
                        .transition()
                        .duration(200)
                        .style("opacity", 1)
                        .style("stroke", "black");
                    // show tooltip with country name and total value
                    tooltip.html(`<strong>${d.properties.name}</strong><br/>Age: ${d.total}`)
                        .style("left", (d3.event.pageX + 10) + "px")
                        .style("top", (d3.event.pageY + 10) + "px")
                        .transition()
                        .duration(200)
                        .style("opacity", .9);
                })
                .on("mouseout", function(d) {
                    // change the fill color of the previously hovered path element
                    d3.selectAll(".Country")
                        .transition()
                        .duration(200)
                        .style("opacity", .8);
                    d3.select(this)
                        .transition()
                        .duration(200)
                        .style("stroke", "transparent");
                    // hide tooltip
                    tooltip.transition()
                        .duration(200)
                        .style("opacity", 0);
                });
        }
    }

    function update2003() {
        svg.selectAll(".state").remove();

        d3.queue()
            .defer(d3.json, "data/world.geojson")
            .defer(d3.csv, "data/age_range_data.csv", function(d) {
                if (d.Year === "2003") {
                    data.set(d.Code, parseFloat(+d.AllAges));
                    console.log(parseFloat(d))
                }
            })
            .await(draw);

        function draw (error, world) {
            if (error) throw error;

            // create a group for the land path elements
            const landGroup = svg.append("g");

            // create a tooltip element and hide it initially
            const tooltip = d3.select("body").append("div")
                .attr("class", "tooltip")
                .style("opacity", 0);

            // add the land areas to the map as path elements
            landGroup.selectAll("path")
                .data(world.features)
                .enter()
                .append("path")
                // draw each country
                .attr("d", d3.geoPath()
                    .projection(projection)
                )
                // set the color of each country
                .attr("fill", function (d) {
                    d.total = data.get(d.id) || 0;
                    return colorScale(d.total);
                })
                .style("stroke", "transparent")
                .attr("class", function(d){ return "Country" } )
                .style("opacity", .8)
                // add event handlers for mouseover and mouseout events
                .on("mouseover", function(d) {
                    // change the fill color of the hovered path element
                    d3.selectAll(".Country")
                        .transition()
                        .duration(200)
                        .style("opacity", .5);
                    d3.select(this)
                        .transition()
                        .duration(200)
                        .style("opacity", 1)
                        .style("stroke", "black");
                    // show tooltip with country name and total value
                    tooltip.html(`<strong>${d.properties.name}</strong><br/>Age: ${d.total}`)
                        .style("left", (d3.event.pageX + 10) + "px")
                        .style("top", (d3.event.pageY + 10) + "px")
                        .transition()
                        .duration(200)
                        .style("opacity", .9);
                })
                .on("mouseout", function(d) {
                    // change the fill color of the previously hovered path element
                    d3.selectAll(".Country")
                        .transition()
                        .duration(200)
                        .style("opacity", .8);
                    d3.select(this)
                        .transition()
                        .duration(200)
                        .style("stroke", "transparent");
                    // hide tooltip
                    tooltip.transition()
                        .duration(200)
                        .style("opacity", 0);
                });
        }
    }

    function update2004() {
        svg.selectAll(".state").remove();

        d3.queue()
            .defer(d3.json, "data/world.geojson")
            .defer(d3.csv, "data/age_range_data.csv", function(d) {
                if (d.Year === "2004") {
                    data.set(d.Code, parseFloat(+d.AllAges));
                    console.log(parseFloat(d))
                }
            })
            .await(draw);

        function draw (error, world) {
            if (error) throw error;

            // create a group for the land path elements
            const landGroup = svg.append("g");

            // create a tooltip element and hide it initially
            const tooltip = d3.select("body").append("div")
                .attr("class", "tooltip")
                .style("opacity", 0);

            // add the land areas to the map as path elements
            landGroup.selectAll("path")
                .data(world.features)
                .enter()
                .append("path")
                // draw each country
                .attr("d", d3.geoPath()
                    .projection(projection)
                )
                // set the color of each country
                .attr("fill", function (d) {
                    d.total = data.get(d.id) || 0;
                    return colorScale(d.total);
                })
                .style("stroke", "transparent")
                .attr("class", function(d){ return "Country" } )
                .style("opacity", .8)
                // add event handlers for mouseover and mouseout events
                .on("mouseover", function(d) {
                    // change the fill color of the hovered path element
                    d3.selectAll(".Country")
                        .transition()
                        .duration(200)
                        .style("opacity", .5);
                    d3.select(this)
                        .transition()
                        .duration(200)
                        .style("opacity", 1)
                        .style("stroke", "black");
                    // show tooltip with country name and total value
                    tooltip.html(`<strong>${d.properties.name}</strong><br/>Age: ${d.total}`)
                        .style("left", (d3.event.pageX + 10) + "px")
                        .style("top", (d3.event.pageY + 10) + "px")
                        .transition()
                        .duration(200)
                        .style("opacity", .9);
                })
                .on("mouseout", function(d) {
                    // change the fill color of the previously hovered path element
                    d3.selectAll(".Country")
                        .transition()
                        .duration(200)
                        .style("opacity", .8);
                    d3.select(this)
                        .transition()
                        .duration(200)
                        .style("stroke", "transparent");
                    // hide tooltip
                    tooltip.transition()
                        .duration(200)
                        .style("opacity", 0);
                });
        }
    }

    function update2005() {
        svg.selectAll(".state").remove();

        d3.queue()
            .defer(d3.json, "data/world.geojson")
            .defer(d3.csv, "data/age_range_data.csv", function(d) {
                if (d.Year === "2005") {
                    data.set(d.Code, parseFloat(+d.AllAges));
                    console.log(parseFloat(d))
                }
            })
            .await(draw);

        function draw (error, world) {
            if (error) throw error;

            // create a group for the land path elements
            const landGroup = svg.append("g");

            // create a tooltip element and hide it initially
            const tooltip = d3.select("body").append("div")
                .attr("class", "tooltip")
                .style("opacity", 0);

            // add the land areas to the map as path elements
            landGroup.selectAll("path")
                .data(world.features)
                .enter()
                .append("path")
                // draw each country
                .attr("d", d3.geoPath()
                    .projection(projection)
                )
                // set the color of each country
                .attr("fill", function (d) {
                    d.total = data.get(d.id) || 0;
                    return colorScale(d.total);
                })
                .style("stroke", "transparent")
                .attr("class", function(d){ return "Country" } )
                .style("opacity", .8)
                // add event handlers for mouseover and mouseout events
                .on("mouseover", function(d) {
                    // change the fill color of the hovered path element
                    d3.selectAll(".Country")
                        .transition()
                        .duration(200)
                        .style("opacity", .5);
                    d3.select(this)
                        .transition()
                        .duration(200)
                        .style("opacity", 1)
                        .style("stroke", "black");
                    // show tooltip with country name and total value
                    tooltip.html(`<strong>${d.properties.name}</strong><br/>Age: ${d.total}`)
                        .style("left", (d3.event.pageX + 10) + "px")
                        .style("top", (d3.event.pageY + 10) + "px")
                        .transition()
                        .duration(200)
                        .style("opacity", .9);
                })
                .on("mouseout", function(d) {
                    // change the fill color of the previously hovered path element
                    d3.selectAll(".Country")
                        .transition()
                        .duration(200)
                        .style("opacity", .8);
                    d3.select(this)
                        .transition()
                        .duration(200)
                        .style("stroke", "transparent");
                    // hide tooltip
                    tooltip.transition()
                        .duration(200)
                        .style("opacity", 0);
                });
        }
    }

    function update2006() {
        svg.selectAll(".state").remove();

        d3.queue()
            .defer(d3.json, "data/world.geojson")
            .defer(d3.csv, "data/age_range_data.csv", function(d) {
                if (d.Year === "2006") {
                    data.set(d.Code, parseFloat(+d.AllAges));
                    console.log(parseFloat(d))
                }
            })
            .await(draw);

        function draw (error, world) {
            if (error) throw error;

            // create a group for the land path elements
            const landGroup = svg.append("g");

            // create a tooltip element and hide it initially
            const tooltip = d3.select("body").append("div")
                .attr("class", "tooltip")
                .style("opacity", 0);

            // add the land areas to the map as path elements
            landGroup.selectAll("path")
                .data(world.features)
                .enter()
                .append("path")
                // draw each country
                .attr("d", d3.geoPath()
                    .projection(projection)
                )
                // set the color of each country
                .attr("fill", function (d) {
                    d.total = data.get(d.id) || 0;
                    return colorScale(d.total);
                })
                .style("stroke", "transparent")
                .attr("class", function(d){ return "Country" } )
                .style("opacity", .8)
                // add event handlers for mouseover and mouseout events
                .on("mouseover", function(d) {
                    // change the fill color of the hovered path element
                    d3.selectAll(".Country")
                        .transition()
                        .duration(200)
                        .style("opacity", .5);
                    d3.select(this)
                        .transition()
                        .duration(200)
                        .style("opacity", 1)
                        .style("stroke", "black");
                    // show tooltip with country name and total value
                    tooltip.html(`<strong>${d.properties.name}</strong><br/>Age: ${d.total}`)
                        .style("left", (d3.event.pageX + 10) + "px")
                        .style("top", (d3.event.pageY + 10) + "px")
                        .transition()
                        .duration(200)
                        .style("opacity", .9);
                })
                .on("mouseout", function(d) {
                    // change the fill color of the previously hovered path element
                    d3.selectAll(".Country")
                        .transition()
                        .duration(200)
                        .style("opacity", .8);
                    d3.select(this)
                        .transition()
                        .duration(200)
                        .style("stroke", "transparent");
                    // hide tooltip
                    tooltip.transition()
                        .duration(200)
                        .style("opacity", 0);
                });
        }
    }

    function update2007() {
        svg.selectAll(".state").remove();

        d3.queue()
            .defer(d3.json, "data/world.geojson")
            .defer(d3.csv, "data/age_range_data.csv", function(d) {
                if (d.Year === "2007") {
                    data.set(d.Code, parseFloat(+d.AllAges));
                    console.log(parseFloat(d))
                }
            })
            .await(draw);

        function draw (error, world) {
            if (error) throw error;

            // create a group for the land path elements
            const landGroup = svg.append("g");

            // create a tooltip element and hide it initially
            const tooltip = d3.select("body").append("div")
                .attr("class", "tooltip")
                .style("opacity", 0);

            // add the land areas to the map as path elements
            landGroup.selectAll("path")
                .data(world.features)
                .enter()
                .append("path")
                // draw each country
                .attr("d", d3.geoPath()
                    .projection(projection)
                )
                // set the color of each country
                .attr("fill", function (d) {
                    d.total = data.get(d.id) || 0;
                    return colorScale(d.total);
                })
                .style("stroke", "transparent")
                .attr("class", function(d){ return "Country" } )
                .style("opacity", .8)
                // add event handlers for mouseover and mouseout events
                .on("mouseover", function(d) {
                    // change the fill color of the hovered path element
                    d3.selectAll(".Country")
                        .transition()
                        .duration(200)
                        .style("opacity", .5);
                    d3.select(this)
                        .transition()
                        .duration(200)
                        .style("opacity", 1)
                        .style("stroke", "black");
                    // show tooltip with country name and total value
                    tooltip.html(`<strong>${d.properties.name}</strong><br/>Age: ${d.total}`)
                        .style("left", (d3.event.pageX + 10) + "px")
                        .style("top", (d3.event.pageY + 10) + "px")
                        .transition()
                        .duration(200)
                        .style("opacity", .9);
                })
                .on("mouseout", function(d) {
                    // change the fill color of the previously hovered path element
                    d3.selectAll(".Country")
                        .transition()
                        .duration(200)
                        .style("opacity", .8);
                    d3.select(this)
                        .transition()
                        .duration(200)
                        .style("stroke", "transparent");
                    // hide tooltip
                    tooltip.transition()
                        .duration(200)
                        .style("opacity", 0);
                });
        }
    }

    function update2008() {
        svg.selectAll(".state").remove();

        d3.queue()
            .defer(d3.json, "data/world.geojson")
            .defer(d3.csv, "data/age_range_data.csv", function(d) {
                if (d.Year === "2008") {
                    data.set(d.Code, parseFloat(+d.AllAges));
                    console.log(parseFloat(d))
                }
            })
            .await(draw);

        function draw (error, world) {
            if (error) throw error;

            // create a group for the land path elements
            const landGroup = svg.append("g");

            // create a tooltip element and hide it initially
            const tooltip = d3.select("body").append("div")
                .attr("class", "tooltip")
                .style("opacity", 0);

            // add the land areas to the map as path elements
            landGroup.selectAll("path")
                .data(world.features)
                .enter()
                .append("path")
                // draw each country
                .attr("d", d3.geoPath()
                    .projection(projection)
                )
                // set the color of each country
                .attr("fill", function (d) {
                    d.total = data.get(d.id) || 0;
                    return colorScale(d.total);
                })
                .style("stroke", "transparent")
                .attr("class", function(d){ return "Country" } )
                .style("opacity", .8)
                // add event handlers for mouseover and mouseout events
                .on("mouseover", function(d) {
                    // change the fill color of the hovered path element
                    d3.selectAll(".Country")
                        .transition()
                        .duration(200)
                        .style("opacity", .5);
                    d3.select(this)
                        .transition()
                        .duration(200)
                        .style("opacity", 1)
                        .style("stroke", "black");
                    // show tooltip with country name and total value
                    tooltip.html(`<strong>${d.properties.name}</strong><br/>Age: ${d.total}`)
                        .style("left", (d3.event.pageX + 10) + "px")
                        .style("top", (d3.event.pageY + 10) + "px")
                        .transition()
                        .duration(200)
                        .style("opacity", .9);
                })
                .on("mouseout", function(d) {
                    // change the fill color of the previously hovered path element
                    d3.selectAll(".Country")
                        .transition()
                        .duration(200)
                        .style("opacity", .8);
                    d3.select(this)
                        .transition()
                        .duration(200)
                        .style("stroke", "transparent");
                    // hide tooltip
                    tooltip.transition()
                        .duration(200)
                        .style("opacity", 0);
                });
        }
    }

    function update2009() {
        svg.selectAll(".state").remove();

        d3.queue()
            .defer(d3.json, "data/world.geojson")
            .defer(d3.csv, "data/age_range_data.csv", function(d) {
                if (d.Year === "2009") {
                    data.set(d.Code, parseFloat(+d.AllAges));
                    console.log(parseFloat(d))
                }
            })
            .await(draw);

        function draw (error, world) {
            if (error) throw error;

            // create a group for the land path elements
            const landGroup = svg.append("g");

            // create a tooltip element and hide it initially
            const tooltip = d3.select("body").append("div")
                .attr("class", "tooltip")
                .style("opacity", 0);

            // add the land areas to the map as path elements
            landGroup.selectAll("path")
                .data(world.features)
                .enter()
                .append("path")
                // draw each country
                .attr("d", d3.geoPath()
                    .projection(projection)
                )
                // set the color of each country
                .attr("fill", function (d) {
                    d.total = data.get(d.id) || 0;
                    return colorScale(d.total);
                })
                .style("stroke", "transparent")
                .attr("class", function(d){ return "Country" } )
                .style("opacity", .8)
                // add event handlers for mouseover and mouseout events
                .on("mouseover", function(d) {
                    // change the fill color of the hovered path element
                    d3.selectAll(".Country")
                        .transition()
                        .duration(200)
                        .style("opacity", .5);
                    d3.select(this)
                        .transition()
                        .duration(200)
                        .style("opacity", 1)
                        .style("stroke", "black");
                    // show tooltip with country name and total value
                    tooltip.html(`<strong>${d.properties.name}</strong><br/>Age: ${d.total}`)
                        .style("left", (d3.event.pageX + 10) + "px")
                        .style("top", (d3.event.pageY + 10) + "px")
                        .transition()
                        .duration(200)
                        .style("opacity", .9);
                })
                .on("mouseout", function(d) {
                    // change the fill color of the previously hovered path element
                    d3.selectAll(".Country")
                        .transition()
                        .duration(200)
                        .style("opacity", .8);
                    d3.select(this)
                        .transition()
                        .duration(200)
                        .style("stroke", "transparent");
                    // hide tooltip
                    tooltip.transition()
                        .duration(200)
                        .style("opacity", 0);
                });
        }
    }

    function update2010() {
        svg.selectAll(".state").remove();

        d3.queue()
            .defer(d3.json, "data/world.geojson")
            .defer(d3.csv, "data/age_range_data.csv", function(d) {
                if (d.Year === "2010") {
                    data.set(d.Code, parseFloat(+d.AllAges));
                    console.log(parseFloat(d))
                }
            })
            .await(draw);

        function draw (error, world) {
            if (error) throw error;

            // create a group for the land path elements
            const landGroup = svg.append("g");

            // create a tooltip element and hide it initially
            const tooltip = d3.select("body").append("div")
                .attr("class", "tooltip")
                .style("opacity", 0);

            // add the land areas to the map as path elements
            landGroup.selectAll("path")
                .data(world.features)
                .enter()
                .append("path")
                // draw each country
                .attr("d", d3.geoPath()
                    .projection(projection)
                )
                // set the color of each country
                .attr("fill", function (d) {
                    d.total = data.get(d.id) || 0;
                    return colorScale(d.total);
                })
                .style("stroke", "transparent")
                .attr("class", function(d){ return "Country" } )
                .style("opacity", .8)
                // add event handlers for mouseover and mouseout events
                .on("mouseover", function(d) {
                    // change the fill color of the hovered path element
                    d3.selectAll(".Country")
                        .transition()
                        .duration(200)
                        .style("opacity", .5);
                    d3.select(this)
                        .transition()
                        .duration(200)
                        .style("opacity", 1)
                        .style("stroke", "black");
                    // show tooltip with country name and total value
                    tooltip.html(`<strong>${d.properties.name}</strong><br/>Age: ${d.total}`)
                        .style("left", (d3.event.pageX + 10) + "px")
                        .style("top", (d3.event.pageY + 10) + "px")
                        .transition()
                        .duration(200)
                        .style("opacity", .9);
                })
                .on("mouseout", function(d) {
                    // change the fill color of the previously hovered path element
                    d3.selectAll(".Country")
                        .transition()
                        .duration(200)
                        .style("opacity", .8);
                    d3.select(this)
                        .transition()
                        .duration(200)
                        .style("stroke", "transparent");
                    // hide tooltip
                    tooltip.transition()
                        .duration(200)
                        .style("opacity", 0);
                });
        }
    }

    function update2011() {
        svg.selectAll(".state").remove();

        d3.queue()
            .defer(d3.json, "data/world.geojson")
            .defer(d3.csv, "data/age_range_data.csv", function(d) {
                if (d.Year === "2011") {
                    data.set(d.Code, parseFloat(+d.AllAges));
                    console.log(parseFloat(d))
                }
            })
            .await(draw);

        function draw (error, world) {
            if (error) throw error;

            // create a group for the land path elements
            const landGroup = svg.append("g");

            // create a tooltip element and hide it initially
            const tooltip = d3.select("body").append("div")
                .attr("class", "tooltip")
                .style("opacity", 0);

            // add the land areas to the map as path elements
            landGroup.selectAll("path")
                .data(world.features)
                .enter()
                .append("path")
                // draw each country
                .attr("d", d3.geoPath()
                    .projection(projection)
                )
                // set the color of each country
                .attr("fill", function (d) {
                    d.total = data.get(d.id) || 0;
                    return colorScale(d.total);
                })
                .style("stroke", "transparent")
                .attr("class", function(d){ return "Country" } )
                .style("opacity", .8)
                // add event handlers for mouseover and mouseout events
                .on("mouseover", function(d) {
                    // change the fill color of the hovered path element
                    d3.selectAll(".Country")
                        .transition()
                        .duration(200)
                        .style("opacity", .5);
                    d3.select(this)
                        .transition()
                        .duration(200)
                        .style("opacity", 1)
                        .style("stroke", "black");
                    // show tooltip with country name and total value
                    tooltip.html(`<strong>${d.properties.name}</strong><br/>Age: ${d.total}`)
                        .style("left", (d3.event.pageX + 10) + "px")
                        .style("top", (d3.event.pageY + 10) + "px")
                        .transition()
                        .duration(200)
                        .style("opacity", .9);
                })
                .on("mouseout", function(d) {
                    // change the fill color of the previously hovered path element
                    d3.selectAll(".Country")
                        .transition()
                        .duration(200)
                        .style("opacity", .8);
                    d3.select(this)
                        .transition()
                        .duration(200)
                        .style("stroke", "transparent");
                    // hide tooltip
                    tooltip.transition()
                        .duration(200)
                        .style("opacity", 0);
                });
        }
    }

    function update2012() {
        svg.selectAll(".state").remove();

        d3.queue()
            .defer(d3.json, "data/world.geojson")
            .defer(d3.csv, "data/age_range_data.csv", function(d) {
                if (d.Year === "2012") {
                    data.set(d.Code, parseFloat(+d.AllAges));
                    console.log(parseFloat(d))
                }
            })
            .await(draw);

        function draw (error, world) {
            if (error) throw error;

            // create a group for the land path elements
            const landGroup = svg.append("g");

            // create a tooltip element and hide it initially
            const tooltip = d3.select("body").append("div")
                .attr("class", "tooltip")
                .style("opacity", 0);

            // add the land areas to the map as path elements
            landGroup.selectAll("path")
                .data(world.features)
                .enter()
                .append("path")
                // draw each country
                .attr("d", d3.geoPath()
                    .projection(projection)
                )
                // set the color of each country
                .attr("fill", function (d) {
                    d.total = data.get(d.id) || 0;
                    return colorScale(d.total);
                })
                .style("stroke", "transparent")
                .attr("class", function(d){ return "Country" } )
                .style("opacity", .8)
                // add event handlers for mouseover and mouseout events
                .on("mouseover", function(d) {
                    // change the fill color of the hovered path element
                    d3.selectAll(".Country")
                        .transition()
                        .duration(200)
                        .style("opacity", .5);
                    d3.select(this)
                        .transition()
                        .duration(200)
                        .style("opacity", 1)
                        .style("stroke", "black");
                    // show tooltip with country name and total value
                    tooltip.html(`<strong>${d.properties.name}</strong><br/>Age: ${d.total}`)
                        .style("left", (d3.event.pageX + 10) + "px")
                        .style("top", (d3.event.pageY + 10) + "px")
                        .transition()
                        .duration(200)
                        .style("opacity", .9);
                })
                .on("mouseout", function(d) {
                    // change the fill color of the previously hovered path element
                    d3.selectAll(".Country")
                        .transition()
                        .duration(200)
                        .style("opacity", .8);
                    d3.select(this)
                        .transition()
                        .duration(200)
                        .style("stroke", "transparent");
                    // hide tooltip
                    tooltip.transition()
                        .duration(200)
                        .style("opacity", 0);
                });
        }
    }

    function update2013() {
        svg.selectAll(".state").remove();

        d3.queue()
            .defer(d3.json, "data/world.geojson")
            .defer(d3.csv, "data/age_range_data.csv", function(d) {
                if (d.Year === "2013") {
                    data.set(d.Code, parseFloat(+d.AllAges));
                    console.log(parseFloat(d))
                }
            })
            .await(draw);

        function draw (error, world) {
            if (error) throw error;

            // create a group for the land path elements
            const landGroup = svg.append("g");

            // create a tooltip element and hide it initially
            const tooltip = d3.select("body").append("div")
                .attr("class", "tooltip")
                .style("opacity", 0);

            // add the land areas to the map as path elements
            landGroup.selectAll("path")
                .data(world.features)
                .enter()
                .append("path")
                // draw each country
                .attr("d", d3.geoPath()
                    .projection(projection)
                )
                // set the color of each country
                .attr("fill", function (d) {
                    d.total = data.get(d.id) || 0;
                    return colorScale(d.total);
                })
                .style("stroke", "transparent")
                .attr("class", function(d){ return "Country" } )
                .style("opacity", .8)
                // add event handlers for mouseover and mouseout events
                .on("mouseover", function(d) {
                    // change the fill color of the hovered path element
                    d3.selectAll(".Country")
                        .transition()
                        .duration(200)
                        .style("opacity", .5);
                    d3.select(this)
                        .transition()
                        .duration(200)
                        .style("opacity", 1)
                        .style("stroke", "black");
                    // show tooltip with country name and total value
                    tooltip.html(`<strong>${d.properties.name}</strong><br/>Age: ${d.total}`)
                        .style("left", (d3.event.pageX + 10) + "px")
                        .style("top", (d3.event.pageY + 10) + "px")
                        .transition()
                        .duration(200)
                        .style("opacity", .9);
                })
                .on("mouseout", function(d) {
                    // change the fill color of the previously hovered path element
                    d3.selectAll(".Country")
                        .transition()
                        .duration(200)
                        .style("opacity", .8);
                    d3.select(this)
                        .transition()
                        .duration(200)
                        .style("stroke", "transparent");
                    // hide tooltip
                    tooltip.transition()
                        .duration(200)
                        .style("opacity", 0);
                });
        }
    }

    function update2014() {
        svg.selectAll(".state").remove();

        d3.queue()
            .defer(d3.json, "data/world.geojson")
            .defer(d3.csv, "data/age_range_data.csv", function(d) {
                if (d.Year === "2014") {
                    data.set(d.Code, parseFloat(+d.AllAges));
                    console.log(parseFloat(d))
                }
            })
            .await(draw);

        function draw (error, world) {
            if (error) throw error;

            // create a group for the land path elements
            const landGroup = svg.append("g");

            // create a tooltip element and hide it initially
            const tooltip = d3.select("body").append("div")
                .attr("class", "tooltip")
                .style("opacity", 0);

            // add the land areas to the map as path elements
            landGroup.selectAll("path")
                .data(world.features)
                .enter()
                .append("path")
                // draw each country
                .attr("d", d3.geoPath()
                    .projection(projection)
                )
                // set the color of each country
                .attr("fill", function (d) {
                    d.total = data.get(d.id) || 0;
                    return colorScale(d.total);
                })
                .style("stroke", "transparent")
                .attr("class", function(d){ return "Country" } )
                .style("opacity", .8)
                // add event handlers for mouseover and mouseout events
                .on("mouseover", function(d) {
                    // change the fill color of the hovered path element
                    d3.selectAll(".Country")
                        .transition()
                        .duration(200)
                        .style("opacity", .5);
                    d3.select(this)
                        .transition()
                        .duration(200)
                        .style("opacity", 1)
                        .style("stroke", "black");
                    // show tooltip with country name and total value
                    tooltip.html(`<strong>${d.properties.name}</strong><br/>Age: ${d.total}`)
                        .style("left", (d3.event.pageX + 10) + "px")
                        .style("top", (d3.event.pageY + 10) + "px")
                        .transition()
                        .duration(200)
                        .style("opacity", .9);
                })
                .on("mouseout", function(d) {
                    // change the fill color of the previously hovered path element
                    d3.selectAll(".Country")
                        .transition()
                        .duration(200)
                        .style("opacity", .8);
                    d3.select(this)
                        .transition()
                        .duration(200)
                        .style("stroke", "transparent");
                    // hide tooltip
                    tooltip.transition()
                        .duration(200)
                        .style("opacity", 0);
                });
        }
    }

    function update2015() {
        svg.selectAll(".state").remove();

        d3.queue()
            .defer(d3.json, "data/world.geojson")
            .defer(d3.csv, "data/age_range_data.csv", function(d) {
                if (d.Year === "2015") {
                    data.set(d.Code, parseFloat(+d.AllAges));
                    console.log(parseFloat(d))
                }
            })
            .await(draw);

        function draw (error, world) {
            if (error) throw error;

            // create a group for the land path elements
            const landGroup = svg.append("g");

            // create a tooltip element and hide it initially
            const tooltip = d3.select("body").append("div")
                .attr("class", "tooltip")
                .style("opacity", 0);

            // add the land areas to the map as path elements
            landGroup.selectAll("path")
                .data(world.features)
                .enter()
                .append("path")
                // draw each country
                .attr("d", d3.geoPath()
                    .projection(projection)
                )
                // set the color of each country
                .attr("fill", function (d) {
                    d.total = data.get(d.id) || 0;
                    return colorScale(d.total);
                })
                .style("stroke", "transparent")
                .attr("class", function(d){ return "Country" } )
                .style("opacity", .8)
                // add event handlers for mouseover and mouseout events
                .on("mouseover", function(d) {
                    // change the fill color of the hovered path element
                    d3.selectAll(".Country")
                        .transition()
                        .duration(200)
                        .style("opacity", .5);
                    d3.select(this)
                        .transition()
                        .duration(200)
                        .style("opacity", 1)
                        .style("stroke", "black");
                    // show tooltip with country name and total value
                    tooltip.html(`<strong>${d.properties.name}</strong><br/>Age: ${d.total}`)
                        .style("left", (d3.event.pageX + 10) + "px")
                        .style("top", (d3.event.pageY + 10) + "px")
                        .transition()
                        .duration(200)
                        .style("opacity", .9);
                })
                .on("mouseout", function(d) {
                    // change the fill color of the previously hovered path element
                    d3.selectAll(".Country")
                        .transition()
                        .duration(200)
                        .style("opacity", .8);
                    d3.select(this)
                        .transition()
                        .duration(200)
                        .style("stroke", "transparent");
                    // hide tooltip
                    tooltip.transition()
                        .duration(200)
                        .style("opacity", 0);
                });
        }
    }

    function update2016() {
        svg.selectAll(".state").remove();

        d3.queue()
            .defer(d3.json, "data/world.geojson")
            .defer(d3.csv, "data/age_range_data.csv", function(d) {
                if (d.Year === "2016") {
                    data.set(d.Code, parseFloat(+d.AllAges));
                    console.log(parseFloat(d))
                }
            })
            .await(draw);

        function draw (error, world) {
            if (error) throw error;

            // create a group for the land path elements
            const landGroup = svg.append("g");

            // create a tooltip element and hide it initially
            const tooltip = d3.select("body").append("div")
                .attr("class", "tooltip")
                .style("opacity", 0);

            // add the land areas to the map as path elements
            landGroup.selectAll("path")
                .data(world.features)
                .enter()
                .append("path")
                // draw each country
                .attr("d", d3.geoPath()
                    .projection(projection)
                )
                // set the color of each country
                .attr("fill", function (d) {
                    d.total = data.get(d.id) || 0;
                    return colorScale(d.total);
                })
                .style("stroke", "transparent")
                .attr("class", function(d){ return "Country" } )
                .style("opacity", .8)
                // add event handlers for mouseover and mouseout events
                .on("mouseover", function(d) {
                    // change the fill color of the hovered path element
                    d3.selectAll(".Country")
                        .transition()
                        .duration(200)
                        .style("opacity", .5);
                    d3.select(this)
                        .transition()
                        .duration(200)
                        .style("opacity", 1)
                        .style("stroke", "black");
                    // show tooltip with country name and total value
                    tooltip.html(`<strong>${d.properties.name}</strong><br/>Age: ${d.total}`)
                        .style("left", (d3.event.pageX + 10) + "px")
                        .style("top", (d3.event.pageY + 10) + "px")
                        .transition()
                        .duration(200)
                        .style("opacity", .9);
                })
                .on("mouseout", function(d) {
                    // change the fill color of the previously hovered path element
                    d3.selectAll(".Country")
                        .transition()
                        .duration(200)
                        .style("opacity", .8);
                    d3.select(this)
                        .transition()
                        .duration(200)
                        .style("stroke", "transparent");
                    // hide tooltip
                    tooltip.transition()
                        .duration(200)
                        .style("opacity", 0);
                });
        }
    }

    function update2017() {
        svg.selectAll(".state").remove();

        d3.queue()
            .defer(d3.json, "data/world.geojson")
            .defer(d3.csv, "data/age_range_data.csv", function(d) {
                if (d.Year === "2017") {
                    data.set(d.Code, parseFloat(+d.AllAges));
                    console.log(parseFloat(d))
                }
            })
            .await(draw);

        function draw (error, world) {
            if (error) throw error;

            // create a group for the land path elements
            const landGroup = svg.append("g");

            // create a tooltip element and hide it initially
            const tooltip = d3.select("body").append("div")
                .attr("class", "tooltip")
                .style("opacity", 0);

            // add the land areas to the map as path elements
            landGroup.selectAll("path")
                .data(world.features)
                .enter()
                .append("path")
                // draw each country
                .attr("d", d3.geoPath()
                    .projection(projection)
                )
                // set the color of each country
                .attr("fill", function (d) {
                    d.total = data.get(d.id) || 0;
                    return colorScale(d.total);
                })
                .style("stroke", "transparent")
                .attr("class", function(d){ return "Country" } )
                .style("opacity", .8)
                // add event handlers for mouseover and mouseout events
                .on("mouseover", function(d) {
                    // change the fill color of the hovered path element
                    d3.selectAll(".Country")
                        .transition()
                        .duration(200)
                        .style("opacity", .5);
                    d3.select(this)
                        .transition()
                        .duration(200)
                        .style("opacity", 1)
                        .style("stroke", "black");
                    // show tooltip with country name and total value
                    tooltip.html(`<strong>${d.properties.name}</strong><br/>Age: ${d.total}`)
                        .style("left", (d3.event.pageX + 10) + "px")
                        .style("top", (d3.event.pageY + 10) + "px")
                        .transition()
                        .duration(200)
                        .style("opacity", .9);
                })
                .on("mouseout", function(d) {
                    // change the fill color of the previously hovered path element
                    d3.selectAll(".Country")
                        .transition()
                        .duration(200)
                        .style("opacity", .8);
                    d3.select(this)
                        .transition()
                        .duration(200)
                        .style("stroke", "transparent");
                    // hide tooltip
                    tooltip.transition()
                        .duration(200)
                        .style("opacity", 0);
                });
        }
    }
}