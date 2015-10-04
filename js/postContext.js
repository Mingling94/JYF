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
		if (request == "posts") {
			getStatuses(function(results) {
				sendResponse(results);
			});
		}
		// Keep sendResponse asynchronously called
		return true;
	}
);

