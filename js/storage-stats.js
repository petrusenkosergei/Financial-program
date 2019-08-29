$(document).ready(function () {
    $.get('/GetStorageInfo', function (response) {
        DrawDonut(response);
    }).fail(function () {
        DrawDonutStatic();
    });

    $('#storage-action__files-upload').change(function () {
        $('#storage-action__form-files-upload').ajaxSubmit({
            error: function (xhr, a, b, c) {
                alert('Error: ' + xhr.status);
            },
            success: function (response, a, b, c) {
                DrawDonut(response);
            }
        });
    });

    $('.storage-stats__graph-selection').click(function () {
        if ($(this).is(':checked')) {
            drawGraphReportMonth();
        }
    });
});

function DrawDonut(response) {
    var storageInfo = JSON.parse(response);
    $('#storage-stats__graph-diagram-stats').empty();
    Morris.Donut({
        element: 'storage-stats__graph-diagram-stats',
        data: [
            {
                value: (storageInfo.Audio.SizeInBytes / 1048576).toFixed(2) + ' Mb',
                label: storageInfo.Audio.Count + ' files', color: '#4daf7b'
            },
            {
                value: (storageInfo.Other.SizeInBytes / 1048576).toFixed(2) + ' Mb',
                label: storageInfo.Other.Count + ' files', color: '#b1a599'
            },
            {
                value: (storageInfo.Photo.SizeInBytes / 1048576).toFixed(2) + ' Mb',
                label: storageInfo.Photo.Count + ' files', color: '#ebc85e'
            },
            {
                value: (storageInfo.Video.SizeInBytes / 1048576).toFixed(2) + ' Mb',
                label: storageInfo.Video.Count + ' files', color: '#e55e3a'
            }
        ],
        backgroundColor: '#fff',
        valueColor: '#8e8071',
        formatter: function (x) {
            return x
        }
    });

    $("#percent-audio").html(storageInfo.Audio.PercentSizeInBytes.toFixed(0) + "%");
    $("#percent-video").html(storageInfo.Video.PercentSizeInBytes.toFixed(0) + "%");
    $("#percent-photo").html(storageInfo.Photo.PercentSizeInBytes.toFixed(0) + "%");
}

function DrawDonutStatic() {
    $('#storage-stats__graph-diagram-stats').empty();
    Morris.Donut({
        element: 'storage-stats__graph-diagram-stats',
        data: [
            {
                value: '112 Gb',
                label: '59 files', color: '#4daf7b'
            },
            {
                value: '10 Gb',
                label: '5 files', color: '#b1a599'
            },
            {
                value: '35 Gb',
                label: '18 files', color: '#ebc85e'
            },
            {
                value: '47 Gb',
                label: '25 files', color: '#e55e3a'
            }
        ],
        backgroundColor: '#fff',
        valueColor: '#8e8071',
        formatter: function (x) {
            return x
        }
    });

    $("#percent-audio").html("55%");
    $("#percent-video").html("23%");
    $("#percent-photo").html("17%");
}

var graphData = [
    {"period": "2018-03-31", "audio": 9, "video": 4, "photo": 13, "other": 6},
    {"period": "2018-03-25", "audio": 3, "video": 10, "photo": 15, "other": 8},
    {"period": "2018-03-14", "audio": 8, "video": 7, "photo": 9, "other": 6},
    {"period": "2018-03-05", "audio": 7, "video": 5, "photo": 10, "other": 4},
    {"period": "2018-03-01", "audio": 10, "video": 5, "photo": 14, "other": 4}
];

function drawGraphReportMonth() {
    $('#storage-stats__graph-report-month').empty();
    var radioGroupChartView = document.getElementsByName("chart-view");
    if (radioGroupChartView[0].checked) {
        Morris.Line({
            element: 'storage-stats__graph-report-month',
            data: graphData,
            lineColors: ['#4daf7b', '#e55e3a', '#ebc85e', '#b1a599'],
            xkey: 'period',
            ykeys: ['audio', 'video', 'photo', 'other'],
            labels: ['audio', 'video', 'photo', 'other'],
            resize: true
        });
    }
    else if (radioGroupChartView[1].checked) {
        Morris.Bar({
            element: 'storage-stats__graph-report-month',
            data: graphData,
            barColors: ['#4daf7b', '#e55e3a', '#ebc85e', '#b1a599'],
            xkey: 'period',
            ykeys: ['audio', 'video', 'photo', 'other'],
            labels: ['audio', 'video', 'photo', 'other'],
            xLabelAngle: 60
        });
    }
    else if (radioGroupChartView[2].checked) {
        Morris.Area({
            element: 'storage-stats__graph-report-month',
            data: graphData,
            lineColors: ['#4daf7b', '#e55e3a', '#ebc85e', '#b1a599'],
            xkey: 'period',
            ykeys: ['audio', 'video', 'photo', 'other'],
            labels: ['audio', 'video', 'photo', 'other']
        });
    }
}
