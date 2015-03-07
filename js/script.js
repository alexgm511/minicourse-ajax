
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
	//"[q=search term&fq=filter-field:(filter-term)&additional-params=values]&api-key=####"
	$.getJSON( myNYTAPI+myParams+'&api-key'+myNYTKey, function( data ) {
	  var items = [];
	  $.each( data, function( key, val ) {
		items.push( "<li id='" + key + "'>" + val + "</li>" );
	  });
	  
	  $nytElem.html(items.join( "" ));
	  /*$( "<ul/>", {
		"class": "my-new-list",
		html: items.join( "" )
	  }).appendTo( "body" );*/
	});
	
    return false;
};

$('#form-container').submit(loadData);

// loadData();
