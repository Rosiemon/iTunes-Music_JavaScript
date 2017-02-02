function Search() {
	// $.ajax({
	// 	type: 'GET',
 //        dataType: 'json',
 //        url: 'https://itunes.apple.com/search?term=' + searchConvert($('#searchInput').val()) + '&media=music'+'&limit=20'+"&callback=?",       
 //        success: function(items)

		var encodedSearch = '';
		var searchTerm = {
			term: jQuery('#search-keyword').val(),
		};
		$.each(searchTerm, function(key, value){
			encodedSearch += encodeURIComponent(key) + '=' + encodeURIComponent(value) + '&';
		})
		encodedSearch = encodedSearch.substr(0, encodedSearch.length);
		var url = 'http://ax.itunes.apple.com/WebObjects/MZStoreServices.woa/wa/wsSearch?' + encodedSearch + 'country=US&media=music&entity=musicTrack&callback=SearchResults';
		var html = '<script src="' + url + '"><\/script>';
		jQuery('head').append(html);
	}


function SearchResults(arg)
	{
		var results = arg.results;
		var htmlDisplayResults = '';

		$.each(results, function(key, value){
			htmlDisplayResults += '<li class="htmlDisplayResults col-md-3">';
			htmlDisplayResults += '<a href="' + value.trackViewUrl + '"target="_blank"><img src="' + value.artworkUrl100 + '"></a>'+ '<br>';
			htmlDisplayResults += '<audio controls><source src="' + value.previewUrl + '"type="audio/mp4">Preview</audio>';
			htmlDisplayResults += '<span style="color:white">' +'<p>ARTIST: ' + '<a href="' + value.artistViewUrl + '" target="_blank">' + value.artistName + '</p></a><br>';
			htmlDisplayResults += '<span style="color:white">' + '<p>GENRE: ' + value.primaryGenreName + '</span></p><br>';
			htmlDisplayResults += '</li>';
		})
		jQuery('#itunes-results').html(htmlDisplayResults);
	}