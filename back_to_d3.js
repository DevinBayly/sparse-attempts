var margin = {top:10,right:70,left:70,bottom:30}
    w = 1500
    h = 800
var svg = d3.select("body").append("svg")

svg.attr("width", w)
    .attr("height",h)



var data = d3.range(50).map(function (d) { return ~~(Math.random()*h)});


var xScale = d3.scale.linear()
    .domain([0,Math.max(...data)])
    .range([margin.left,w -margin.right])
var yScale = d3.scale.linear()
    .domain([0,h])
    .range([margin.top,h-margin.bottom])

var invYscale = yScale
    .range([h-margin.bottom,margin.top])

var xaxis = d3.svg.axis().scale(xScale).orient("bottom").ticks(5)
var yaxis = d3.svg.axis().scale(invYscale).orient("right").ticks(10)

svg.append("g").selectAll("circle").data(data).enter().append("circle")
    .attr("r", function (d) {return ~~(d/Math.max(...data)*40)})
    .attr("cy",function (d) {return invYscale(d)})
    .attr("cx", function (d){ return xScale(d) })
function make_xaxis() {
        return d3.svg.axis()
                .scale(xScale)
                .orient("bottom")
                .ticks(20)
    }

function make_yaxis() {
        return d3.svg.axis()
                .scale(yScale)
                .orient("left")
                .ticks(10)
    }
svg.append("g")
    .attr("class","axis")
    .attr("transform","translate (0,"+ (h - margin.bottom) +")")
    .call(xaxis)

svg.append("g")
    .attr("class","axis")
    .attr("transform","translate (5,10)")
    .call(yaxis)

svg.append("g")
    .attr("class","grid")
    .attr("transform","translate (0,"+ (h - margin.bottom) +")")
    .call(make_xaxis()
         .tickSize(-h,0,0)
         .tickFormat(""))

svg.append("g")
    .attr("class","grid")
    .attr("transform","translate (5,10)")
    .call(make_yaxis()
         .tickSize(-w,0,0)
         .tickFormat(""))




