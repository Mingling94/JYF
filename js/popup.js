document.addEventListener('DOMContentLoaded', function() {
	// Send message to the current tab
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    	// since only one tab should be active and in the current window at once
    	// the return variable should only have one entry
    	var taburl = tabs[0].url;
    	var tabid = tabs[0].id;
		var msg;
		if (taburl.indexOf("photos") > -1) {
			var port = chrome.tabs.connect(tabid, {name: "photos"});
			port.postMessage("photos");
			port.onMessage.addListener(function(response) {
				alert(response);
			});
		} else if (taburl.indexOf("facebook.com") > -1) {
			chrome.tabs.sendMessage(tabid, "posts", function(response) {
				graphStatusData(response);
			});
		} else {
			alert("Navigate to a facebook photo page or timeline to use this extension!")
			window.close();
		}
	});
});

