var svg = d3.select("body").append("svg")

var h = 500,
    w = 1000,
    w2 = 700,
    h2 = 400
var x = d3.time.scale().range([0, w]),
    x2 = d3.time.scale().range([0, w2]),
    y = d3.scale.linear().range([h, 0]),
    y2 = d3.scale.linear().range([h2, 0]);

var brush = d3.svg.brush()
    .x(x2)
    .on("brush", brushed);

 svg.attr({
        height: h,
        width: w,
    });

svg.append("g")
  .attr("class", "x brush")
  .call(brush()     //call the brush function, causing it to create the rectangles
  .x(x)
  .on("brushed",brushed))
.selectAll("rect") //select all the just-created rectangles
  .attr("y", -6)
  .attr("h", h2 + 7); //set their h


function brushed() {
  x.domain(brush.empty() ? x2.domain() : brush.extent());
  focus.select(".area").attr("d", area);
  focus.select(".x.axis").call(xAxis);
}

var extent = brush.extent(); //returns [xMin, xMax]
var width = extent[1] - extent[0]; //data-width = max - min

