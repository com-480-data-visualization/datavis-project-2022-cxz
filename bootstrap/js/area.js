
function plot_area(countries) {
    d3.json("./assets/data/all.json").then(function (data) {
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
      Highcharts.chart("container2", {
        chart: {
          type: "area",
          options3d: {
            enabled: true,
            alpha: 15,
            beta: 30,
            depth: 200,
          },
        },
        title: {
          text: x0.Country,
        },
        accessibility: {
          description:
            "The chart is showing the shapes of three mountain ranges as three area line series laid out in 3D behind each other.",
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
            text: "Final energy consumption by sector",
            x: -40,
          },
          labels: {
            format: "{value:,.0f} MAMSL",
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
          valueSuffix: " MAMSL",
        },
        series: [
          {
            name: x0.category,
            lineColor: "rgb(180,90,50)",
            color: "rgb(200,110,50)",
            fillColor: "rgb(200,110,50,0.9)",
            data: x0.data,
          },
          {
            xAxis: 1,
            lineColor: "rgb(120,160,180)",
            color: "rgb(140,180,200)",
            fillColor: "rgb(140,180,200,0.9)",
            name: x1.category,
            data:x1.data,
          },
          {
            xAxis: 2,
            lineColor: "rgb(200, 190, 140)",
            color: "rgb(200, 190, 140)",
            fillColor: "rgb(230, 220, 180,0.9)",
            name: x2.category,
            data: x2.data,
          },
          {
            xAxis: 3,
            lineColor: "rgb(100,100,100)",
            color: "rgb(100,100,100)",
            fillColor: "rgb(100,100,100,)",
            name: x3.category,
            data: x3.data,
          },
        ],
      });
    });
  }
  plot_area('France');
  function replot(){
    
    let countries = $("#country-selector1").val()
    plot_area(countries);
}
$(".selectpicker").on("change", function(){
  replot();
})
  