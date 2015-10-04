// Turns 1d array to 2d array for graphing
function arrayTo2d(arr) {
	var array2d = [];
	for (var i = 0; i < arr.length; i++) {
		var entry = [];
		entry[0] = i; // x-value
		entry[1] = 100 * arr[i]; // y-value
		array2d[i] = entry;
	}
	return array2d;
}

function graphStatusData(sentiments) {
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

    var graphData = [
        {
            data: arrayTo2d(sentiments),
            color: '#77b7c5',
            points: { radius: 4, fillColor: '#77b7c5' }
        }
    ];

    // Lines
    $.plot($('.graph-lines'), graphData, {
        series: {
            points: {
                show: true,
                radius: 5
            },
            lines: {
                show: true
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
            tickDecimals: 0
        },
        yaxis: {
            tickSize: 10
        }
    });

    // Bars
    $.plot($('.graph-bars'), graphData, {
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
            tickDecimals: 0
        },
        yaxis: {
            tickSize: 10
        }
    });

    $('.graph-bars').hide();

    $('#lines').on('click', function (e) {
        $('#bars').removeClass('active');
        $('.graph-bars').fadeOut();
        $('.graph-bars').addClass('hidden');
        $(this).addClass('active');
        $('.graph-lines').fadeIn();
        $('.graph-lines').removeClass('hidden');
        e.preventDefault();
    });

    $('#bars').on('click', function (e) {
        $('#lines').removeClass('active');
        $('.graph-lines').fadeOut();
        $('.graph-lines').addClass('hidden');
        $(this).addClass('active');
        $('.graph-bars').fadeIn();
        $('.graph-bars').removeClass('hidden');
        e.preventDefault();
    });

    function showTooltip(x, y, contents) {
        $('<div id="tooltip">' + contents + '</div>').css({
            top: y - 16,
            left: x + 20
        }).appendTo('body').fadeIn();
    }

    var previousPoint = null;

    $('.graph-lines, .graph-bars').bind('plothover', function (event, pos, item) {
        if (item) {
            if (previousPoint != item.dataIndex) {
                previousPoint = item.dataIndex;
                $('#tooltip').remove();
                var x = item.datapoint[0],
                    y = item.datapoint[1];
                showTooltip(item.pageX, item.pageY, y + ' visitors at ' + x + '.00h');
            }
        }
        else {
            $('#tooltip').remove();
            previousPoint = null;
        }
    });
}
