document.addEventListener('DOMContentLoaded', function() {
	// Send message to the current tab
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    	// since only one tab should be active and in the current window at once
    	// the return variable should only have one entry
    	var taburl = tabs[0].url;
		var msg;
		if (taburl.indexOf("photos") > -1) {
			msg = "photos";
		} else if (taburl.indexOf("facebook.com") > -1) {
			msg = "posts";
		} else {
			alert("Navigate to a facebook photo page or timeline to use this extension!")
			window.close();
		}
		chrome.tabs.sendMessage(tabs[0].id, msg, function(response) {
			graphStatusData(response);
		});
	});
});
