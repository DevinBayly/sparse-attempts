var focus_height = 400,
    h =  50,
    w = 1250,
    margin = {left:20,right:20,top:10,bottom:40};
d3.json("word_comparison.json", function (data) create_bars(data))

function create_bars (incoming){
    my_dat = incoming

    xScale = d3.scale.ordinal()
    xScale.domain(d3.range(incoming.length).map( function (d) { return incoming[d].word  } ))
    xScale.rangeRoundBands([margin.left,(w-margin.right)])

    xAxis = d3.svg.axis().scale(xScale)

    focusScale = xScale.copy()
    focusScale.rangeRoundBands([margin.left,(w-margin.right)])

    yScale = d3.scale.linear()
    yScale.domain(d3.extent(incoming.map( function (word) {return word.people.angela > word.people.devin ? word.people.angela : word.people.devin} )))
    //the line above effectively determines which word has the highest use count considering both devin and angela scores
    yScale.range([1,focus_height-margin.top])

    brushed = function () {
        var ex= d3.event.target.extent()
        var selected = xScale.domain().filter( function (d) {
            return ex[0] <= xScale(d) && xScale(d) <= ex[1]
        } )
        console.log(selected)
        focusScale.domain( brush.empty() ? xScale.domain() : selected)
        d3.selectAll("rect")
            .attr({
                x: function (d) {return focusScale(d.word)},
                width: focusScale.rangeBand(),
            })
    }
    brush = d3.svg.brush().x(xScale).on("brush",brushed)

    d3.select("body").append("svg")
        .attr("class","rectContainer")
        .attr("width",w)
        .attr("height",focus_height)
    .selectAll("rect").data(incoming).enter().append("rect")
        .attr({
            x: function (d) {return focusScale(d.word) },
            y: function (d) {return focus_height-yScale(d.people.angela)},
            width: focusScale.rangeBand(),
            height: function (d) {return yScale(d.people.angela)},
        })

    d3.select("body").append("svg")
        .attr("class","axisContainer")
        .attr({
        height: h,
        width: w,})
    .append("g")
        .attr("class","x axis")
        .attr("transform","translate (0,"+(margin.top)+")")
        .call(xAxis)
    .selectAll("text")
        .attr({
            dx: "-.8em",
            dy: ".15em",
            transform: "rotate(-65)",
        })
        .style("text-anchor","end")
        .style("font-size","8px")
    d3.select(".axisContainer").append("g")
        .classed("brush",true)
        .call(brush)
      .selectAll("rect")
        .attr("height",h)
    }
