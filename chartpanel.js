      var data = !{JSON.stringify(data)};
      var dataSets=[];
      for (var x in data) {
      dataSets.push({
      title: data[x].stockname,
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
      dataProvider: data[x].data,
      categoryField: "Date",
      });
      var chart = AmCharts.makeChart("chartdiv", {
      type: "stock",
      "theme": "dark",
      pathToImages: "http://www.amcharts.com/lib/3/images/",
      dataSets: [{
      fieldMappings: [{
      fromField: "open",
      toField: "open"
      }, {
      fromField: "close",
      toField: "close"
      }, {
      fromField: "high",
      toField: "high"
      }, {
      fromField: "low",
      toField: "low"
      }, {
      fromField: "volumn",
      toField: "volumn"
      }, {
      fromField: "value",
      toField: "value"
      }],
      dataProvider: dataSets,
      title: name,
      categoryField: "date"
      }],
      panels: [{
      title: "Value",
      showCategoryAxis: false,
      percentHeight: 70,
      valueAxes: [{
      id: "v1",
      dashLength: 5
      }],
      categoryAxis: {
      dashLength: 5
      },
      stockGraphs: [{
      type: "candlestick",
      id: "g1",
      openField: "open",
      closeField: "close",
      highField: "high",
      lowField: "low",
      valueField: "close",
      lineColor: "#7f8da9",
      fillColors: "#7f8da9",
      negativeLineColor: "#db4c3c",
      negativeFillColors: "#db4c3c",
      fillAlphas: 1,
      useDataSetColors: false,
      comparable: true,
      compareField: "value",
      showBalloon: false,
      proCandlesticks: true
      }],
      stockLegend: {
      valueTextRegular: undefined,
      },
      drawingIconsEnabled: true
      }, {
      title: "Volume",
      percentHeight: 30,
      marginTop: 1,
      showCategoryAxis: true,
      valueAxes: [{
      dashLength: 5
      }],
      categoryAxis: {
      dashLength: 5
      },
      stockGraphs: [{
      valueField: "volumn",
      type: "column",
      showBalloon: false,
      fillAlphas: 1
      }],
      stockLegend: {
      markerType: "none",
      markerSize: 0,
      labelText: "",
      periodValueTextRegular: "[[value.close]]"
      }
      }],
      chartScrollbarSettings: {
      graph: "g1",
      graphType: "line",
      usePeriod: "WW"
      },
      chartCursorSettings: {
      pan:true,
      valueLineBalloonEnabled: true,
      valueLineEnabled: true
      },
      dataSetSelector: {
      position: "left"
      },
      periodSelector: {
      selectFromStart: false,
      position: "left",
      periods: [{
      period: "DD",
      count: 10,
      label: "10 days"
      }, {
      period: "MM",
      selected: true,
      count: 1,
      label: "1 month"
      }, {
      period: "YY",
      count: 1,
      label: "1 year"
      }, {
      period: "YTD",
      label: "YTD"
      }]
      }
      });
      }
      