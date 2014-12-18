

AmCharts.ready(function() {
    var chart = new AmCharts.AmStockChart();
    chart.pathToImages = "amcharts/images/";

    var dataSet = new AmCharts.DataSet();
    dataSet.dataProvider = chartData;
    dataSet.fieldMappings = [{
        fromField: "val",
        toField: "value"
    }];
    dataSet.categoryField = "date";
    chart.dataSets = [dataSet];

    var stockPanel = new AmCharts.StockPanel();
    chart.panels = [stockPanel];

    var panelsSettings = new AmCharts.PanelsSettings();
    panelsSettings.startDuration = 1;
    chart.panelsSettings = panelsSettings;

    var graph = new AmCharts.StockGraph();
    graph.valueField = "value";
    graph.type = "column";
    graph.fillAlphas = 1;
    graph.title = "MyGraph";
    stockPanel.addStockGraph(graph);

    chart.write("chartdiv");
});