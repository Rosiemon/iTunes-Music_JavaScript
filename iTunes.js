			
"use strict";

function Search()
	{
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

			htmlDisplayResults += '<div class="row" style="height: 200px;">';
								
			htmlDisplayResults += '<a href="' + value.trackViewUrl + '"target="_blank"><img style="margin-left: 100px; margin-right: 100px; margin-top: 9px; height: 175px;" align="left" src="' + value.artworkUrl100 + '"></a>';
			htmlDisplayResults += '<table>'
			
			htmlDisplayResults += '<col width="500">';
			htmlDisplayResults += '<col width="500">';

			htmlDisplayResults += '<td><span class="label"></span><a href="' + value.artistViewUrl + '" target="_blank">' + '<p>Artist: ' + value.artistName + '</p></a><br>';
			htmlDisplayResults += '<span class="label"></span>' + '<p>Genre: ' + value.primaryGenreName + '</p><br> </td>';
			
			htmlDisplayResults += '<td> <audio controls><source src="' + value.previewUrl + '" type="audio/mp4">Preview</audio></td>&nbsp;&nbsp; </td>';
			
			htmlDisplayResults += '</table>';
			htmlDisplayResults += '</div>';
			htmlDisplayResults += '</div><br><br>';
		})
		jQuery('#itunes-results').html(htmlDisplayResults);
	}