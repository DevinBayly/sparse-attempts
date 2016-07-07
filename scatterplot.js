var my_vals = d3.range(50).map(function(d,i) {return {index:i,value:~~(Math.random()*100)}})
var h = 700
var w = 1000
var canvas = d3.select("body").append("svg")
var xScale = d3.scale.linear()
var yScale = d3.scale.linear()
var invYscale = yScale
var xAxis = d3.svg.axis().scale(xScale).orient("bottom")
var yAxis = d3.svg.axis().scale(invYscale).orient("left")
var brush = d3.svg.brush()
    .x(xScale)
    .on("brushmove",brushmove)
    .on("brushend",brushend)


var cirs = d3.select("svg").selectAll("circles").data(my_vals).enter().append("circle")


xScale.domain(d3.extent(my_vals, function (d) {return d.index}))
xScale.range([50,w-50])
yScale.domain(d3.extent(my_vals, function(d) {return d.value}))
yScale.range([20,h])
invYscale.range([h-10,90])
/*can't figure out how to get the y axis bar to start at the same place as the x axis*/



canvas.attr({
    height: h,
    width: w,
})
canvas.append("g").attr({
    transform:"translate (0,"+( h-20 ) +" )",
    "class":"x axis",
}).call(xAxis)

canvas.append("g")
    .attr("transform","translate ("+ 50 +",0)")
    .attr("class","y axis")
    .call(yAxis)
canvas.append("g")
    .attr("class","brush")
    .call(brush
.selectAll("rect").attr("height",h))

cirs.attr({
    r:function(d){return d.value/10},
    cy:function(d){return invYscale(d.value)},
    cx:function(d) {return xScale(d.index) + 20},
    "class": "point",
})
/* a very simple way of adding in tooltip capability
.append("title")
.text(function(d){return "value"+ d.value + ", index" +d.index + ""})
*/
cirs.on("mouseover",function(d){
    var xPos = xScale(d.index) + 15
    var yPos = invYscale(d.value) - 15

    d3.select("svg").append("text")
    .attr({
        "id":"tooltip",
        x:xPos,
        y:yPos,
    })
    .text("value: " + d.value + " index: " + d.index)
})
cirs.on("mouseout", function(d){


    d3.selectAll("#tooltip").transition().duration(500).remove()
})


cirs.on('mousedown', function(){
  brush_elm = canvas.select(".brush").node();
  new_click_event = new Event('mousedown');
  new_click_event.pageX = d3.event.pageX;
  new_click_event.clientX = d3.event.clientX;
  new_click_event.pageY = d3.event.pageY;
  new_click_event.clientY = d3.event.clientY;
  brush_elm.dispatchEvent(new_click_event);
});
function brushmove() {
    var extent = brush.extent()
    cirs.classed("selected", function () {
        is_brushed = extent[0] <= d.index && d.index <= extent[1]
        return is
    })
}

function brushend () {
    get_button = d3.select(".clear-button")
    if (get_button.empty() === true) {
        clear_button = canvas.append("text")
        .attr({
            x:460,
            y:825,
            "class":"clear-button",
            "text":"Clear Button",
        })
    }

    xScale.domain(brush.extent())

    transition_data()
    reset_axis()

    cirs.classed("selected",false)
    d3.select(".brush").call(brush.clear())

    clear_button.on("click", function () {
        xScale.domain([0,50])
        transition_data()
        reset_axis()
        clear_button.remove()
    })
}

function transition_data() {
     canvas.selectAll(".point")
         .data(data)
    .transition()
        .duration(500)
        .attr( {
            x:function(d) {return xScale(d.index)},
        })}

function reset_axis() {
     canvas.transition().duration(500)
     .select(".x.axis")
     .call(xAxis)
}



