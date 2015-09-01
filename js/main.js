$(function() {

	var app = {

		init: function() {

			$.ajax({
			    url: "https://api.github.com/users/nasa/repos?callback=replace_me&format=jsonp",
			    jsonp: "callback",
			    dataType: "jsonp",
			    success: function( response ) {
			        var data = response.data;
			        var results = [];

			        $.each(data, function(i, val) {
			        	results.push(val.language);
			        });

			        results.sort();
			        console.log(results);
			    },
			    error: function(e) {
			       console.log(e.message);
			    }
			});

		}

	}

	app.init();

});