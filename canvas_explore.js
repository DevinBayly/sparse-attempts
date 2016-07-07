var margin = {top:10,right:70,left:70,bottom:30};
    w = 1500;
    h = 800;

var base = d3.select("body");

var canvas = base.append("canvas");

canvas.attr("width",w)
    .attr("height",h);

var context = canvas.node().getContext("2d");

var data = [];

for (var i = 20 - 1; i >= 0; i--) {
    data.push(~~ (Math.random()*100))
}

var xScale= d3.scale.linear()
    .domain(d3.extent(data))
    .range([10, w-10]);

    data.forEach( function(d,i){
        context.beginPath();
        context.rect(xScale(d),h/2,10,10);
        context.fillStyle("red");
        context.closePath()
    } );
