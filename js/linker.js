// Turns 1d array to 2d array for graphing
function arrayTo2d(arr) {
	if (!arr) {
		return;
	}
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
	// Show Average
	var sum = 0;
	for (var i = 0; i < sentiments.length; i++) {
		sum = sum + sentiments[i];
	}
	var avg = sum/sentiments.length;
	avg = Math.round(avg);
	$("#aver").text(avg);
	if(avg > 50) {
		$("#person_status").text = "Positive Outlook";
		$("#person_status").css("background-color", "rgba(99, 240, 24,0.59)");
	} else {
		$("#person_status").text = "Negative Outlook";
		$("#person_status").css("background-color", "rgba(232, 163, 157,0.34)");
	}
	
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

	$('.graph-lines').hide();

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
		if (!item) {
			$('#tooltip').remove();
			previousPoint = null;
			return;
		}

		if (previousPoint != item.dataIndex) {
			previousPoint = item.dataIndex;
			$('#tooltip').remove();
			var x = item.datapoint[0],
				y = item.datapoint[1];
				var l= Math.round(y); 
			showTooltip(item.pageX, item.pageY, l + ' HP for ' + 'post ' + x);
		}
	});
}

function graphPhotoData(results) {
	var averages = [0, 0, 0, 0, 0, 0];
	var count = results.length;
	results.forEach(function(result, index) {
		var i = 0;
		for (var emo in result) {
			if (!(i < 6)) {
				break;
			}
			if (result.hasOwnProperty(emo)) {
				var value = result[emo];
				if (value >= .05) {
					averages[i] += value;
				}
				// TODO: If the value is below .05, remove it from being counted in the average
			}
			i++;
		}
	});

	$("#fersection").removeClass("hidden");
	$("#sentsection").addClass("hidden");
	$("#Angry").text(averages[0]/count);
	$("#Fear").text(averages[1]/count);
	$("#Happy").text(averages[2]/count);
	$("#Neutral").text(averages[3]/count);
	$("#Sad").text(averages[4]/count);
	$("#Surprised").text(averages[5]/count);
}

