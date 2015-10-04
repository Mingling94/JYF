$(window).ready(function() {
	var posts = $("p").map(function() {
		return $(this)[0].innerText;
	});
	console.log(posts);
});

var statuses = ["Omg", "Becky", "No way"];
var apikey = "368f9df404609aed0e36f71d89e5b992";

$.ajax({
    url: "https://apiv2.indico.io/sentiment/batch?key=" + apikey,
    type: "POST",
    data: JSON.stringify({"data": statuses}),
    success: function (data) {
        console.log(data); //indent
    }, error: function(err) {
        console.log(err); //indent
    }
});
