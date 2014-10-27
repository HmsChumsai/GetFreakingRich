//var data = !{JSON.stringify(data)};
AmCharts.ready(function() {
    /**
     * Loads the external CSV file
     */
    AmCharts.loadCSV = function(file) {
        if (window.XMLHttpRequest) {
            // IE7+, Firefox, Chrome, Opera, Safari
            var request = new XMLHttpRequest();
        }
        else {
            // code for IE6, IE5
            var request = new ActiveXObject('Microsoft.XMLHTTP');
        }
        // load
        try {
            request.open('GET', file, false);
            request.send();
            if (200 != request.status)
                return [];
        }
        catch (e) {
            return [];
        }
        return AmCharts.parseCSV(request.responseText);
    }

    /**
     * Parses CSV file
     */
    AmCharts.parseCSV = function(data) {
        // init empty data array
        var chartData = []

        //replace UNIX new lines
        data = data.replace(/\r\n/g, "\n");
        //replace MAC new lines
        data = data.replace(/\r/g, "\n");
        //split into rows
        var rows = data.split("\n");

        // first line contains field names
        var fields = rows.shift().split(",");

        // loop through all rows
        var row;
        while (row = rows.pop()) {
            // our columns are separated by comma
            var column = row.split(",");

            // init data object
            var dataObject = {};

            // add data for all the fields
            for (var x in column) {
                dataObject[fields[x]] = column[x];
            }

            // add object to chartData array
            chartData.push(dataObject);
        }

        return chartData;
    }

    /**
     * Delay loading by a few moments so that the page has a chace to build itself
     */

    setTimeout(function() {

        /**
        * Define all data sets

        */
        var indices = ['MSFT', 'TXN'];
       //var indices = ['MSFT'];
        var dataSets = [];
        
        for (var idx in data) {
            //consol.log(JSON.stringify(data[idx].data));
            dataSets.push({
                title: data[idx].stockname,
                fieldMappings: [{
                    fromField: "open",
                    toField: "open"
                }, {
                    fromField: "high",
                    toField: "high"
                }, {
                    fromField: "low",
                    toField: "low"
                }, {
                    fromField: "close",
                    toField: "close"
                }, {
                    fromField: "volumn",
                    toField: "volumn"
                }],
                compared: idx != 0,
                //dataProvider: AmCharts.loadCSV('/wp-content/uploads/demos/stock/' + indices[x] + '.csv'),
                dataProvider: data[idx].data,
                categoryField: "date"
                //stockEvents: events
            });
        }
        
        
        /*
        for (var x in indices) {

        // add data set
        dataSets.push({
        title: indices[x],
        fieldMappings: [{
        fromField: "Open",
        toField: "open"
        }, {
        fromField: "High",
        toField: "high"
        }, {
        fromField: "Low",
        toField: "low"
        }, {
        fromField: "Close",
        toField: "close"
        }, {
        fromField: "Volume",
        toField: "volume"
        }],
        compared: x != 0,
        //dataProvider: AmCharts.loadCSV('/wp-content/uploads/demos/stock/' + indices[x] + '.csv'),
        dataProvider: AmCharts.loadCSV(indices[x] + '.csv'),
        categoryField: "Date",
        //stockEvents: events
        });
        }
        */
        
        /**
         * Build the chart
         */
        var chart = AmCharts.makeChart("chartdiv", {
            type: "stock",
            pathToImages: "http://www.amcharts.com/lib/3/images/",
            color: "#fff",
            dataSets: dataSets,
            dataDateFormat: "MM/DD/YYYY",

            panels: [{
                    title: "Value",
                    percentHeight: 70,

                    stockGraphs: [{
                        type: "candlestick",
                        id: "g1",
                        openField: "open",
                        closeField: "close",
                        highField: "high",
                        lowField: "low",
                        valueField: "close",
                        lineColor: "#fff",
                        fillColors: "#fff",
                        negativeLineColor: "#db4c3c",
                        negativeFillColors: "#db4c3c",
                        fillAlphas: 1,
                        comparedGraphLineThickness: 2,
                        columnWidth: 0.7,
                        useDataSetColors: false,
                        comparable: true,
                        compareField: "close",
                        showBalloon: false,
                        proCandlesticks: true
                    }],

                    stockLegend: {
                        valueTextRegular: undefined,
                        periodValueTextComparing: "[[percents.value.close]]%"
                    }

                },

                {
                    title: "Volume",
                    percentHeight: 30,
                    marginTop: 1,
                    columnWidth: 0.6,
                    showCategoryAxis: false,

                    stockGraphs: [{
                        valueField: "volumn",
                        openField: "open",
                        type: "column",
                        showBalloon: false,
                        fillAlphas: 1,
                        lineColor: "#fff",
                        fillColors: "#fff",
                        negativeLineColor: "#db4c3c",
                        negativeFillColors: "#db4c3c",
                        useDataSetColors: false
                    }],

                    stockLegend: {
                        markerType: "none",
                        markerSize: 0,
                        labelText: "",
                        periodValueTextRegular: "[[value.close]]"
                    },

                    valueAxes: [{
                        usePrefixes: true
                    }]
                }
            ],

            panelsSettings: {
                color: "#fff",
                plotAreaFillColors: "#333",
                plotAreaFillAlphas: 1,
                marginLeft: 60,
                marginTop: 5,
                marginBottom: 5
            },

            chartScrollbarSettings: {
                graph: "g1",
                graphType: "line",
                usePeriod: "WW",
                backgroundColor: "#333",
                graphFillColor: "#666",
                graphFillAlpha: 0.5,
                gridColor: "#555",
                gridAlpha: 1,
                selectedBackgroundColor: "#444",
                selectedGraphFillAlpha: 1
            },

            categoryAxesSettings: {
                equalSpacing: true,
                gridColor: "#555",
                gridAlpha: 1
            },

            valueAxesSettings: {
                gridColor: "#555",
                gridAlpha: 1,
                inside: false,
                showLastLabel: true
            },

            chartCursorSettings: {
                pan: true,
                valueLineEnabled: true,
                valueLineBalloonEnabled: true
            },

            legendSettings: {
                color: "#fff"
            },

            stockEventsSettings: {
                showAt: "high"
            },

            balloon: {
                textAlign: "left",
                offsetY: 10
            },

            periodSelector: {
                position: "bottom",
                periods: [{
                    period: "DD",
                    count: 10,
                    label: "10D"
                }, {
                    period: "MM",
                    count: 1,
                    label: "1M"
                }, {
                    period: "MM",
                    count: 6,
                    label: "6M"
                }, {
                    period: "YYYY",
                    count: 1,
                    label: "1Y"
                }, {
                    period: "YYYY",
                    count: 2,
                    selected: true,
                    label: "2Y"
                }, {
                    period: "YTD",
                    label: "YTD"
                }, {
                    period: "MAX",
                    label: "MAX"
                }]
            }
        });

    }, 500);
});