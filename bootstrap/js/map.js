function darken(color, k = 1) {
	const {l, c, h} = d3.lch(color);
	return d3.lch(l - 18 * k, c, h);
  }

function plot_map() {
	let consumption_all = d3.csv("assets/data/Final_energy_consumption_all_abbreviation.csv")
	let consumption_i = d3.csv("assets/data/Final_energy_consumption_industry_abbreviation.csv")
	let consumption_h = d3.csv("assets/data/Final_energy_consumption_household_abbreviation.csv")
	let consumption_c = d3.csv("assets/data/Final_energy_consumption_commercial_abbreviation.csv")
	let consumption_t = d3.csv("assets/data/Final_energy_consumption_transport_abbreviation.csv")
	let renewable = d3.csv("assets/data/renewable_energy_all_abbreviation.csv")
	let map = d3.json("assets/data/europe.geojson")




	Promise.all([consumption_all,
				consumption_i,
				consumption_h,
				consumption_c,
				consumption_t,
				renewable,
				map])
			.then(function (values) {
		let c_a = values[0]
		let countrys = values[6]
		//process data
		const data = c_a.reduce(function (obj, entry) {
			const name = entry.Country
			if (name.includes('Euro')){
				return obj
			}
			delete entry.Country
			delete entry.abbreviation
			delete entry[""]
			const keys = Object.keys(entry)
			for (let i = 0; i < keys.length; i++) {
				const oldkey = keys[i]
				const newkey = oldkey.slice(0, -1)
				const newvalue = entry[oldkey] == ": " ? null : parseInt(entry[oldkey])
				entry[newkey] = {consumptionAll:newvalue}
				delete entry[oldkey]
			}
			obj[name] = entry
			return obj
		}, {});
		//data = {country: year: type: value}
		const types = ['consumptionAll','consumptionIndustry',
						'consumptionHousehold','consumptionCommercial','consumptionTransport','renewable']
		for(var i=1; i<6; i++){
			const v = values[i]
			const type = types[i]
			for (const entry of v) {
				const name = entry.Country
				if (!data.hasOwnProperty(name)){
					continue
				}
				const d_entry = data[name]
				for (const key of Object.keys(entry)){ //key here is just a year
					k = key.slice(0,-1)
					if (d_entry.hasOwnProperty(k)){
						d_entry[k][type] = entry[key] == ": " ? null : parseInt(entry[key])
					}
				}
			}
		}

		//console.log(energy)
		// console.log(countrys)
		console.log(data)
		let width = Math.max(Math.min(0.7 * $(window).width(), 800), 400)
		let height = Math.max(Math.min(0.7 * $(window).width(), 800), 400)
		let margin = Math.max(Math.min(0.0625 * $(window).width(), 50), 25)

		let fig = document.getElementsByClassName("map")[0];
		if (fig) {
			fig.innerHTML = '';
		}

		var slider = document.getElementById("myRange");
		var output = document.getElementById("sign");
		output.innerHTML = "Year selected: " + slider.value; // Display the default slider value
		// Update the current slider value (each time you drag the slider handle)
		slider.oninput = function() {
			output.innerHTML = "Year selected: " + this.value;
			update_color()
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
			if (data.hasOwnProperty(name)) {
				const d = data[name][slider.value]
				var str = name +" in year "+slider.value + "<br>"
				str += "Final energy consumption: " + d.consumptionAll+" TTOE<br>"
				if (d.hasOwnProperty('consumptionIndustry')){
					str += "Final energy consumption in Industry: " + d.consumptionIndustry + " TTOE<br>"
				}
				if (d.hasOwnProperty('consumptionHousehold')){
					str += "Final energy consumption in household: " + d.consumptionHousehold + " TTOE<br>"
				}
				if (d.hasOwnProperty('consumptionCommercial')){
					str += "Final energy consumption in Commercial: " + d.consumptionCommercial + " TTOE<br>"
				}
				if (d.hasOwnProperty('consumptionTransport')){
					str += "Final energy consumption in Transport: " + d.consumptionTransport + " TTOE<br>"
				}
				if (d.hasOwnProperty('renewable')){
					str += "Renewable energy portion: " + d.renewable + "%"
				}
				return str
			} else {
				return null
			}
		}
		function get_value(name){
			if (data.hasOwnProperty(name)) {
				return data[name][slider.value].consumptionAll
			} else {
				return null
			}
		}

		projection = d3.geoMercator().fitExtent([[margin, margin], [width - margin, height - margin]], countrys)
		pathGenerator = d3.geoPath().projection(projection)
		var c = d3.scaleSequential().domain([0,250000])
		.interpolator(d3.interpolateYlOrRd);


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


		function update_color() {
			svg.selectAll('path')
				.data(countrys.features)
				.each(function(d,i){
					const v = get_value(d.properties.NAME)
					const t = get_text(d.properties.NAME)
					if (v==null){
						d3.select(this)
							.attr('fill','grey')
							.on('mouseover', null)
							.on('mousemove', null)
							.on('mouseout', null)
					} else {
						const c1 = c(v)
						const c2 = darken(c1)
						d3.select(this)
							.attr('fill',c1)
							.on('mouseover', function () {
								d3.select(this)
									.attr('fill', c2)
								div.style('display', 'block')
									.html(t);
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
									.attr('fill', c1)
							});

					}
					
				})
				.attr('fill', d => {
					const v = get_value(d.properties.NAME)
					return v==null? 'grey' : c(v) 
				})
				
		}
		update_color()


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



