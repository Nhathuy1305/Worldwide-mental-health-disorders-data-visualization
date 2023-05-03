const width = 960,
    height = 500;

const years = [
    {year: 1990}, {year: 1991}, {year: 1992}, {year: 1993}, {year: 1994}, {year: 1995}, {year: 1996}, {year: 1997},
    {year: 1998}, {year: 1999}, {year: 2000}, {year: 2001}, {year: 2002}, {year: 2003}, {year: 2004}, {year: 2005},
    {year: 2006}, {year: 2007}, {year: 2008}, {year: 2009}, {year: 2010}, {year: 2011}, {year: 2012}, {year: 2013},
    {year: 2014}, {year: 2015}, {year: 2016}, {year: 2017}
]

const maps = [
    {type: "Age"},
    {type: "Population"},
    {type: "Suicide rate"},
    {type: "Disorder rate"}
]

const options = [
    {name: "Aitoff", projection: d3.geoAitoff()},
    {name: "Albers", projection: d3.geoAlbers().scale(145).parallels([20, 50])},
    {name: "August", projection: d3.geoAugust().scale(60)},
    {name: "Baker", projection: d3.geoBaker().scale(100)},
    {name: "Boggs", projection: d3.geoBoggs()},
    {name: "Bonne", projection: d3.geoBonne().scale(120)},
    {name: "Bromley", projection: d3.geoBromley()},
    {name: "Collignon", projection: d3.geoCollignon().scale(93)},
    {name: "Craster Parabolic", projection: d3.geoCraster()},
    {name: "Eckert I", projection: d3.geoEckert1().scale(165)},
    {name: "Eckert II", projection: d3.geoEckert2().scale(165)},
    {name: "Eckert III", projection: d3.geoEckert3().scale(180)},
    {name: "Eckert IV", projection: d3.geoEckert4().scale(180)},
    {name: "Eckert V", projection: d3.geoEckert5().scale(170)},
    {name: "Eckert VI", projection: d3.geoEckert6().scale(170)},
    {name: "Eisenlohr", projection: d3.geoEisenlohr().scale(60)},
    {name: "Equirectangular (Plate Carrée)", projection: d3.geoEquirectangular()},
    {name: "Hammer", projection: d3.geoHammer().scale(165)},
    {name: "Hill", projection: d3.geoHill()},
    {name: "Goode Homolosine", projection: d3.geoHomolosine()},
    {name: "Kavrayskiy VII", projection: d3.geoKavrayskiy7()},
    {name: "Lambert cylindrical equal-area", projection: d3.geoCylindricalEqualArea()},
    {name: "Lagrange", projection: d3.geoLagrange().scale(120)},
    {name: "Larrivée", projection: d3.geoLarrivee().scale(95)},
    {name: "Laskowski", projection: d3.geoLaskowski().scale(120)},
    {name: "Loximuthal", projection: d3.geoLoximuthal()},
    // {name: "Mercator", projection: d3.geoMercator().scale(490 / 2 / Math.PI)},
    {name: "Miller", projection: d3.geoMiller().scale(100)},
    {name: "McBryde–Thomas Flat-Polar Parabolic", projection: d3.geoMtFlatPolarParabolic()},
    {name: "McBryde–Thomas Flat-Polar Quartic", projection: d3.geoMtFlatPolarQuartic()},
    {name: "McBryde–Thomas Flat-Polar Sinusoidal", projection: d3.geoMtFlatPolarSinusoidal()},
    {name: "Mollweide", projection: d3.geoMollweide().scale(165)},
    {name: "Natural Earth", projection: d3.geoNaturalEarth()},
    {name: "Nell–Hammer", projection: d3.geoNellHammer()},
    {name: "Polyconic", projection: d3.geoPolyconic().scale(100)},
    {name: "Robinson", projection: d3.geoRobinson()},
    {name: "Sinusoidal", projection: d3.geoSinusoidal()},
    {name: "Sinu-Mollweide", projection: d3.geoSinuMollweide()},
    {name: "van der Grinten", projection: d3.geoVanDerGrinten().scale(75)},
    {name: "van der Grinten IV", projection: d3.geoVanDerGrinten4().scale(120)},
    {name: "Wagner IV", projection: d3.geoWagner4()},
    {name: "Wagner VI", projection: d3.geoWagner6()},
    {name: "Wagner VII", projection: d3.geoWagner7()},
    {name: "Winkel Tripel", projection: d3.geoWinkel3()}
];

options.forEach(function(o) {
    o.projection.rotate([0, 0]).center([0, 0]);
});

let i = 0;
let projection = options[i].projection;
const path = d3.geoPath(projection);
const graticule = d3.geoGraticule();
const svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

svg.append("defs")
    .append("path")
    .datum({type: "Sphere"})
    .attr("id", "sphere")
    .attr("d", path);
svg.append("use")
    .attr("class", "stroke")
    .attr("xlink:href", "#sphere");
svg.append("use")
    .attr("class", "fill")
    .attr("xlink:href", "#sphere");
svg.append("path")
    .datum(graticule)
    .attr("class", "graticule")
    .attr("d", path);

const menu = d3.select("#projection-menu")
    .on("change", change)
    .style("border-radius", "3px")
    .style("right", "-70px")

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

// function changeMap() {
//     const selectedOption = maps[this.selectedIndex];
//     updateMap(selectedOption);
// }
//
// function updateMap(option) {
//     svg.selectAll("path").interrupt().transition()
//         .duration(1000).ease(d3.easeLinear)
//         .attrTween("d", projectionTween(projection, projection = option.projection))
// }

// Years
const menu1 = d3.select("#years-menu")
    .on("change", change)
    .style("border-radius", "3px")
    .style("right", "-70px")

menu1.selectAll("option")
    .data(years)
    .enter().append("option")
    .text(function(d) { return d.year; });

// Maps
const menu2 = d3.select("#maps-menu")
    .on("change", change)
    .style("border-radius", "3px")
    .style("right", "-70px")

menu2.selectAll("option")
    .data(maps)
    .enter().append("option")
    .text(function(d) { return d.type; });

const data = d3.map();

const colorScale = d3.scaleThreshold()
    .domain([100000, 1000000, 10000000, 30000000, 100000000, 500000000])
    .range(d3.schemeGreens[7]);

let mapRowConverter = function(d) {

    return {
        country: d.Entity,
        year: +d.Year,
        pop: +d.Population
    };
};

d3.queue()
    .defer(d3.json, "data/world.geojson")
    .defer(d3.csv, "data/population_data.csv", mapRowConverter)
    // .defer(d3.csv, "data/suicide_rate_data.csv")
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
            tooltip.html(`<strong>${d.properties.name}</strong><br/>Population: ${d.total}`)
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