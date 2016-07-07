var h = 400,
    w = 1250,
    margin = {left:20,right:20,top:10,bottom:40};
var svg_can = d3.select("body").append("svg")
.attr({
    height:h,
    width:w,
})
var dat = []

for (i = 0;i < 20; i++){
    dat.push(~~( Math.random()*100 ))
}
var xScale = d3.scale.linear()
    .domain(d3.extent(dat))
    .range([margin.left,w-margin.left-margin.right])

var xAxis = d3.svg.axis()
    .scale(xScale)


svg_can.append("g")
.attr("transform","translate ("+margin.left+","+( h-margin.bottom )+")")
.call(xAxis)


d3.selectAll(".tick").on("mouseover", function () {
    d3.select(this).style("fill","red").classed("selected",true)
    console.log(d3.select(this).text())
})
d3.selectAll(".tick").on("mouseout", function () {
    d3.select(".tick.selected").style("fill","black").classed("selected",false)
})


