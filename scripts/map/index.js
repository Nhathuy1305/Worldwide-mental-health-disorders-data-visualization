const width = 960,
    height = 500,
    padding = 50;

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

let i = 0, projection = options[i].projection;
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

const data = d3.map();

// define a variable to store the currently hovered path element
let hoveredPath = null;

const colorScale = d3.scaleThreshold()
    .domain([100000, 1000000, 10000000, 30000000, 100000000, 500000000])
    .range(d3.schemeBlues[7]);

d3.json("data/world.geojson", function(error, world) {
    if (error) throw error;

    // add the land areas to the map as path elements
    svg.append("g")
        .selectAll("path")
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
        });

});

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
    // d3.timeout(loop, 1000)
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