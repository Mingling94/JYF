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
			callback(JSON.parse(response).results);
		}, error: function(err) {
			console.error(err);
		}
	});
}

// Get statuses as they are currently
function getStatuses(callback) {
	// Process array of <p> elements
	var posts = $("p").map(function() {
		var post = $(this)[0].innerText;
		if (post)
			return post;
	}).get();
	// Sendback to the parent extension
	batchCall(posts, 'sentiment', callback);
}

// listen for icon trigger
chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		if (request == "indico") {
			getStatuses(function(results) {
				sendResponse(results);
			});
		}
		// Keep sendResponse asynchronously called
		return true;
	}
);

