// Place url in a constant variable
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

// Fetch the JSON data and console log it
d3.json(url).then(function(data) {
    let dropdownMenu = d3.select("#selDataset");
    let names = data.names;
    //console.log(names);

    // Add  samples to dropdown menu
    for (let i = 0; i < names.length; i++) {
        //console.log(names[i]);
        dropdownMenu.append("option")
            .text(names[i])
            .property("value", names[i]);
    }
    let id_number = names[0];
    //console.log(id_number);
    barChart(id_number);
});



function barChart(id_number){
        // Retrieve all sample data
        d3.json(url).then(function(data){
            // console.log(id_number);
            // console.log(data);
            // Filter based on the id_number
            function selectID(samples) {
                return samples.id === id_number;
            }
            let sample = data.samples.filter(selectID);
            
            //since sample is an array, we need to go into it
            let values = sample[0];

            // Get the otu_ids, lables, and sample values
            let otu_ids = values.otu_ids;
            let otu_labels = values.otu_labels;
            let sample_values = values.sample_values;

            // Set top ten items to display in descending order
            let xticks = sample_values.slice(0,10).reverse();
            let yticks = otu_ids.slice(0,10).map(id => `OTU ${id}`).reverse();
            let labels = otu_labels.slice(0,10);
            
            // Set up the trace for the bar chart
            let trace = {
                x: xticks,
                y: yticks,
                text: labels,
                type: "bar",
                orientation: "h"
            };

            // Setup the layout
            let layout = {
                title: "Top 10 OTUs Present"
            };

            // Call Plotly to plot the bar chart
            Plotly.newPlot("bar", [trace], layout)
        });
};

function optionChanged(value) { 
    //console.log(value);
    // Call all functions to refresh data
    barChart(value);
}