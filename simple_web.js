var my_svg = d3.select("body").append("svg")
my_svg.attr({
    width: 200,
    height:200,

})

d3.select("svg").append("circle").attr({
    r:20,
    cy:100,
    cx:100,
    id:"first",
})

d3.select("svg").append("text").attr({
    x:0,
    y:50,
}).text("hello")

d3.select("svg").append("text").attr({
    x:90,
    y:200,
}).text("world")
