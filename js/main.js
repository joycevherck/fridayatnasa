$(function() {

	var app = {

		init: function() {

			// ajax call
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

	// create chart
	var ctx = $("#langChart").get(0).getContext("2d"); // get canvas
	var chartData = [];
	var polar;
	var colors = [ '#850F85', '#680F85', '#4A0F85', '#300F85', '#150F85', '#0F3885', '#0F6785', '#0F8385', '#0F856B', '#0F854F', '#0F852E' ]

	$.each(lang, function(i, val) { // get data in var
		var v = val[1];
		var l = val[0];

		chartData.push({
			value: v,
			color: colors[i],
			highlight: '#993939',
			label: l
		});

		$('ul#langs').append('<li><span style="background-color:' + colors[i] + ';" data-color="' + colors[i] + '"></span>' + val[0] + '</li>');
	})

	polar = new Chart(ctx).PolarArea(chartData);


}