var my_data = d3.range(5).map(function(d) {return ~~(Math.random()*100)});

var margin = {top:10,right:10,left:10,bottom:20},
    w = 600 - margin.right - margin.left,
    h = 200 - margin.top - margin.bottom,
    rad = 40;
var x = d3.scale.linear()
    .domain([0, my_data.length-1 ])
    .range([margin.left+ rad,w-rad]);

var svg = d3.select("body").append("svg")
    .attr("width", w + margin.right + margin.left)
    .attr("height", h + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


var circles = svg.append("g").selectAll("circle").data(my_data).enter();

var cir5 = circles.append("circle").attr({
    r:rad,
    cy:100,
    cx:function(d,i) {return x(i)}
});

var brush = d3.svg.brush().x(x.range([margin.left,w]));

svg.append("g")
    .attr("class","brush")
    .call(brush
    .on("brushstart",brushstart)
    .on("brushend",brushend)
    .on("brush",brushmove))
  .selectAll("rect")
    .attr("height",h);

function brushstart () {
     svg.classed("selecting",true)
}

function brushmove (){
    var extent = d3.event.target.extent();
    cir5.classed("selected",function(d,i) {
         return extent[0] <= i && i <= extent[1]
    })

}

function brushend () {
    svg.classed("selecting", !d3.event.target.empty());
    console.log("ended")

}
