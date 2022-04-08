# Milestone 1
## Dataset
Energy statistics are in the spotlight due to their strategic importance to the drive towards competitive and sustainable economic growth. To meet approach producers' developing requirements for information on energy, [EuroStat](https://ec.europa.eu/eurostat/web/main/home) has fostered a cognizant and orchestrated arrangement of energy insights. Eurostat statistics for European member states from 1990 onwards, and provides an easy visualization view of the data. The existing data visualization view is only for a certain type of data simple visualization of one single table, interactivity is relatively poor and limited. The goal of our project is to use the existing data with data analysis and statistics to provides a interactive multimodal view of data and help people understand the statistical trends hidden behind the data more visually and vividly.

 The Dataset [European energy dataset](https://ec.europa.eu/eurostat/web/energy/data) from [EuroStat](https://ec.europa.eu/eurostat/web/main/home) contains 120 .tsv files. We mainly use information from the following perspectives：
- Primary energy consumption
- Final energy consumption
- Final energy consumption in households percapita
- Shares of renewable energy in gross final energy consumption by sector
- Greenhouse gas emissions intensity of energy consumption
- Energy Imports and Exports by energy type
- Energy prices

The data is well structured and clean but separated into multiple files. We have written scripts to fetch data by website directory. Our pre-processing is primarily concerned with the connecting of various tables. The main work of data-cleaning is concentrated on the treatment of missing values.
 

## Problematic

Energy has always been a crucial part in our day to day life. In fact, it is so ingrained in our lives that we seldomly take time to reflect upon it. Through this data visualization project, we want to help people better understand the way energy is used in Europe, and gain insight into important questions like:
- how energy use is distributed among different sectors of a country?
- how quickly are renewable energy replacing traditional energy? What countries are the ahead of others in this process?
- is there a overall trend regarding the final energy consumption of European countries?

Our final website will consist of 3 major sections.
In the overview section, we want to show the most important energy related statistics of European countries, as well as the overall trend of them as a whole. The sustainability section shows different countries' progress of reaching a cleaner energy structure. In the energy safety section, we want to explore how dependent certain countries are in energy import and export.

## Exploratory Data Analysis

![Imgur](https://i.imgur.com/4dsXotk.png?3)

**Final energy consumption**

We briefly analyse the final energy consumption for 40 countries from 2009 to 2020, and then use [flourish](https://flourish.studio) to get an initial visualization of top 10 of them on the animation below:

![](https://i.imgur.com/X5GbgQl.gif)

We can find several information in this visualization. For instance, German's final energy consumption is the largest among 40 countries and also much higher than the second country, i.e. France. And we also notice a rapid increase of final energy consumption in Turkey.

The visualization above considers simply the aggregate of all sectors. Consequently, we will show the final energy consumption of several sectors to garner additional insight regarding our data.

**Energy consumption by sector**

![Imgur](https://i.imgur.com/VLbTJXd.png?3)

![Imgur](https://i.imgur.com/UnLVyiU.png?2)

Eurostat data provides information on energy consumption by type in EU member states, which assists us in meeting energy-related targets. When we visualize the statistics for the EU as a whole and for different member states, we notice that the industrial sector and households consume the majority of energy, whereas total energy consumption varies substantially between countries.

**Renewable energy**

![](https://i.imgur.com/FPcjTUW.png)

Renewable energy is considered as a crucial resource for sustainable development. We visualize the percentage of renewable energy in different countries in 2006 above. The graph gives an overall percentage of renewable energy, and also shows the percentage in electricity, heating/cooling and transport. 

It can be seen that overall Iceland (code: IC) and Norway (code: NO) replace approximately 60% of their energy sources with renewable ones, while nearly all energy in Malta (code:MT) is non-renewable. 

Comparing different fields of energy consumption, we notice a significant low percentage in transport for all countries. More efforts should be made to improve the usage of renewable energy in transport.

In our project, we will explore more intuitive and interactive ways to show these data and also combine them with our other visualizations.

**Energy Safety**

European countries has always been considerably dependent on imported energy. We plotted all European countries' Net Imported Energy against their Total Energy Supply in the year 2020. The former is the result of Imported Energy minus Exported Energy, while the latter represents the quantity of energy necessary to satisfy inland consumption. By comparing these statistics, we can see how reliant on import a country is.

![](https://i.imgur.com/k0yBATz.png)

The red line is a referene where Net Import exactly equals to Total Energy Supply. A lot of markers are very close to the red line. That means many countries' energy supply mainly comes from importing. An exception to this pattern is Norway, whose net import is negative.

## Related work
**What others have already done with the data?**

The data provider, namely [EuroStat](https://ec.europa.eu/eurostat/web/main/home), has already prepared some visualization tools such as [Energy Flow Diagram](https://ec.europa.eu/eurostat/cache/sankey/energy/sankey.html?geos=EU27_2020&year=2020&unit=KTOE&fuels=TOTAL&highlight=_&nodeDisagg=0101000000000&flowDisagg=false&translateX=0&translateY=0&scale=1&language=EN)and [Energy Balance Visualization Tools](https://ec.europa.eu/eurostat/cache/infographs/energy_balances/enbal.html?geo=EU27_2020&unit=KTOE&language=EN&year=2020&fuel=fuelMainFuel&siec=TOTAL&details=0&chartOptions=0&stacking=normal&chartBal=&chart=&full=0&chartBalText=&order=DESC&siecs=&dataset=nrg_bal_s&decimals=0&agregates=0&fuelList=fuelElectricity,fuelCombustible,fuelNonCombustible,fuelOtherPetroleum,fuelMainPetroleum,fuelOil,fuelOtherFossil,fuelFossil,fuelCoal,fuelMainFuel). The former visualize the flow of energy for the selected countries, while the latter provides several plots (e.g. line chart, bar chart and pie chart) for a given statistics.

**Why is your approach original?**

We think that existing visualizations from [EuroStat](https://ec.europa.eu/eurostat/web/main/home) only consider a single feature for each plot. Besides, they lack the interactive features, which hinder normal users from reading them and gleaning insights from them.

Our visualizations not only correlate some of the features from the dataset, but also provide more interactions so that people can find relevant information with ease.

**What source of inspiration do you take?**

Our initial inspiration comes from the shortage of energy in Europe during the conflict between Russia and Ukraine. We are also aware of the carbon neutrality goal for our planet. Therfore, we think that it is of great importance to understand the energy-related statistics, including the current usage of renewable energy, energy consumption, energy security, etc.

