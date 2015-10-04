$(document).ready(function() {
    // $('button').on('click', function() {
    //     $(this).animate({left: '200px'}, slow);
    //     alert("it works!"));
    // });
    $('div.bottom-row').on('click', 'button.basic', function() {
        // $(this).slideDown('slow', function() {
        //     alert("done!");
        // });
        //alert("It works!")
    })

    // Graph data scripts

    var graphData = [{
        // Visits
            data: [ [6, 1300], [7, 1600], [8, 1900], [9, 2100], [10, 2500], [11, 2200], [12, 2000], [13, 1950], [14, 1900], [15, 2000] ],
            color: '#71c73e'
        }, {
        // Returning Visits
            data: [ [6, 500], [7, 600], [8, 550], [9, 600], [10, 800], [11, 900], [12, 800], [13, 850], [14, 830], [15, 1000] ],
            color: '#77b7c5',
            points: { radius: 4, fillColor: '#77b7c5' }
        }
    ];

        // Bars
    $.plot($('#graph-bars'), graphData, {
        series: {
            bars: {
                show: true,
                barWidth: .9,
                align: 'center'
            },
            shadowSize: 0
        },
        grid: {
            color: '#646464',
            borderColor: 'transparent',
            borderWidth: 20,
            hoverable: true
        },
        xaxis: {
            tickColor: 'transparent',
            tickDecimals: 2
        },
        yaxis: {
            tickSize: 1000
        }
    });


});
