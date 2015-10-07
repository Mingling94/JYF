// Get background image from style
function getStyle(elem, styleProp) {
	if (elem.currentStyle) {
		var value = elem.currentStyle[styleProp];
	} else if (window.getComputedStyle){ 
		var value = document.defaultView.getComputedStyle(elem, null).getPropertyValue(styleProp);
	}
	return value;
}

// Get image urls
function getThumbnails(callback) {
	// Process array of .uiMediaThumbImg elements
	var elements = document.getElementsByClassName('uiMediaThumbImg');

	// iterate over the elements, getting png urls
	var pngImgs = $.map(elements, function(element, index) {
		element = getStyle(element, 'background-image');

		// clip unnecessary info
		var len = element.length;
		element = element.substring(4,len-1);

		return element;
	});

	return pngImgs;
}

// listen for icon trigger on photos page
chrome.runtime.onConnect.addListener(function(port) {
	if (port.name != "photos") {
		alert(port);
		return;
	}
	port.onMessage.addListener(function(msg) {
		var thumbnails = getThumbnails();
		var base64Imgs = pngToBase64(thumbnails)
		var results = batchCall(base64Imgs, "fer");
		port.postMessage(thumbnails, results));
	});
});

