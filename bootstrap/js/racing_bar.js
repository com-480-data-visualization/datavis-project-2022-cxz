function plot_racing() {
  // Feel free to change or delete any of the code you see in this editor!
  let fig = document.getElementsByClassName("racing-chart-div")[0];
  if (fig) {
    fig.innerHTML = '';
  }

  let width = Math.max(Math.min(0.7 * $(window).width(), 800), 400);
  let height = Math.max(Math.min(0.4 * $(window).width(), 500), 300);

  let racing_svg = d3.select(".racing-chart-div").append("svg")
    .attr("width", width)
    .attr("height", height);

  let tickDuration = 1500;

  let top_n = 12;
  // let height = 600;
  // let width = 960;

  const margin = {
    top: 80,
    right: 0,
    bottom: 5,
    left: 0
  };

  let barPadding = (height - (margin.bottom + margin.top)) / (top_n * 5);

  let title = racing_svg.append('text')
    .attr('class', 'title')
    .attr('y', 24)
    .html('Top 10 Clean energy countries in EU by year');

  let subTitle = racing_svg.append("text")
    .attr("class", "subTitle")
    .attr("y", 55)
    .html("Clean energy as a percentage of total energy consumption");

  let caption = racing_svg.append('text')
    .attr('class', 'caption')
    .attr('x', width)
    .attr('y', height - 5)
    .style('text-anchor', 'end')
    .html('Source: Eurostat');

  let year = 2005;

  d3.csv('./assets/data/share_rank.csv').then(function (data) {
    //if (error) throw error;

    // console.log(data);

    data.forEach(d => {
      d.value = +d.value,
        d.lastValue = +d.lastValue,
        d.value = isNaN(d.value) ? 0 : d.value,
        d.year = +d.year,
        d.colour = d3.hsl(Math.random() * 360, 0.75, 0.75)
    });

    // console.log(data);

    let yearSlice = data.filter(d => d.year == year && !isNaN(d.value))
      .sort((a, b) => b.value - a.value)
      .slice(0, top_n);

    yearSlice.forEach((d, i) => d.rank = i);

    // console.log('yearSlice: ', yearSlice)

    let x = d3.scaleLinear()
      .domain([0, d3.max(yearSlice, d => d.value)])
      .range([margin.left, width - margin.right - 65]);

    let y = d3.scaleLinear()
      .domain([top_n, 0])
      .range([height - margin.bottom, margin.top]);

    let xAxis = d3.axisTop()
      .scale(x)
      .ticks(width > 500 ? 5 : 2)
      .tickSize(-(height - margin.top - margin.bottom))
      .tickFormat(d => d3.format(',')(d));

    racing_svg.append('g')
      .attr('class', 'axis xAxis')
      .attr('transform', `translate(0, ${margin.top})`)
      .call(xAxis)
      .selectAll('.tick line')
      .classed('origin', d => d == 0);

    racing_svg.selectAll('rect.bar')
      .data(yearSlice, d => d.name)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', x(0) + 1)
      .attr('width', d => x(d.value) - x(0) - 1)
      .attr('y', d => y(d.rank) + 5)
      .attr('height', y(1) - y(0) - barPadding)
      .style('fill', d => d.colour);

    racing_svg.selectAll('text.label')
      .data(yearSlice, d => d.name)
      .enter()
      .append('text')
      .attr('class', 'label')
      .attr('x', d => x(d.value) - 8)
      .attr('y', d => y(d.rank) + 5 + ((y(1) - y(0)) / 2) + 1)
      .style('text-anchor', 'end')
      .html(d => d.name);

    racing_svg.selectAll('text.valueLabel')
      .data(yearSlice, d => d.name)
      .enter()
      .append('text')
      .attr('class', 'valueLabel')
      .attr('x', d => x(d.value) + 5)
      .attr('y', d => y(d.rank) + 5 + ((y(1) - y(0)) / 2) + 1)
      .text(d => d3.format(',.0f')(d.lastValue));

    let yearText = racing_svg.append('text')
      .attr('class', 'yearText')
      .attr('x', width - margin.right)
      .attr('y', height - 25)
      .style('text-anchor', 'end')
      .html(~~year)
      .call(halo, 10);

    let ticker = d3.interval(e => {

      yearSlice = data.filter(d => d.year == year && !isNaN(d.value))
        .sort((a, b) => b.value - a.value)
        .slice(0, top_n);

      yearSlice.forEach((d, i) => d.rank = i);

      //console.log('IntervalYear: ', yearSlice);

      x.domain([0, d3.max(yearSlice, d => d.value)]);

      racing_svg.select('.xAxis')
        .transition()
        .duration(tickDuration)
        .ease(d3.easeLinear)
        .call(xAxis);

      let bars = racing_svg.selectAll('.bar').data(yearSlice, d => d.name);

      bars
        .enter()
        .append('rect')
        .attr('class', d => `bar ${d.name.replace(/\s/g, '_')}`)
        .attr('x', x(0) + 1)
        .attr('width', d => x(d.value) - x(0) - 1)
        .attr('y', d => y(top_n + 1) + 5)
        .attr('height', y(1) - y(0) - barPadding)
        .style('fill', d => d.colour)
        .transition()
        .duration(tickDuration)
        .ease(d3.easeLinear)
        .attr('y', d => y(d.rank) + 5);

      bars
        .transition()
        .duration(tickDuration)
        .ease(d3.easeLinear)
        .attr('width', d => x(d.value) - x(0) - 1)
        .attr('y', d => y(d.rank) + 5);

      bars
        .exit()
        .transition()
        .duration(tickDuration)
        .ease(d3.easeLinear)
        .attr('width', d => x(d.value) - x(0) - 1)
        .attr('y', d => y(top_n + 1) + 5)
        .remove();

      let labels = racing_svg.selectAll('.label')
        .data(yearSlice, d => d.name);

      labels
        .enter()
        .append('text')
        .attr('class', 'label')
        .attr('x', d => x(d.value) - 8)
        .attr('y', d => y(top_n + 1) + 5 + ((y(1) - y(0)) / 2))
        .style('text-anchor', 'end')
        .html(d => d.name)
        .transition()
        .duration(tickDuration)
        .ease(d3.easeLinear)
        .attr('y', d => y(d.rank) + 5 + ((y(1) - y(0)) / 2) + 1);


      labels
        .transition()
        .duration(tickDuration)
        .ease(d3.easeLinear)
        .attr('x', d => x(d.value) - 8)
        .attr('y', d => y(d.rank) + 5 + ((y(1) - y(0)) / 2) + 1);

      labels
        .exit()
        .transition()
        .duration(tickDuration)
        .ease(d3.easeLinear)
        .attr('x', d => x(d.value) - 8)
        .attr('y', d => y(top_n + 1) + 5)
        .remove();



      let valueLabels = racing_svg.selectAll('.valueLabel').data(yearSlice, d => d.name);

      valueLabels
        .enter()
        .append('text')
        .attr('class', 'valueLabel')
        .attr('x', d => x(d.value) + 5)
        .attr('y', d => y(top_n + 1) + 5)
        .text(d => d3.format(',.0f')(d.lastValue))
        .transition()
        .duration(tickDuration)
        .ease(d3.easeLinear)
        .attr('y', d => y(d.rank) + 5 + ((y(1) - y(0)) / 2) + 1);

      valueLabels
        .transition()
        .duration(tickDuration)
        .ease(d3.easeLinear)
        .attr('x', d => x(d.value) + 5)
        .attr('y', d => y(d.rank) + 5 + ((y(1) - y(0)) / 2) + 1)
        .tween("text", function (d) {
          let i = d3.interpolateRound(d.lastValue, d.value);
          return function (t) {
            this.textContent = d3.format(',')(i(t));
          };
        });


      valueLabels
        .exit()
        .transition()
        .duration(tickDuration)
        .ease(d3.easeLinear)
        .attr('x', d => x(d.value) + 5)
        .attr('y', d => y(top_n + 1) + 5)
        .remove();

      yearText.html(~~year);

      // if (year == 2018) ticker.stop();
      if (year == 2018) {
        ticker.stop()
        setTimeout(plot_racing, 2000);
      }
      year = d3.format('')((+year) + 1);
    }, tickDuration);

  });

  const halo = function (text, strokeWidth) {
    text.select(function () { return this.parentNode.insertBefore(this.cloneNode(true), this); })
      .style('fill', '#ffffff')
      .style('stroke', '#ffffff')
      .style('stroke-width', strokeWidth)
      .style('stroke-linejoin', 'round')
      .style('opacity', 1);

  }
}

plot_racing()
$(window).resize(function () {
  plot_racing();
});