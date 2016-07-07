// for some reason this doesn't generate the tooltips in a visible way how I'd like//
var dataset = []
var h = 400
var w = 1000
var sortYes = false
for (i =0;i<20;i++){
    dataset.push(Math.floor(Math.random()*100))
}
yScale = d3.scale.linear()
    .domain([0,d3.max(dataset)])
    .range([0,h])
xScale = d3.scale.ordinal()
    .domain(d3.range(dataset.length))
    .rangeRoundBands([0,w],.05)
svg = d3.select("body").append("svg")
svg.attr({
    height:h,
    width:w,
})

rects = svg.selectAll("rect").data(dataset).enter().append("rect")
rects.attr({
    height:function(d) {return yScale(d);},
    x:function(d,i) {return xScale(i);},
    width: xScale.rangeBand(),
    y:function(d) {return h-yScale(d)}
})

rects.classed("rect",true)

svg.selectAll("rect").on("mouseover",function (d){
    var xPos = parseFloat(d3.select(this).attr("x") + xScale.rangeBand()/2)
    var yPos = parseFloat(d3.select(this).attr("y")) + 15
    svg.append("text")
    .attr("id", "tooltip")
    .attr("x", xPos)
    .attr("y", yPos)
    .attr("text-anchor", "middle")
    .attr("font-family", "sans-serif")
    .attr("font-size", "11px")
    .attr("font-weight", "bold")
    .attr("fill", "black")
    .text(d)
    console.log("generating tooltip")
})
svg.selectAll("rect").on("mouseout",function(){
     d3.select("#tooltip").remove()
     console.log("removing tooltip")
})
