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
	var chartOptions = {
		//scaleShowLabelBackdrop : false,
		//scaleShowLine : false,
		scaleBackdropPaddingY: 5,
		scaleBackdropPaddingX: 5,
		segmentStrokeColor: "#b84343",
	}
	var polar;
	var colors = [ '#F8F6F2', '#F0ECE2', '#EAE5D7', '#E3DCC9', '#DCD3BC', '#D5CAAE', '#CEC2A1', '#C8B993', '#C1B086', '#BAA778', '#B39E6B' ]

	$.each(lang, function(i, val) { // get data in var
		var v = val[1];
		var l = val[0];

		chartData.push({
			value: v,
			color: colors[i],
			highlight: '#4A2D2D',
			label: l
		});
	})

	polar = new Chart(ctx).PolarArea(chartData, chartOptions);


}