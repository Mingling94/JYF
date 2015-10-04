// TODO: hide apikey?
var apikey = "368f9df404609aed0e36f71d89e5b992";
var test = ["what", "about", "this"];
function getSentiments_Img(srcList, callback) {
	$.ajax({
		url: "https://apiv2.indico.io/fer?key=" + apikey,
		type: "POST",
		data: JSON.stringify({"data": srcList}),
		success: function (data) {
			// Sendback to the parent extension
			callback(JSON.parse(data).results);
		}, error: function(err) {
			console.error(err);
		}
	});
}
 function getStyle(x, styleProp) {
        if (x.currentStyle) var y = x.currentStyle[styleProp];
        else if (window.getComputedStyle) var y = document.defaultView.getComputedStyle(x, null).getPropertyValue(styleProp);
        return y;
    }


       // view the console to see the result
    
// Get statuses as they are currently
function getImages(callback) {
	// Process array of <i> elements
	/*var images = document.getElementsByTagName('i').style.backgroundImage;
//var images = document.getElementsByTagName('i.UiMediaThumbImg'); 
console.log(images);
var srcList = [];
for(var j = 0; j < images.length; j++) {
    srcList.push(images[j].src);
}
	// Sendback to the parent extension
	console.log(srcList);
	
*/


       // Get all elements on the page
    var elements = document.getElementsByClassName('uiMediaThumbImg');

       // store the results
    var results = [],
        i = 0,
        bgIm;

       // iterate over the elements
    for (;elements[i];i++) {
             // get the background-image style property
        bgIm = getStyle(elements[i], 'background-image');
var len= bgIm.length;
		bgIm=bgIm.substring(4,len-1);
             // if one was found, push it into the array
        if (bgIm && bgIm !== 'none') {
            results.push(bgIm);
        }
    }
	console.log(results);
	getSentiments_Img(results, callback);
	}

// listen for icon trigger
chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		if (request == "getImages") {
			getImages(function(results) {
				sendResponse(results);
			});
		}
		// Keep sendResponse asynchronously called
		return true;
	}
);

