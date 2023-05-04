const colorScale1 = d3.scaleThreshold()
    .domain([5, 20, 45, 70, 90, 100])
    .range(d3.schemeReds[7]);

function updateSuicideMap() {
    // Remove any existing elements
    svg.selectAll(".state").remove();

    d3.queue()
        .defer(d3.json, "data/world.geojson")
        .defer(d3.csv, "data/suicide_rate_data.csv", function(d) { data.set(d.Code, +d.SuicideRate); })
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
                return colorScale1(d.total);
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
                tooltip.html(`<strong>${d.properties.name}</strong><br/>Suicide rate: ${d.total}`)
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

const colorScale2 = d3.scaleThreshold()
    .domain([2, 3, 4, 5, 6, 7])
    .range(d3.schemeBlues[7]);

function updateDisorderMap() {
    // Remove any existing elements
    svg.selectAll(".state").remove();

    d3.queue()
        .defer(d3.json, "data/world.geojson")
        .defer(d3.csv, "data/world_data.csv", function(d) { data.set(d.Code, +d.Depression); })
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
                return colorScale2(d.total);
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
                tooltip.html(`<strong>${d.properties.name}</strong><br/>Depression: ${d.total}`)
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

const colorScale3 = d3.scaleThreshold()
    .domain([2, 3, 4, 5, 6, 7])
    .range(d3.schemeOranges[7]);

function updateAgeMap() {
    // Remove any existing elements
    svg.selectAll(".state").remove();

    d3.queue()
        .defer(d3.json, "data/world.geojson")
        .defer(d3.csv, "data/age_range_data.csv", function(d) { data.set(d.Code, +d.AgeStandardized); })
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
                return colorScale3(d.total);
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
                tooltip.html(`<strong>${d.properties.name}</strong><br/>All ages: ${d.total}`)
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