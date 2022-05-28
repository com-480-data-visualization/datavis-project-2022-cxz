function plot_sankey(year, countries, w){
    // load the data
    console.log(countries)
    d3.csv("./data/import_export.csv").then(function(data) {
        let cleaned_data = d3.filter(data, d => {
                // console.log(d.source, d.target, countries.includes(d.source), countries.includes(d.target));
                return (d.year === year) && (countries.includes(d.source) || countries.includes(d.target))
            })
            .map(d => {
                return {
                    "from": d.source,
                    "to": d.target,
                    "weight": Math.round((+d.value)),
                }
            })
        console.log(cleaned_data)
        Highcharts.chart('container', {

            chart: {
                height: 1000,
                width: 1200,
                backgroundColor: '#282828'
            },

            title: {
              text: 'Sankey Diagram for Enegry Imports and Exports in ' + year,
              style: {
                  color: "#ffffff"
              }
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

plot_sankey("2012", all_countries, 4)