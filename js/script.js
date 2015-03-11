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
    var street = $('#street').val();
    var city = $('#city').val();
    var myLoc = street + ", " + city;
    var mySrc = "https://maps.googleapis.com/maps/api/streetview?size=1200x900&location=" + myLoc
    $body.append('<img class="bgimg" src="' + mySrc + '">');

    // Change greeting to reflect new location.
    $greeting.text("So, you want to live at " + myLoc + "?");

    // NYTimes API code
    var myNYTKey = "cac618e7253335e989678d8acb017ca9:15:71525051";
    var myNYTAPI = "http://api.nytimes.com/svc/search/v2/articlesearch.json?fq=";
    var myParams = encodeURI('glocations:("' + city + '")&sort=newest');
    $.getJSON(myNYTAPI + myParams + '&api-key=' + myNYTKey, function(data) {
        $nytHeaderElem.text('New York Times Articles from ' + city);
        // from http://developer.nytimes.com/io-docs shows response object
        var articles = data.response.docs;
        for (i = 0; i < articles.length; i++) {
            $nytElem.append('<li class="article">' +
                '<a href="' + articles[i].web_url + '">' + articles[i].headline.main + '</a>' +
                '<p>' + articles[i].snippet + '</p></li>');
        }
    }).error(function() {
        $nytHeaderElem.text('New York Times Articles Could Not Be Loaded');
    });


    // build url query and send request
    var wikiAPI = 'http://en.wikipedia.org/w/api.php?action=opensearch&search=' + city + '&format=json'

    var wikiRequestTimeout = setTimeout(function() {
        $wikiElem.text("failed to get wikipedia resources");
    }, 8000);

    $.ajax({
        url: wikiAPI,
        dataType: 'jsonp',
        type: 'GET',
        success: function(data) {
            var titles = data[1];
            var urls = data[3];
            for (var i = 0; i < titles.length; i++) {
                $wikiElem.append('<li class="article">' +
                    '<a href="' + urls[i] + '">' + titles[i] + '</a></li>');
            };
            clearTimeout(wikiRequestTimeout);
        }
    });

    return false;
};

$('#form-container').submit(loadData);
