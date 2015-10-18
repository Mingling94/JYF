document.addEventListener('DOMContentLoaded', function() {
	// Send message to the current tab
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		// since only one tab should be active and in the current window at once
		// the return variable should only have one entry
		var tab = tabs[0];
		var msg;
		// On a photos tab
		if (tab.url.indexOf("photos") > -1) {
			var port = chrome.tabs.connect(tab.id, {name: "photos"});
			port.postMessage("photos");
			port.onMessage.addListener(function(response) {
				graphPhotoData(response);
			});
		// Or on a newsfeed/timeline/some other page with posts
		} else if (tab.url.indexOf("facebook.com") > -1) {
			chrome.tabs.sendMessage(tab.id, "posts", function(response) {
				// TODO: Figure out how sendResponse's arguments get passed
				console.log(response);
				graphStatusData(response.results);
			});
		} else {
			alert("Navigate to a facebook photo page or timeline to use this extension!")
			window.close();
		}
	});
});

