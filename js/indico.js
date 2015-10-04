// TODO: hide apikey?
var apikey = "368f9df404609aed0e36f71d89e5b992";

// Feed the posts into indico
function batchCall(list, endpoint, callback) {
	$.ajax({
		url: "https://apiv2.indico.io/" + endpoint + "/batch?key=" + apikey,
		type: "POST",
		data: JSON.stringify({"data": list}),
		success: function (response) {
			// Sendback to the parent extension
			console.log(response);
			callback(JSON.parse(response).results);
		}, error: function(err) {
			console.error(err);
		}
	});
}
