// 1. Use the D3 library to read in samples.json from the URL

const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// fetch JSON data has to be done together with plot 
// 2. Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.

function GraphBar(sampleID) {
    d3.json(url).then(function(data) {
    console.log(data)

    let samples = data.samples;
    let samplesPropertiesArray = samples.filter(sample => sample.id == sampleID);
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
};

// 3.Create a bubble chart that displays each sample.
function GraphBubble(sampleID) {
    console.log(`Generate bubble chart for ${sampleID}`);

    d3.json(url).then(data => {
        let samples = data.samples;
        let resultArray = samples.filter(sample => sample.id == sampleID);
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
            margin: {t: 50},
            xaxis: {title: "OTU ID"},
        };

        // Call Plotly funtion
        Plotly.newPlot('bubble', bubbleArray, bubbleLayout);
    });
};

// 4. Display the sample metadata, i.e., an individual's demographic information.
// 5. Display each key-value pair from the metadata JSON object somewhere on the page.

function DisplayMetadata(sampleID) {
    console.log(`Display sample metadata for ${sampleID}`);

    d3.json(url).then(data => {
        let metadata=data.metadata;
        console.log(metadata);

        let result = metadata.filter(meta => meta.id == sampleID)[0];
        let demog = d3.select('.panel-body');

        // clear drop down panel
        demog.html('');

        // add corresponding key and value
        Object.entries(result).forEach(([key,value]) => {
            demog.append('h6').text(`${key}: ${value}`);
        });
    });
};

// 6. Update all the plots when a new sample is selected. Additionally, you are welcome to create any layout that you would like for your dashboard.
function optionChanged(sampleID) {
    console.log(`ID has changed to: ${sampleID}`);

    GraphBar(sampleID);
    GraphBubble(sampleID);
    DisplayMetadata(sampleID);
}

function init() {
    console.log('Start page');

    // Use d3 library to select dropdown
    let selector = d3.select('#selDataset');

    d3.json(url).then(data => {
        console.log('Data: ');

        let sampleNames = data.names;
        console.log('Sample names:', sampleNames);

        // Populate the dropdown
        for (let i = 0; i < sampleNames.length; i++) {
            let sampleID = sampleNames[i];
            selector.append('option').text(sampleID).property('value', sampleID);
        };

        // Read the current value from the dropdown
        let startID = selector.property('value');
        console.log(`Starting ID = ${startID}`);

        // Draw the bargraph for the selected sample id
        GraphBar(startID);

        // Draw the bubblechart for the selected sample id
        GraphBubble(startID);

        // Show the metadata for the selected sample id
        DisplayMetadata(startID);

    });
};

init();
