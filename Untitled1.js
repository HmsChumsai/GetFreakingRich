var chart = AmCharts.makeChart("chartdiv", {
  type: "stock",
  color: "#fff",
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
    dataProvider: data,
    title: name,
    categoryField: "date"
  }, {
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
    dataProvider: second,
    title: "SET",
    categoryField: "date"
  }, {
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
    dataProvider: third,
    title: "SET50",
    categoryField: "date"
  }],
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
      comparedGraphLineThickness: 2,
      useDataSetColors: false,
      comparable: true,
      compareField: "value",
      showBalloon: false,
      proCandlesticks: true
    }],
    stockLegend: {
      valueTextRegular: undefined,
      periodValueTextComparing: "[[percents.value.close]]%"
    },
    drawingIconsEnabled: true
  }, {
    title: "Volume",
    percentHeight: 30,
    marginTop: 1,
    columnWidth: 0.6,
    showCategoryAxis: false,
    usePrefixes: true,
    stockGraphs: [{
      valueField: "volume",
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
  }],
  chartScrollbarSettings: {
    graph: "g1",
    graphType: "line",
    usePeriod: "WW"
  },
  chartCursorSettings: {
    pan: true,
    valueLineBalloonEnabled: true,
    valueLineEnabled: true
  },
  dataSetSelector: {
    position: "left"
  },
  panelsSettings: {
    color: "#fff",
    plotAreaFillColors: "#000",
    plotAreaFillAlphas: 0.2,
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
      count: 1,
      label: "1 month"
    }, {
      period: "MM",
      count: 6,
      label: "6 month"
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