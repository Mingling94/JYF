
$("body").bind("click mousedown", function() {
   
$(window).ready(function() {
	var posts = $("p").map(function() {
		return $(this)[0].innerText;
	});
	console.log(posts);
}); 
});

var statuses = ["Omg", "Becky", "No way"];
var apikey = "368f9df404609aed0e36f71d89e5b992";

  window.fbAsyncInit = function() {
    FB.init({
      appId      : '495580443948548',
      xfbml      : true,
      version    : 'v2.4'
    });
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));

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
