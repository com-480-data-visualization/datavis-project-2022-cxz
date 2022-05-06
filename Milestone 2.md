# Milestone 2
## Introduction

Energy statistics are in the spotlight due to their strategic importance to the drive towards competitive and sustainable economic growth. The goal of our project is to use the existing data with data analysis and statistics to provides a interactive multimodal view of data and help people understand the statistical trends hidden behind the data more visually and vividly.

## Visualizations
### Overview

Our websites will present european energy statistics by three topics: 
- Energy statistics
- Environmental frinedly energy 
- Energy security  

The home page of the website is displayed as shown below.

![Imgur](https://i.imgur.com/TeupFqL.png)

Each topics have a independent subpage and contains multiple interactive data visualization graphs. The details of each topics will explain below.

### European energy statistics

This part contains two graph.
- European national energy statistics
- Final energy consumption by sector

The european national energy statistics graph prototype  is shown like below.

![Imgur](https://i.imgur.com/g1y9TxR.png)

The graph displays an interactive map of Europe, and when the user mouses over one of the countries, a session box on the side displays energy data about that country.

The second graph will be a combination of a series of statistical graphs about energy final consumption by sector, the final result is as follows example.

![Imgur](https://i.imgur.com/8mvhybE.png)

![Imgur](https://i.imgur.com/o30PS4h.gif)

The Final energy consumption covers all energy supplied to the final consumer for all energy uses. It is  disaggregated into the final end-use sectors: Industrial,Transport,Commercial,Household.

### Environmentally friendly Energy
We define a new metric called green energy rank. The definition of rank is
$rank$ = $($Total green energy consumption$)/($Total Final energy consumption$)$

![Imgur](https://i.imgur.com/Uz3Ffcp.png)

![](https://i.imgur.com/X5GbgQl.gif)

We calculate for each EU country the annual green energy rank. And use Bar Chart Race graph to trace the top 10 countries in rank over time.The graph can effectively show the change in the adoption of clean energy in the EU countries over several years.

The second graph is a boxplot to graphically demonstrating the locality, spread and skewness groups of the overall green energy consumption of EU by year. The x-axis of the graph are the year and y-axis are the clean energy consumption of each European country in that year. If we select a certain country on the right side, the graph will add lines in the boxplots to indicate its position in each year.

![Imgur](https://i.imgur.com/MoH1O4Z.png)

### Energy Security

In this graph we try to show the energy import and export status for each European countries. We plan to draw a Sankey Diagram for these relations, with import energy types in the left, countries in the middle and export energy types in the right. When moving the mouse to a country, the related import and export relations will be hightlighted.

![Imgur](https://i.imgur.com/Em9ukYe.png)

## Tools

For the map displays, we will to use D3.js and Leafletjs. We also need to use the Maps, Practical Maps, D3.js and More interactive D3.js lectures. We also use the Mapbox library. We will also use GSAP library to Write interactive animations for web pages.

## Extra Ideas

- Smoother animations.
- Add comparation function to the european national energy statistics graph, so that the user could compare mulitiple countries statistics on the right panel.
- Add zooming function for the boxplot so that users can select which range of statistics to view.
- Make our existing plots more interactive and intuitive.