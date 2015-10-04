// Get background image from style
function getStyle(elem, styleProp) {
    if (elem.currentStyle) {
		var value = elem.currentStyle[styleProp];
	} else if (window.getComputedStyle){ 
		var value = document.defaultView.getComputedStyle(elem, null).getPropertyValue(styleProp);
	}
    return value;
}

 /**
 * Convert an image 
 * to a base64 url
 * @param  {String}   url         
 * @param  {Function} callback    
 * @param  {String}   [outputFormat=image/png]           
 */
function convertImgToBase64URL(url, callback, outputFormat){
    var img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = function(){
        var canvas = document.createElement('CANVAS'),
        ctx = canvas.getContext('2d'), dataURL;
        canvas.height = this.height;
        canvas.width = this.width;
        ctx.drawImage(this, 0, 0);
        dataURL = canvas.toDataURL(outputFormat);
        callback(dataURL);
        canvas = null; 
    };
    img.src = url;
}   

// Get statuses as they are currently
function getImages(callback) {
	// Process array of .uiMediaThumbImg elements
    var elements = document.getElementsByClassName('uiMediaThumbImg');

    // iterate over the elements, getting png urls
	var imgs = $.map(elements, function(element, index) {
        element = getStyle(element, 'background-image');
		// clip unnecessary info
		var len = element.length;
		element = element.substring(4,len-1);
		return element;
	});

    // iterate over the elements, converting png to base64
	var photos = [];
	var semaphore = imgs.length;
	imgs.map(function(imgurl, index) {
		convertImgToBase64URL(imgurl, function(base64Img){
		    // Base64DataURL
			photos[index] = base64Img.substring(22);
			// TODO: Is this how to waterfall these async processes?
			semaphore--;
			if (semaphore <= 0) {
				console.log("SEMAPHORE DEPLETED");
				batchCall(photos, "fer", callback);
			}
		});
	});
}

// listen for icon trigger on photos page
chrome.runtime.onConnect.addListener(function(port) {
	if (port.name != "photos") {
		alert(port);
		return;
	}
	port.onMessage.addListener(function(msg) {
		getImages(function(results) {
			port.postMessage(results);
		});
	});
	return true;
});

