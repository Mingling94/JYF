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

 /**
 * Convert an image 
 * to a base64 url
 * @param  {String}   url
 * @param  {Function} callback
 * @param  {String}   [outputFormat=image/png]
 */
function convertImg(url, callback, outputFormat){
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

// Convert images to indico compatible file format
function pngToBase64(pngs, callback) {
	// convert png images to base64
	var base64Imgs = [];
	var imageCount = pngs.length;
	pngs.map(function(url, index) {
		convertImg(url, function(base64Img){
			// Base64DataURL
			base64Imgs[index] = base64Img.substring(22);

			// TODO: Is this how to waterfall these async processes?
			imageCount--;
			if (imageCount <= 0) {
				callback(base64Imgs);
			}
		});
	});
}

// listen for icon trigger on photos page
chrome.runtime.onConnect.addListener(function(port) {
	if (port.name != 'photos') {
		alert(port);
		return;
	}
	port.onMessage.addListener(function(msg) {
		var thumbnails = getThumbnails();
		pngToBase64(thumbnails, function(base64Imgs) {
			// TODO: This is callback hell, but is it necessary to async this
			// way to wait for image conversion to finish?
			console.log(thumbnails, base64Imgs);
			batchCall(base64Imgs, 'fer', function(results) {
				port.postMessage({
					thumbnails: thumbnails,
					results: results,
				});
			});
		});
	});
});

