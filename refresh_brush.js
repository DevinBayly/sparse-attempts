var svg = d3.select("body").append("svg")
var margin = {left:50,bottom:50,top:50};

var h = 500,
    w = 1000,
    w2 = 700,
    h2 = 400
var x = d3.scale.linear().range([0, w]),
    x2 = d3.scale.linear().range([0, w2])
        .domain([0,w2]),
    contextXScale = x2.copy()
    y = d3.scale.linear().range([h, 0]),
    y2 = d3.scale.linear().range([h2, 0])
        .domain([0,h2]),
    contextYScale = y2.copy(); //I don't think it makes sense anymore to have time scales for x


var xAxis = d3.svg.axis().scale(x2),
    yAxis =  d3.svg.axis().scale(y2).orient("left");

var brush = d3.svg.brush()
    .x(x2)
    .y(y2)
    .on("brush",brushed)
/*
========================================
    initialization complete
========================================
*/
svg.attr({
        height: h,
        width: w,
    });

function brushed () {
    extent = brush.extent();//I really don't know how these measurements are supposed to fit with the hand tools
    x2.domain(brush.empty() ? contextXScale.domain() : [x2(extent[0][0]),x2(extent[1][0])]);
    y2.domain(brush.empty() ? contextYScale.domain() : [y2(extent[1][1]),y2(extent[0][1])]);

    // I can't quite find out whether there is  a y2 case other than the one that 

    d3.select("g.xAxis").call(xAxis);
    d3.select("g.yAxis").call(yAxis)
}

function brushdone() {
    // d3.select(".brush").call(brush.clear())
}
svg.append("g")
    .attr("class","brush")
    .attr("width",w2)
    .attr("transform","translate ("+margin.left+","+margin.top+")")
    .call(brush
    .on("brush",brushed)
        .on("brushend",brushdone)
    .x(x2)
         )
.selectAll("rect")
    .attr("y",6)
    .attr("height",h2 + 7)

svg.append("g")
    .classed("xAxis",true)
    .attr("transform","translate ("+margin.top+","+(h2+margin.bottom + 10)+")")
    .call(xAxis)

svg.append("g")
    .classed("yAxis",true)
    .attr("transform","translate("+margin.top+","+(10+margin.bottom)+")")
    .call(yAxis)

var extent = brush.extent()
var width = extent[1] - extent [0]
