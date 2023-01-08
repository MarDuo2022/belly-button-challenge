// 1. Use the D3 library to read in samples.json from the URL

const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Promise Pending
const dataPromise = d3.json(url);
console.log("Data Promise: ", dataPromise);

// Fetch the JSON data and console log it

// fetch JSON data has to be done together with plot 
// Graph BAR
d3.json(url).then(function(data) {
    console.log(data)

    let samples = data.samples;
    let samplesPropertiesArray = samples.filter(sample => sample.id == 940);
    let samplesProperties = samplesPropertiesArray[0];

    let otu_ids = samplesProperties.otu_ids;
    let otu_labels = samplesProperties.otu_labels;
    let sample_values = samplesProperties.sample_values;

    let yvalues = otu_ids.slice(0,10).map(otuId => `OTU ${otuId}`).reverse();

    // Collate data for bar
    let barData = {
        x: sample_values.slice(0,10).reverse(),
        y: yvalues,
        type: 'bar',
        text: otu_labels.slice(0,10).reverse(),
        orientation: 'h'
    };

    let barArray = [barData];

    let barLayout = {
        title: "Top 10 OTUs",
        margin: {t: 40, l: 100}
    };

    Plotly.newPlot('bar', barArray, barLayout)
});

// Graph Bubble chart
console.log(`Generate bubble chart for 940`);

d3.json(url).then(data => {
    let samples = data.samples;
    let resultArray = samples.filter(sample => sample.id == 940);
    let result = resultArray[0];

    let otu_ids = result.otu_ids;
    let otu_labels = result.otu_labels;
    let sample_values = result.sample_values;

    // Compile bubble data trace for chart
    let bubbleData = {
        x: otu_ids,
        y: sample_values,
        text: otu_labels,
        mode: 'markers',
        marker: {
            size: sample_values,
            color: otu_ids,
            colorscale: 'Rainbow'
        }
    }

    // Put the trace into an array
    let bubbleArray = [bubbleData];

    // Create a layout object
    let bubbleLayout = {
        title: 'Bacteria Cultures Per Sample',
        margin: {t: 100},
        xaxis: {title: "OTU ID"},
    };

    // Call Plotly funtion
    Plotly.newPlot('bubble', bubbleArray, bubbleLayout);
});