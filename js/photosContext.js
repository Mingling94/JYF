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
	var imgs = [];
    for (var i = 0; elements[i];i++) {
		var temp = elements[i];
        // get the background-image style property
        temp = getStyle(temp, 'background-image');
		// clip unnecessary info
		var len = temp.length;
		temp = temp.substring(4,len-1);

		imgs[i] = temp;
    }

    // iterate over the elements, converting png to base64
	var photos = $.map(imgs, function(imgurl, index) {
		convertImgToBase64URL(imgurl, function(base64Img){
		    // Base64DataURL
			photos[index] = base64Img;
		});
	});
	console.log(photos);

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

