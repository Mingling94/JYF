// Shortcut to get last item of array
if (!Array.prototype.last){
    Array.prototype.last = function(){
        return this[this.length - 1];
    };
};

// Get array statuses
function getPosts(callback) {
	// Process array of <p> elements
	posts = [];
	$('p').each(function(index, item) {
		var prev = $(item).prev();
		if (prev.prop('tagName') === 'P' && prev[0].innerText === posts.last()) {
			posts.push(posts.pop() + '\n' + item.innerText);
		} else {
			posts.push(item.innerText);
		}
	})
	return posts;
}

// listen for icon trigger on timeline
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if (request == "posts") {
		var posts = getPosts();
		batchCall(posts, 'sentiment', function(results) {
			sendResponse({
				posts: posts,
				results: results,
			});
		});
	}
	// Keep sendResponse asynchronously called
	return true;
});

