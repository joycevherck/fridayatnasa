$(function() {

	var app = {

		init: function() {

			$.ajax({
			    url: "https://api.github.com/users/nasa/repos?callback=replace_me&format=jsonp",
			    jsonp: "callback",
			    dataType: "jsonp",
			    success: function( response ) {
			        console.log( response.data ); // server response
			    },
			    error: function(e) {
			       console.log(e.message);
			    }
			});

		}

	}

	app.init();

});