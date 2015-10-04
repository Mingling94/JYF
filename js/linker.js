// Turns 1d array to 2d array for graphing
var avg=0;
function arrayTo2d(arr) {
	if (!arr) {
		return;
	}
	var array2d = [];
	
	for (var i = 0; i < arr.length; i++) {
		var entry = [];
		entry[0] = i; // x-value
		entry[1] = 100 * arr[i]; // y-value
		avg=avg+entry[1];
		array2d[i] = entry;
	}
	avg=avg/arr.length;
	avg=Math.round(avg);
	document.getElementById("aver").innerHTML=avg;
	if(avg>50)
	{
	document.getElementById("person_status").innerHTML="Positive Outlook";
	$("#person_status").css("background-color", "rgba(99, 240, 24,0.59)");
	}
	else
	{
	document.getElementById("person_status").innerHTML="Negative Outlook";
	$("#person_status").css("background-color", "rgba(232, 163, 157,0.34)");
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
            color: '#3B5998',
            points: { radius: 4, fillColor: '#3B5998' }
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
			title: 'Number of Posts',
			tickColor: 'transparent',
            tickDecimals: 0
        },
        yaxis: {
		title: 'Weighed Happiness',
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
			
			title: 'Number of Posts',
            tickColor: 'transparent',
            tickDecimals: 0
        },
        yaxis: {
			
		title: 'Weighed Happiness',
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
					var l= Math.round(y); 
                showTooltip(item.pageX, item.pageY, l + ' HP for ' + 'post ' + x);
            }
        }
        else {
            $('#tooltip').remove();
            previousPoint = null;
        }
    });
}
