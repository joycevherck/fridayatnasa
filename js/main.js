$(function() {

	var app = {

		init: function() {

			$.ajax({
			    url: "https://api.github.com/users/nasa/repos?callback=replace_me&format=jsonp",
			    jsonp: "callback",
			    dataType: "jsonp",
			    success: function( response ) {
			        showData(response.data);
			    },
			    error: function(e) {
			       console.log(e.message);
			    }
			});

		}

	}

	app.init();

});

function showData(data) {
	var data = data; // store results in var
	var results = [];
	var lang = [];

	// loop through results and add programming language to var
	$.each(data, function(i, val) {
		results.push(val.language);
	});

	results.sort();

	// count amount of times used
	var curr = null;
	var count = 0;

	for( var i = 0; i < results.length; i++ ) {
		if( results[i] != curr ) {
			if( count > 0 ) {
				lang.push( [ curr, count ] ); // add language and amount used
			}
			curr = results[i];
			count = 1;
		} else {
			count++;
		}
	}

	$.each(lang, function(i, val) {
		$('ul#langs').append('<li>' + val[0] + '</li>');

	})
}