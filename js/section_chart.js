var data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [

        {
            label: "My Second dataset",
            fillColor: "rgba(151,187,205,0.2)",
            strokeColor: "rgba(151,187,205,1)",
            pointColor: "rgba(151,187,205,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(151,187,205,1)",
            data: [28, 48, 40, 19, 86, 27, 90]
        }
    ]
};

var canvas = document.getElementById("chart");
var ctx = canvas.getContext("2d");
var chart = new Chart(ctx).Line(data);


canvas.onclick = function (evt) {
    var points = chart.getPointsAtEvent(evt);
    alert(chart.datasets[0].points.indexOf(points[0]));
};



var chart = new Chart(ctx, {
    type: 'line',
    data: data,
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    // Include a dollar sign in the ticks
                    callback: function(value, index, values) {
                        return '$' + value;
                    }
                }
            }]
        }
    }
});