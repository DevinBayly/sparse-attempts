var h = 400,
    w = 1250,
    margin = {left:20,right:20,top:10,bottom:10};
d3.json("word_comparison.json", function (data) {create_bars(data)})



function create_bars (incoming){
    my_data = incoming
    xScale = d3.scale.ordinal()
    .domain(d3.range(incoming.length).map( function (d) { return incoming[d].word } ))
    xScale.rangePoints([margin.left,(w-margin.right)])

    yScale = d3.scale.linear()
    .domain(d3.extent(incoming.map(function(item ) {
        if (item.people.devin > item.people.angela) {
            return item.people.devin
        } else {
            return item.people.angela
        }
    })))
    .range([1,(h-margin.top)])

    bottomScale = d3.scale.ordinal()
    bottomScale.domain(d3.range(incoming.length).map( function (d) { return incoming[d].word  } ))
    bottomScale.rangePoints([margin.left,(w-margin.right)])

    xAxis = d3.svg.axis().scale(xScale)
        .orient("bottom")
        .tickFormat(function (d){
            return incoming[d].word
        })
    svg = d3.select("body").append("svg")
        .attr({
            "height":h,
            "width":w})


    dev_rects = svg.selectAll(".dev").data(incoming).enter().append("rect")
    .attr({
        "class":"dev",
        width : xScale.rangeBand(),
        x: function (d) {return xScale(d.word)},
        y: function(d) {return ( h  - yScale( d.people.devin ) )},
        height: function (d) {return ( yScale( d.people.devin ) )},
        fill:"red"
    })
    angela_rects = svg.selectAll(".ang").data(incoming).enter().append("rect")
    .attr({
        "class":"ang",
        width : xScale.rangeBand(),
        x: function (d, i) {return xScale(i)},
        y: function(d) {return ( h - yScale( d.people.angela ) )},
        height: function (d) {return ( yScale( d.people.angela ) )},
        fill:"blue"
    })

    d3.selectAll("rect").on("mouseover", function (d,i){
      d3.select(this)
      .attr("fill","gold")
      var xPos = (parseFloat(d3.select(this).attr('x'))) + ( xScale.rangeBand() / 2 ) + 15

      var yPos = ~~( (parseFloat(d3.select(this).attr('y')))/2) + h/2

      var val = (d3.select(this).classed("ang")) ? d.people.angela : d.people.devin

      var person = (d3.select(this).classed("ang")) ? "Angela" : "Devin"

      d3.select("#tooltip").classed("hidden",false)
      d3.select("#person")
        .text(person)

      d3.select("#tooltip")
        .style("left", xPos + "px")
        .style("top", yPos + "px")
        .select("#word")
        .text(d.word)

      d3.select("#value")
        .text(val+" ")

    })
    .on("mouseout", function (){
        if ( d3.select(this).classed("ang") )
            d3.select(this).attr("fill","blue");
        else
            d3.select(this).attr("fill","red")


        d3.select("#tooltip").classed("hidden",true)


    })

    bottomAxis = d3.svg.axis().scale(bottomScale)
    loH = 100 // this material could be called contexts just because it helps to frame the context for the material above?
    d3.select("body").append("div")
      .append("svg")
        .attr({
         height: loH,
         width: w,
    })
      .append("g")   //remember below that the em stands for a relative unit specifying values relative to the parent value
        .classed("low axis",true)
        .attr("transform","translate (0,"+( loH/3 )+")")
        .call(bottomAxis)

      .selectAll("text")
        .style("text-anchor","end")
        .attr("transform","rotate(-65)")
        .attr("dx","-.8em")
        .attr("dy",".15em")

    brushed = function () {
        xScale.domain(brush.empty() ? d3.range(incoming.length) : brush.extent())
        dev_rects.attr("x",function (d,i) {console.log(i)})
        dev_rects.attr("width", xScale.rangeBand())
    }



    brush = d3.svg.brush().x(bottomScale).on("brush",brushed)

    d3.select("div > svg").append("g")
        .attr("class","brush")
        .call(brush)
      .selectAll("rect")
        .attr("height",loH)


   }

