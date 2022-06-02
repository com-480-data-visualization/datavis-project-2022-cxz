
function plot_box(){ 
  const parseTime1  = d3.timeParse("%Y")
  function convert(d) {
    var str = d.Year.slice(0,-1)
    delete d.Year
    d.points = Object.values(d).filter(x => !x=="")
    d.date = parseTime1(str)
    d.q1 = d3.quantile(d.points.sort(d3.ascending),.25)
    d.median = d3.quantile(d.points.sort(d3.ascending),.5)
    d.q3 = d3.quantile(d.points.sort(d3.ascending),.75)
    d.iqr = d.q3 - d.q1
    d.min = d.q1 - 1.5 * d.iqr
    d.max = d.q3 + 1.5 * d.iqr
  
    return d
  }
  function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);}
  
  // Read the data and compute summary statistics for each specie
  d3.csv("assets/data/renewable_energy_full_name_transpose.csv", convert).then(function(data) {
    console.log(data)
  
  
    // set the dimensions and margins of the graph
    var margin = {top: 10, right: 30, bottom: 30, left: 40},
    width = Math.max(Math.min(0.7 * $(window).width(), 800), 400) - margin.left - margin.right,
    height = Math.max(Math.min(0.4 * $(window).width(), 500), 300) - margin.top - margin.bottom;
  
    // append the svg object to the body of the page
    let fig = document.getElementsByClassName("box-plot")[0];
    if (fig) {
      fig.innerHTML = '';
    }
    var svg = d3.select(".box-plot")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
      "translate(" + margin.left + "," + margin.top + ")");
  
    //the tag for showing countries
    var div = d3.select('.box-plot').append("div")
    .style("opacity", 0.9)
    .style('background','#69b3a2')
    .style('display','none')
    .style('pointer-events','none')
    .style("position", "absolute");
  
  
  
    // Show the X scale
    var x = d3.scaleTime()
      .range([ 0, width ])
      .domain([parseTime1("2003"),parseTime1("2021")])
  
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .style("font-family", "Kalam")
      .call(d3.axisBottom(x))
  
    // Show the Y scale
    ymin = d3.min(data, function(d) { return d3.min(d.points)})
    ymax = d3.max(data, function(d) { return d3.max(d.points)})
    var y = d3.scaleLinear()
      .domain([-30,100])
      .range([height, 0])
    svg.append("g").style("font-family", "Kalam").call(d3.axisLeft(y))
  
    // Show the main vertical line
    svg
      .selectAll("vertLines")
      .data(data)
      .enter()
      .append("line")
        .attr("x1", function(d){return(x(d.date))})
        .attr("x2", function(d){return(x(d.date))})
        .attr("y1", function(d){return(y(d.min))})
        .attr("y2", function(d){return(y(d.max))})
        .attr("stroke", "black")
        .style("width", 40)
  
    // rectangle for the main box
    var boxWidth = width/21;
    svg
      .selectAll("boxes")
      .data(data)
      .enter()
      .append("rect")
          .attr("x", function(d){return(x(d.date)-boxWidth/2)})
          .attr("y", function(d){return(y(d.q3))})
          .attr("height", function(d){return(y(d.q1)-y(d.q3))})
          .attr("width", boxWidth )
          .attr("stroke", "black")
          .style("fill", "#69b3a2")
  
    // Show the median
    console.log(data)
    svg
      .selectAll("medianLines")
      .data(data)
      .enter()
      .append("line")
        .attr("x1", function(d){return(x(d.date)-boxWidth/2) })
        .attr("x2", function(d){return(x(d.date)+boxWidth/2) })
        .attr("y1", function(d){return(y(d.median))})
        .attr("y2", function(d){return(y(d.median))})
        .attr("stroke", "black")
        .style("width", 80)
  
  // Add individual points with jitter
  var jitterWidth = 30
  svg
    .selectAll("indPoints")
    .data(data)
    .enter()
    .append("g")
    .selectAll("circle")
    .data(function(d) {return d.points.map(g => ({
      year: d.date,
      value: g,
      country: getKeyByValue(d,g)
    }))}) //d is a year's data, i.e. d.points d.date etc
    .enter()
    .append("circle")
      .attr("cx", function(g){return(x(g.year) - jitterWidth/2 + Math.random()*jitterWidth )})
      .attr("cy", function(g){return(y(g.value))})
      .attr("r", width/350)
      .style("fill", "white")
      .attr("stroke", "black")
    .on('mouseover', function (event, g) {
      const[x, y] = d3.pointer(event,svg);
      console.log(y)
      d3.select(this).transition()
         .duration('50')
         .attr('r', width/175)
      div.style("display",'block')
         .html(g.country)
         .style("left", (x-10) + "px")
         .style("top", (y-30) + "px");
    })
     .on('mouseout', function (event, g) {
      d3.select(this).transition()
         .duration('50')
         .attr('r', width/350);
      div.style("display",'none')
    })
  
  
  })
}

plot_box();
$( window ).resize(function() {
  plot_box();
});

