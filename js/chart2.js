//var data = !{JSON.stringify(data)};
AmCharts.ready(function() {

    /**
     * Delay loading by a few moments so that the page has a chace to build itself
     */

    setTimeout(function() {

            /**
            * Define all data sets

            */


            var dataSets = [];

            for (var idx in data) {
                /*
                var tmpstockdata = [{
                        "date": "03-1-2014",
                        "open": 1215.86,
                        "high": 1234.52,
                        "low": 1208.6,
                        "close": 1224.62,
                        "volumn": 5265556020
                    },
                    {
                        "date": "06-1-2014",
                        "open": 1222.69,
                        "high": 1231.62,
                        "low": 1205.44,
                        "close": 1230.84,
                        "volumn": 4860342360
                    }, {
                        "date": "07-1-2014",
                        "open": 1236.41,
                        "high": 1262.44,
                        "low": 1235.51,
                        "close": 1262.36,
                        "volumn": 5068248590
                    }, {
                        "date": "08-1-2014",
                        "open": 1261.69,
                        "high": 1273.62,
                        "low": 1253.6,
                        "close": 1257.73,
                        "volumn": 4690267310
                    }, {
                        "date": "09-1-2014",
                        "open": 1264.03,
                        "high": 1277.5,
                        "low": 1255.11,
                        "close": 1258.26,
                        "volumn": 4767159230
                    }, {
                        "date": "10-1-2014",
                        "open": 1247.27,
                        "high": 1259.5,
                        "low": 1240.38,
                        "close": 1255.45,
                        "volumn": 4277627130
                    }, {
                        "date": "13-1-2014",
                        "open": 1244.21,
                        "high": 1283.76,
                        "low": 1244.14,
                        "close": 1283.56,
                        "volumn": 4337186140
                    }, {
                        "date": "14-1-2014",
                        "open": 1276.39,
                        "high": 1300.65,
                        "low": 1274.33,
                        "close": 1295.87,
                        "volumn": 5927237440
                    }, {
                        "date": "15-1-2014",
                        "open": 1293.39,
                        "high": 1297.76,
                        "low": 1275.78,
                        "close": 1277.03,
                        "volumn": 5163730190
                    }];
                */

            var tmpstockdata=data[idx].data;
            console.log("Client Data=" + JSON.stringify(tmpstockdata));
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
                dataProvider: tmpstockdata,
                categoryField: "date"
                    //stockEvents: events
            });
        }

        /**
         * Build the chart
         */
        var chart = AmCharts.makeChart("chartdiv", {
            type: "stock",
            pathToImages: "http://www.amcharts.com/lib/3/images/",
            color: "#fff",
            dataSets: dataSets,
            dataDateFormat: "YYYY-MM-DD",

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
                //equalSpacing: true,
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