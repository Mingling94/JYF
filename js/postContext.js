// Get array statuses
function getPosts(callback) {
	// Process array of <p> elements
	// TODO: Group together <p>'s of the same status
	var posts = $("p").map(function() {
		var post = $(this)[0].innerText;
		if (post && post.length > 0)
			return post;
	}).get();
	return posts;

	// Sendback to the parent extension
	batchCall(posts, 'sentiment', function(results) {
		callback(posts, results)
	});
}

// listen for icon trigger on timeline
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
		if (request == "posts") {
			var posts = getPosts();
			var results = batchCall(posts, 'sentiment');
			sendResponse(posts, results);
		}
		// Keep sendResponse asynchronously called
		return true;
	}
);

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
function pngToBase64(pngs) {
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
				console.log("Images done loading!");
				return base64Imgs;
			}
		});
	});
}


