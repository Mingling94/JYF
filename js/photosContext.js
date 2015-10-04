// Get background image from style
function getStyle(elem, styleProp) {
    if (elem.currentStyle) {
		var value = elem.currentStyle[styleProp];
	} else if (window.getComputedStyle){ 
		var value = document.defaultView.getComputedStyle(elem, null).getPropertyValue(styleProp);
	}
    return value;
}
    
// Get statuses as they are currently
function getImages(callback) {
	// Process array of .uiMediaThumbImg elements
    var elements = document.getElementsByClassName('uiMediaThumbImg');
	var imgs = [];

    // iterate over the elements
    for (var i = 0; elements[i] ;i++) {
		var temp = elements[i];
        // get the background-image style property
        temp = getStyle(temp, 'background-image');
		// clip unnecessary info
		var len = temp.length;
		temp = temp.substring(4,len-1);

		imgs[i] = temp;
    }
	console.log(imgs);

	// TODO: Convert images
	//getSentiments_Img(results, callback);
}

// listen for icon trigger
chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		if (request == "photos") {
			getImages(function(results) {
				sendResponse(results);
			});
		}
		// Keep sendResponse asynchronously called
		return true;
	}
);

