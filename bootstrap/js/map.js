
function plot_map() {
	let energy = d3.csv("assets/data/Final_energy_consumption_all_abbreviation.csv")
	let map = d3.json("assets/data/europe.geojson")

	var slider = document.getElementById("myRange");
	var output = document.getElementById("sign");
	output.innerHTML = "Year selected: " + slider.value; // Display the default slider value
	// Update the current slider value (each time you drag the slider handle)
	slider.oninput = function() {
	output.innerHTML = "Year selected: " + this.value;
}

	Promise.all([energy, map]).then(function (values) {
		let energy = values[0]
		let countrys = values[1]
		//process data
		const consumption = energy.reduce(function (obj, entry) {
			const name = entry.Country
			delete entry.Country
			delete entry.abbreviation
			delete entry[""]
			const keys = Object.keys(entry)
			for (let i = 0; i < keys.length; i++) {
				const oldkey = keys[i]
				const newkey = oldkey.slice(0, -1)
				const newvalue = entry[oldkey] == ": " ? null : parseInt(entry[oldkey])
				entry[newkey] = newvalue
				delete entry[oldkey]
			}
			obj[name] = entry
			return obj
		}, {});

		//console.log(energy)
		// console.log(countrys)
		// console.log(consumption)
		let width = Math.max(Math.min(0.7 * $(window).width(), 800), 400)
		let height = Math.max(Math.min(0.7 * $(window).width(), 800), 400)
		let margin = Math.max(Math.min(0.0625 * $(window).width(), 50), 25)

		let fig = document.getElementsByClassName("map")[0];
		if (fig) {
			fig.innerHTML = '';
		}

		var svg = d3.select(".map")
			.append("svg")
			.attr("width", width)
			.attr("height", height)

		//the tag for showing countries
		let div = d3.select('.map').append("div")
			.style("opacity", 0.9)
			.style('background', 'white')
			.style('display', 'none')
			.style('pointer-events','none')
			.style("position", "absolute");

		function get_text(name) {
			if (consumption.hasOwnProperty(name)) {
				return name + ": final energy consumption in "+slider.value+" is " + consumption[name][slider.value]
			} else {
				return ""
			}

		}

		projection = d3.geoMercator().fitExtent([[margin, margin], [width - margin, height - margin]], countrys)
		pathGenerator = d3.geoPath().projection(projection)

		svg.selectAll('path')
			// data() expects an Array, so make sure to pass the features entry of our FeatureCollection
			.data(countrys.features)
			// select all data items that are not represented on the map yet, and add them
			.enter()
			.append('path')
			// assign attributes to those new elements
			.attr('d', pathGenerator)
			.attr('fill', 'grey')
			.attr('stroke', '#999999')
			.attr('stroke-width', '1')
			.on('mouseover', function (event, d) {
				d3.select(this)
					.attr('fill', 'white')
				div.style('display', 'block')
					.html(get_text(d.properties.NAME));
			})
			.on('mousemove', function (event) {
				const [x, y] = d3.pointer(event, svg).map(function (d) {
					return parseInt(d)
				})
				div.style('left', (x + 15) + 'px')
					.style('top', (y - 35) + 'px');
			})
			.on('mouseout', function () {
				div.style('display', 'none')
				d3.select(this)
					.attr('fill', 'grey')
			});


		svg.selectAll("g.countryLabels text")
			.data(countrys.features.filter(d => pathGenerator.area(d) > 2000))
			.join("text")
			.attr("transform", d => `translate(${pathGenerator.centroid(d)})`)
			.attr('pointer-events', "none")
			.attr("dx", "0em")
			.attr("dy", "0em")
			.attr("text-anchor", "middle")
			.style("font-size", "0.8rem")
			.style("font-family", "Kalam")
			.text(d => d.properties.NAME);
	})
}

plot_map()
$(window).resize(function () {
	plot_map();
});



