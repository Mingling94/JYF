// TODO: hide apikey?
var apikey = "368f9df404609aed0e36f71d89e5b992";
var test = ["what", "about", "this"];
function getSentiments(posts, callback) {
	$.ajax({
		url: "https://apiv2.indico.io/sentiment/batch?key=" + apikey,
		type: "POST",
		data: JSON.stringify({"data": posts}),
		success: function (data) {
			// Sendback to the parent extension
			callback(JSON.parse(data).results);
		}, error: function(err) {
			console.error(err);
		}
	});
}

// Get statuses as they are currently
function getStatuses(callback) {
	// Process array of <p> elements
	var posts = $("p").map(function() {
		return $(this)[0].innerText;
	}).get();
	// Sendback to the parent extension
	getSentiments(posts, callback);
}

// listen for icon trigger
chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		if (request == "getStatuses") {
			getStatuses(function(results) {
				sendResponse(results);
			});
		}
		// Keep sendResponse asynchronously called
		return true;
	}
);

