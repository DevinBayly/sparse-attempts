var w = 1200,
    h = 500,
    contextHeight = 100;

var margin = {
      top: 20,
      right: 20,
      bottom: 20,
      left: 50
    }
var line_data = [{
    x: 1,
    y: 5,
    }, {
    x: 20,
    y: 20,
    }, {
    x: 40,
    y: 10,
    }, {
    x: 60,
    y: 40,
    }, {
    x: 80,
    y: 5,
    }, {
    x: 100,
    y: 60,
    }];

var focus = d3.select("body").append("svg")
    .attr("class","focus")
    .attr({
        width:w,
        height:h
    })

var context = d3.select("body").append("svg")
    .attr("class","context")
    .attr({
        width:w,
        height:contextHeight,
    })

var xScale = d3.scale.linear()
    xScale.domain(d3.extent(line_data,function(d){return d.x}))
    xScale.range([margin.left,w-margin.right])
    
var contextXscale = xScale.copy()

var yScale = d3.scale.linear()
    yScale.domain([0,d3.max(line_data,function (d) {return d.y})])
    yScale.range([h,0])

var contextYscale = yScale.copy()
    .range([contextHeight,0])

var xAxis = d3.svg.axis()
    .scale(xScale)
    
var yAxis = d3.svg.axis()
    .scale(yScale)
    .orient("left")

var lineDraw = d3.svg.line()
    .x (function (d) {
        return xScale(d.x)})
    .y (function(d) {
        return yScale(d.y)})
    .interpolate("linear")

var brush = d3.svg.brush()
    .x(contextXscale)
    .on("brush",brushed)

function brushed () {
    xScale.domain( brush.empty() ? contextXscale.domain() : brush.extent())
    d3.select(".focus > .x.axis")
        .call(xAxis)
    focus.select("path.line")
        .attr("d", lineDraw)
}

focus.append("svg:g")
    .attr("class","x axis")
    .attr("transform","translate (0,"+(h-margin.bottom)+")")
    .call(xAxis)

focus.append("svg:g")
    .attr("class","y axis")
    .attr("transform","translate ("+(margin.left)+","+(-margin.bottom)+")")
    .call(yAxis)

focus.append("svg:path") // i'll have to adjust this line when i include the canvas inside the axis
    //.datum(line_data) both of these ways of attaching data work
    .data([line_data])
    .attr("class","line")
    .attr({
        d: lineDraw,
    })

context.append("svg:g")
    .attr("class","x axis")
    .attr("transform","translate (0,"+(contextHeight-margin.bottom)+")")
    .call(xAxis)

context.append("svg:g")
    .attr("class","brush")
    .call(brush)
  .selectAll("rect")
    .attr({
        height:contextHeight-margin.bottom,
    })

