
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview

    // YOUR CODE GOES HERE!
	//var params = encodeURI($('#street').val() + ", " + $('#city').val());
	var street = $('#street').val();
	var city = $('#city').val();
	var myLoc = street + ", " + city;	
	var mySrc = "https://maps.googleapis.com/maps/api/streetview?size=1200x900&location="+myLoc
	$body.append('<img class="bgimg" src="'+mySrc+'">');
	//console.log('<img class="bgimg" src="'+mySrc+'">');
	
	// Change greeting to reflect new location.
	$greeting.text("So, you want to live at "+myLoc+"?");
	
	// NYTimes API code
	var myNYTKey = "cac618e7253335e989678d8acb017ca9:15:71525051";
	var myNYTAPI = "http://api.nytimes.com/svc/search/v2/articlesearch.json?fq=";
	var myParams = encodeURI('glocations:("'+city+'")&sort=newest');
	$.getJSON( myNYTAPI+myParams+'&api-key='+myNYTKey, function( data ) {
		// from http://developer.nytimes.com/io-docs shows response object
	  var articles = data.response.docs;
	  for (i = 0; i < articles.length; i++) {
		  $nytElem.append('<li class="article">'+
		  '<a href="'+articles[i].web_url+'">'+articles[i].headline.main+'</a>'+
		  '<p>'+articles[i].snippet+'</p></li>');
	  }
	});
	
    return false;
};

$('#form-container').submit(loadData);

// loadData();
