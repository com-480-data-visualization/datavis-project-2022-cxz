function plot_sankey(year, countries, w, width, height){
    // load the data
    d3.csv("./assets/data/import_export.csv").then(function(data) {
        let cleaned_data = d3.filter(data, d => {
                return (+d.year === year) && (countries.includes(d.source) || countries.includes(d.target))
            })
            .map(d => {
                return {
                    "from": d.source,
                    "to": d.target,
                    "weight": Math.round((+d.value)),
                }
            })
        Highcharts.chart('container', {

            chart: {
                "height": Math.max(height, 800),
                "width": width,
                // backgroundColor: '#282828'
                backgroundColor: 'transparent',
            },

            title: {
              text: 'Sankey Diagram for Enegry Imports and Exports in ' + year + ' for the selected countries',
              style: {
                  color: "#000000",
                  "font-family": "Kalam"
              }
            },
            tooltip: {
              style: {
                "font-family": "Kalam"
              }
            },
            plotOptions:{
              sankey:{
                dataLabels: {
                  style: {
                    "font-family": "Kalam"
                  }
                }
              },
            },
            accessibility: {
              point: {
                valueDescriptionFormat: '{index}. {point.from} to {point.to}, {point.weight}'
              }
            },
            series: [{
              keys: ['from', 'to', 'weight'],
              data: cleaned_data,
              type: 'sankey',
              lineWidth: w,
              minLinkWidth: 0.5,
              name: 'Sankey Diagram for Enegry Imports and Exports in ' + year,
            }],
          
          });
    })
}

let all_countries = [
    'Albania', 
    'Austria', 
    'Belgium', 
    'Bosnia and Herzegovina', 
    'Bulgaria', 
    'Croatia', 
    'Cyprus', 
    'Czechia', 
    'Denmark',
    'Estonia', 
    'Euro area - 19 countries  (from 2015)', 
    'European Union - 27 countries (from 2020)', 
    'European Union - 28 countries (2013-2020)', 
    'Finland', 
    'France', 
    'Georgia', 
    'Germany (until 1990 former territory of the FRG)', 
    'Greece', 
    'Hungary', 
    'Iceland', 
    'Ireland', 
    'Italy', 
    'Kosovo (under United Nations Security Council Resolution 1244/99)', 
    'Latvia', 
    'Liechtenstein', 
    'Lithuania', 
    'Luxembourg', 
    'Malta', 
    'Moldova', 
    'Montenegro', 
    'Netherlands', 
    'North Macedonia', 
    'Norway', 
    'Poland', 
    'Portugal', 
    'Romania', 
    'Serbia', 
    'Slovakia', 
    'Slovenia', 
    'Spain', 
    'Sweden', 
    'Turkey', 
    'Ukraine', 
    'United Kingdom', 
]

let all_years = [
  2011,
  2012,
  2013,
  2014,
  2015,
  2016,
  2017,
  2018,
  2019,
  2020
]

let initial = true;

plot_sankey(2011, all_countries, 4, 0.8*$(window).width(), 0.6*$(window).width())

function replot(){
  let year = +$("#year-selector").val()
  let countries = $("#country-selector").val()
  if (year != null && year >= Math.min(...all_years) && year <= Math.max(...all_years) && countries.length != 0){
    console.log("plotting for", countries, "year", year)
    let w = 0.8*$(window).width();
    let h = 0.6*$(window).width();
    console.log("plot")
    initial=false;
    plot_sankey(year, countries, 4, w, h)
    return
  }
  if(initial && year == 0 && countries.length == 0){
    plot_sankey(2011, all_countries, 4, 0.8*$(window).width(), 0.6*$(window).width());
    return
  }
}

$("#country-selector").on("change", function(){
  replot();
})
$("#year-selector").on("change", function(){
  replot();
})
$( window ).resize(function() {
  replot();
});