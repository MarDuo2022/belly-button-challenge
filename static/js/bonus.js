// ## Advanced Challenge Assignment (Optional with no extra points earning)
// The following task is advanced and therefore optional.

// Adapt the Gauge Chart from https://plot.ly/javascript/gauge-charts/ Links to an external site.to plot the weekly washing frequency of the individual.

// You will need to modify the example gauge code to account for values ranging from 0 through 9.

// Update the chart whenever a new sample is selected.

function MakeGauge(sampleID) {
    console.log('About to make Gauge chart');

    d3.json(url).then((data) => {
        
        // get all of the metadata
        let metaData = data.metadata;

        // filter based on the sampleID chosen
        let resultArray = metaData.filter(sampleResult => sampleResult.id == sampleID);

        // pick index 0 from the array
        let result = resultArray[0];

        // use Object.entries to get the key/value pairs and put into the demographics box on the page
        let wfreq = Object.values(result)[6];

        // Components for gauge chart
        let gaugeChart = {
            domain: {x: [0,1], y: [0,1]},
            value: wfreq,
            title: {
                text: "<b>Belly Button Washing Frequency</b><br>Scrubs per Week",
                font: {color: "black", size: 16}
            },      
            type: "indicator",
            mode: "gauge+number",            
            gauge: {
                axis: {range: [0, 9], tickmode: "array", tick0: 2, dtick: 2},
                bar: {color: "steelblue"},
                steps: [
                    {range: [0, 1], color: "white"},
                    {range: [1, 2], color: "whitesmoke"},
                    {range: [2, 3], color: "white"},
                    {range: [3, 4], color: "whitesmoke"},
                    {range: [4, 5], color: "white"},
                    {range: [5, 6], color: "whitesmoke"},
                    {range: [6, 7], color: "white"},
                    {range: [7, 8], color: "whitesmoke"},
                    {range: [8, 9], color: "white"},
                ]
            }
        };

        // Layout for gauge chart
        let layout = {
            width: 450,
            height: 300, 
            margin: {t: 0, b:0}
        };

        // Use Plotly to plot the gauge chart on the page
        Plotly.newPlot("gauge", [gaugeChart], layout);
    });
};
