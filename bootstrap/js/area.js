
function plot_area(countries) {
    d3.json("./assets/data/all.json",function (data) {
    //     dataset = data;
    //   var x0 = d3.filter(dataset,d => {
    //     return (d.country == countries)&&(d.category=='Commercial')});
    var x0,x1,x2,x3;
    var dataset =data;
    for(i in dataset)
    {
        if(dataset[i].country == countries)
        {
            if(dataset[i].category == 'Industry')
            {
                x0 = dataset[i];
            }
            if(dataset[i].category == 'Household')
            {
                x1 = dataset[i];
            }
            if(dataset[i].category == 'Transportation')
            {
                x2 = dataset[i];
            }
            if(dataset[i].category == 'Commercial')
            {
                x3 = dataset[i];
            }
        }
    }
    console.log(x0);
      Highcharts.chart("container2", {
        chart: {
          type: "area",
          options3d: {
            enabled: true,
            alpha: 30,
            beta: 35,
            depth: 300,
            viewDistance:30
          },
          backgroundColor: 'transparent',
        },
        title: {
          text: "Final energy consumption by sector",
        },
        accessibility: {
          description:
            "The chart is showing the Final energy consumption of selected country by sector",
          keyboardNavigation: {
            seriesNavigation: {
              mode: "serialize",
            },
          },
        },
        lang: {
          accessibility: {
            axis: {
              xAxisDescriptionPlural:
                "The chart has 3 unlabelled X axes, one for each series.",
            },
          },
        },
        yAxis: {
          title: {
            text: "Unit:Thousands of Tonnes Oil Equivalent",
            x: -40,
            offset:90,
            style: {
              fontSize: 15
           }
          },
          labels: {
            format: "{value:,.0f}",
            style: {
              fontSize: 15
           }
          },
          gridLineDashStyle: "Dash",
        },
        xAxis: [
          {
            visible: false,
          },
          {
            visible: false,
          },
          {
            visible: false,
          },
          {
            visible: false,
          },
        ],
        plotOptions: {
          area: {
            depth: 100,
            marker: {
              enabled: false,
            },
            states: {
              inactive: {
                enabled: false,
              },
            },
          },
        },
        tooltip: {
          valueSuffix: " TTOE",
        },
        series: [
          {
            name: x0.category,
            lineColor: "rgb(219, 160, 7)",
            color: "rgb(255,218,122,0.9)",
            fillColor: "rgb(255,190,122,0.9)",
            data: [
              ['2009', x0.data[0][0]],
              ['2010', x0.data[1][0]],
              ['2011', x0.data[2][0]],
              ['2012', x0.data[3][0]],
              ['2013', x0.data[4][0]],
              ['2014', x0.data[5][0]],
              ['2015', x0.data[6][0]],
              ['2016', x0.data[7][0]],
              ['2017', x0.data[8][0]],
              ['2018', x0.data[9][0]],
              ['2019', x0.data[10][0]],
              ['2020', x0.data[11][0]],
            ]
          },
          {
            xAxis: 1,
            lineColor: "rgb(116, 96, 209)",
            color: "rgb(190,184,220,0.9)",
            fillColor: "rgb(190,184,220,0.9)",
            name: x1.category,
            // data:x1.data,
            data:[
              ['2009', x1.data[0][0]],
              ['2010', x1.data[1][0]],
              ['2011', x1.data[2][0]],
              ['2012', x1.data[3][0]],
              ['2013', x1.data[4][0]],
              ['2014', x1.data[5][0]],
              ['2015', x1.data[6][0]],
              ['2016', x1.data[7][0]],
              ['2017', x1.data[8][0]],
              ['2018', x1.data[9][0]],
              ['2019', x1.data[10][0]],
              ['2020', x1.data[11][0]],
            ]
          },
          {
            xAxis: 2,
            lineColor: "rgb(33, 126, 194)",
            color: "rgb(130,176,210,0.9)",
            fillColor: "rgb(130,176,210,0.9)",
            name: x2.category,
            // data: x2.data,
            data:[
              ['2009', x2.data[0][0]],
              ['2010', x2.data[1][0]],
              ['2011', x2.data[2][0]],
              ['2012', x2.data[3][0]],
              ['2013', x2.data[4][0]],
              ['2014', x2.data[5][0]],
              ['2015', x2.data[6][0]],
              ['2016', x2.data[7][0]],
              ['2017', x2.data[8][0]],
              ['2018', x2.data[9][0]],
              ['2019', x2.data[10][0]],
              ['2020', x2.data[11][0]],
            ]
          },
          {
            xAxis: 3,
            lineColor: "rgb(100,100,100)",
            color: "rgb(152,153,153,0.9)",
            fillColor: "rgb(152,153,153,0.9)",
            name: x3.category,
            // data: x3.data,
            data:[
              ['2009', x3.data[0][0]],
              ['2010', x3.data[1][0]],
              ['2011', x3.data[2][0]],
              ['2012', x3.data[3][0]],
              ['2013', x3.data[4][0]],
              ['2014', x3.data[5][0]],
              ['2015', x3.data[6][0]],
              ['2016', x3.data[7][0]],
              ['2017', x3.data[8][0]],
              ['2018', x3.data[9][0]],
              ['2019', x3.data[10][0]],
              ['2020', x3.data[11][0]],
            ]
          },
        ],
      });
    });
  }
  plot_area('France');
  function replot1(){
    
    let countries = $("#country-selector-previous").val()
    plot_area(countries);
}
$("#country-selector-previous").on("change", function(){
  replot1();
})
  