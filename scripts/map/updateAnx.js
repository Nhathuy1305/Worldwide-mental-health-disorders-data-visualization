const colorScaleAn1 = d3.scaleThreshold()
    .domain([1, 2, 3, 4, 5, 6, 7])
    .range(d3.schemeReds[7]);

function updateAn1991() {
    svg.selectAll(".state").remove();

    d3.queue()
        .defer(d3.json, "data/world.geojson")
        .defer(d3.csv, "data/world_data.csv", function(d) {
            if (d.Year === "1991") {
                data.set(d.Code, +d.AnxietyDisorders);
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
                return colorScaleAn1(d.total);
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
                tooltip.html(`<strong>${d.properties.name}</strong><br/>Anxiety Disorders: ${d.total}`)
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

function updateAn1992() {
    svg.selectAll(".state").remove();

    d3.queue()
        .defer(d3.json, "data/world.geojson")
        .defer(d3.csv, "data/world_data.csv", function(d) {
            if (d.Year === "1992") {
                data.set(d.Code, +d.AnxietyDisorders);
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
                return colorScaleAn1(d.total);
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
                tooltip.html(`<strong>${d.properties.name}</strong><br/>Anxiety Disorders: ${d.total}`)
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

function updateAn1993() {
    svg.selectAll(".state").remove();

    d3.queue()
        .defer(d3.json, "data/world.geojson")
        .defer(d3.csv, "data/world_data.csv", function(d) {
            if (d.Year === "1993") {
                data.set(d.Code, +d.AnxietyDisorders);
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
                return colorScaleAn1(d.total);
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
                tooltip.html(`<strong>${d.properties.name}</strong><br/>Anxiety Disorders: ${d.total}`)
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

function updateAn1994() {
    svg.selectAll(".state").remove();

    d3.queue()
        .defer(d3.json, "data/world.geojson")
        .defer(d3.csv, "data/world_data.csv", function(d) {
            if (d.Year === "1994") {
                data.set(d.Code, +d.AnxietyDisorders);
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
                return colorScaleAn1(d.total);
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
                tooltip.html(`<strong>${d.properties.name}</strong><br/>Anxiety Disorders: ${d.total}`)
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

function updateAn1995() {
    svg.selectAll(".state").remove();

    d3.queue()
        .defer(d3.json, "data/world.geojson")
        .defer(d3.csv, "data/world_data.csv", function(d) {
            if (d.Year === "1995") {
                data.set(d.Code, +d.AnxietyDisorders);
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
                return colorScaleAn1(d.total);
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
                tooltip.html(`<strong>${d.properties.name}</strong><br/>Anxiety Disorders: ${d.total}`)
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

function updateAn1996() {
    svg.selectAll(".state").remove();

    d3.queue()
        .defer(d3.json, "data/world.geojson")
        .defer(d3.csv, "data/world_data.csv", function(d) {
            if (d.Year === "1996") {
                data.set(d.Code, +d.AnxietyDisorders);
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
                return colorScaleAn1(d.total);
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
                tooltip.html(`<strong>${d.properties.name}</strong><br/>Anxiety Disorders: ${d.total}`)
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

function updateAn1997() {
    svg.selectAll(".state").remove();

    d3.queue()
        .defer(d3.json, "data/world.geojson")
        .defer(d3.csv, "data/world_data.csv", function(d) {
            if (d.Year === "1997") {
                data.set(d.Code, +d.AnxietyDisorders);
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
                return colorScaleAn1(d.total);
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
                tooltip.html(`<strong>${d.properties.name}</strong><br/>Anxiety Disorders: ${d.total}`)
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

function updateAn1998() {
    svg.selectAll(".state").remove();

    d3.queue()
        .defer(d3.json, "data/world.geojson")
        .defer(d3.csv, "data/world_data.csv", function(d) {
            if (d.Year === "1998") {
                data.set(d.Code, +d.AnxietyDisorders);
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
                return colorScaleAn1(d.total);
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
                tooltip.html(`<strong>${d.properties.name}</strong><br/>Anxiety Disorders: ${d.total}`)
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

function updateAn1999() {
    svg.selectAll(".state").remove();

    d3.queue()
        .defer(d3.json, "data/world.geojson")
        .defer(d3.csv, "data/world_data.csv", function(d) {
            if (d.Year === "1999") {
                data.set(d.Code, +d.AnxietyDisorders);
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
                return colorScaleAn1(d.total);
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
                tooltip.html(`<strong>${d.properties.name}</strong><br/>Anxiety Disorders: ${d.total}`)
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

function updateAn2000() {
    svg.selectAll(".state").remove();

    d3.queue()
        .defer(d3.json, "data/world.geojson")
        .defer(d3.csv, "data/world_data.csv", function(d) {
            if (d.Year === "2000") {
                data.set(d.Code, +d.AnxietyDisorders);
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
                return colorScaleAn1(d.total);
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
                tooltip.html(`<strong>${d.properties.name}</strong><br/>Anxiety Disorders: ${d.total}`)
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

function updateAn2001() {
    svg.selectAll(".state").remove();

    d3.queue()
        .defer(d3.json, "data/world.geojson")
        .defer(d3.csv, "data/world_data.csv", function(d) {
            if (d.Year === "2001") {
                data.set(d.Code, +d.AnxietyDisorders);
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
                return colorScaleAn1(d.total);
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
                tooltip.html(`<strong>${d.properties.name}</strong><br/>Anxiety Disorders: ${d.total}`)
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

function updateAn2002() {
    svg.selectAll(".state").remove();

    d3.queue()
        .defer(d3.json, "data/world.geojson")
        .defer(d3.csv, "data/world_data.csv", function(d) {
            if (d.Year === "2002") {
                data.set(d.Code, +d.AnxietyDisorders);
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
                return colorScaleAn1(d.total);
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
                tooltip.html(`<strong>${d.properties.name}</strong><br/>Anxiety Disorders: ${d.total}`)
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

function updateAn2003() {
    svg.selectAll(".state").remove();

    d3.queue()
        .defer(d3.json, "data/world.geojson")
        .defer(d3.csv, "data/world_data.csv", function(d) {
            if (d.Year === "2003") {
                data.set(d.Code, +d.AnxietyDisorders);
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
                return colorScaleAn1(d.total);
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
                tooltip.html(`<strong>${d.properties.name}</strong><br/>Anxiety Disorders: ${d.total}`)
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

function updateAn2004() {
    svg.selectAll(".state").remove();

    d3.queue()
        .defer(d3.json, "data/world.geojson")
        .defer(d3.csv, "data/world_data.csv", function(d) {
            if (d.Year === "2004") {
                data.set(d.Code, +d.AnxietyDisorders);
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
                return colorScaleAn1(d.total);
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
                tooltip.html(`<strong>${d.properties.name}</strong><br/>Anxiety Disorders: ${d.total}`)
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

function updateAn2005() {
    svg.selectAll(".state").remove();

    d3.queue()
        .defer(d3.json, "data/world.geojson")
        .defer(d3.csv, "data/world_data.csv", function(d) {
            if (d.Year === "2005") {
                data.set(d.Code, +d.AnxietyDisorders);
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
                return colorScaleAn1(d.total);
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
                tooltip.html(`<strong>${d.properties.name}</strong><br/>Anxiety Disorders: ${d.total}`)
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

function updateAn2006() {
    svg.selectAll(".state").remove();

    d3.queue()
        .defer(d3.json, "data/world.geojson")
        .defer(d3.csv, "data/world_data.csv", function(d) {
            if (d.Year === "2006") {
                data.set(d.Code, +d.AnxietyDisorders);
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
                return colorScaleAn1(d.total);
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
                tooltip.html(`<strong>${d.properties.name}</strong><br/>Anxiety Disorders: ${d.total}`)
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

function updateAn2007() {
    svg.selectAll(".state").remove();

    d3.queue()
        .defer(d3.json, "data/world.geojson")
        .defer(d3.csv, "data/world_data.csv", function(d) {
            if (d.Year === "2007") {
                data.set(d.Code, +d.AnxietyDisorders);
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
                return colorScaleAn1(d.total);
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
                tooltip.html(`<strong>${d.properties.name}</strong><br/>Anxiety Disorders: ${d.total}`)
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

function updateAn2008() {
    svg.selectAll(".state").remove();

    d3.queue()
        .defer(d3.json, "data/world.geojson")
        .defer(d3.csv, "data/world_data.csv", function(d) {
            if (d.Year === "2008") {
                data.set(d.Code, +d.AnxietyDisorders);
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
                return colorScaleAn1(d.total);
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
                tooltip.html(`<strong>${d.properties.name}</strong><br/>Anxiety Disorders: ${d.total}`)
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

function updateAn2009() {
    svg.selectAll(".state").remove();

    d3.queue()
        .defer(d3.json, "data/world.geojson")
        .defer(d3.csv, "data/world_data.csv", function(d) {
            if (d.Year === "2009") {
                data.set(d.Code, +d.AnxietyDisorders);
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
                return colorScaleAn1(d.total);
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
                tooltip.html(`<strong>${d.properties.name}</strong><br/>Anxiety Disorders: ${d.total}`)
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

function updateAn2010() {
    svg.selectAll(".state").remove();

    d3.queue()
        .defer(d3.json, "data/world.geojson")
        .defer(d3.csv, "data/world_data.csv", function(d) {
            if (d.Year === "2010") {
                data.set(d.Code, +d.AnxietyDisorders);
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
                return colorScaleAn1(d.total);
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
                tooltip.html(`<strong>${d.properties.name}</strong><br/>Anxiety Disorders: ${d.total}`)
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

function updateAn2011() {
    svg.selectAll(".state").remove();

    d3.queue()
        .defer(d3.json, "data/world.geojson")
        .defer(d3.csv, "data/world_data.csv", function(d) {
            if (d.Year === "2011") {
                data.set(d.Code, +d.AnxietyDisorders);
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
                return colorScaleAn1(d.total);
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
                tooltip.html(`<strong>${d.properties.name}</strong><br/>Anxiety Disorders: ${d.total}`)
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

function updateAn2012() {
    svg.selectAll(".state").remove();

    d3.queue()
        .defer(d3.json, "data/world.geojson")
        .defer(d3.csv, "data/world_data.csv", function(d) {
            if (d.Year === "2012") {
                data.set(d.Code, +d.AnxietyDisorders);
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
                return colorScaleAn1(d.total);
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
                tooltip.html(`<strong>${d.properties.name}</strong><br/>Anxiety Disorders: ${d.total}`)
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

function updateAn2013() {
    svg.selectAll(".state").remove();

    d3.queue()
        .defer(d3.json, "data/world.geojson")
        .defer(d3.csv, "data/world_data.csv", function(d) {
            if (d.Year === "2013") {
                data.set(d.Code, +d.AnxietyDisorders);
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
                return colorScaleAn1(d.total);
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
                tooltip.html(`<strong>${d.properties.name}</strong><br/>Anxiety Disorders: ${d.total}`)
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

function updateAn2014() {
    svg.selectAll(".state").remove();

    d3.queue()
        .defer(d3.json, "data/world.geojson")
        .defer(d3.csv, "data/world_data.csv", function(d) {
            if (d.Year === "2014") {
                data.set(d.Code, +d.AnxietyDisorders);
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
                return colorScaleAn1(d.total);
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
                tooltip.html(`<strong>${d.properties.name}</strong><br/>Anxiety Disorders: ${d.total}`)
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

function updateAn2015() {
    svg.selectAll(".state").remove();

    d3.queue()
        .defer(d3.json, "data/world.geojson")
        .defer(d3.csv, "data/world_data.csv", function(d) {
            if (d.Year === "2015") {
                data.set(d.Code, +d.AnxietyDisorders);
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
                return colorScaleAn1(d.total);
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
                tooltip.html(`<strong>${d.properties.name}</strong><br/>Anxiety Disorders: ${d.total}`)
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

function updateAn2016() {
    svg.selectAll(".state").remove();

    d3.queue()
        .defer(d3.json, "data/world.geojson")
        .defer(d3.csv, "data/world_data.csv", function(d) {
            if (d.Year === "2016") {
                data.set(d.Code, +d.AnxietyDisorders);
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
                return colorScaleAn1(d.total);
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
                tooltip.html(`<strong>${d.properties.name}</strong><br/>Anxiety Disorders: ${d.total}`)
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

function updateAn2017() {
    svg.selectAll(".state").remove();

    d3.queue()
        .defer(d3.json, "data/world.geojson")
        .defer(d3.csv, "data/world_data.csv", function(d) {
            if (d.Year === "2017") {
                data.set(d.Code, +d.AnxietyDisorders);
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
                return colorScaleAn1(d.total);
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
                tooltip.html(`<strong>${d.properties.name}</strong><br/>Anxiety Disorders: ${d.total}`)
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