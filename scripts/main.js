// $(document).ready(function() {$('#genre').multiselect(
// 	{ 
// 		maxHeight: 150,  enableCaseInsensitiveFiltering: true, buttonClass: 'btn btn-link', 
// 		buttonText: function(options, select) 
// 					{
// 		                if (options.length === 0) {
// 		                    return '';
// 		                }
// 		                else if (options.length > 2) {
// 		                    return options.length + ' selected';
// 		                }
// 		                 else {
// 		                     var labels = [];
// 		                     options.each(function() {
// 		                         if ($(this).attr('label') !== undefined) {
// 		                             labels.push($(this).attr('label'));
// 		                         }
// 		                         else {
// 		                             labels.push($(this).html());
// 		                         }
// 		                     });
// 		                     return labels.join(', ') + ' ';
// 		                 }
// 		            }
		
// 	});
// });

// $("#username").focus();
// searchQuery = document.getElementById('username')
// genre_id = document.getElementById('genre')
// var language = {}
// MakePlaylist = document.getElementById('makePlaylist')
var mxmAPI_base = 'https://api.musixmatch.com/ws/1.1/'
var apiKey = 'd8951a826384c648324e206c942b5cce'
var tagAPI_base = 'http://glacial-hollows-8890.herokuapp.com/lyrics_analysis/v1.0'
var chordAPI_base = 'http://ec2-54-194-213-147.eu-west-1.compute.amazonaws.com/chord_analysis/v1.0/chords?trackID='//'http://ec2-54-194-130-174.eu-west-1.compute.amazonaws.com/chord_analysis/v1.0/chords?trackID='
var chordAPIUrl = 'http://ec2-54-194-213-147.eu-west-1.compute.amazonaws.com/media' //'http://ec2-54-194-130-174.eu-west-1.compute.amazonaws.com/media'
var mxmAPI_base_new = 'http://ec2-54-165-48-238.compute-1.amazonaws.com:8080/ws/1.1/macro.subtitles.get?app_id=musixmatch-rd-v1.0&usertoken=74b62c7030d940b2c0e9d3cc97a42f4bc531e9501479cd9e' //'http://apic.musixmatch.com/ws/1.1/'
var echonest_base = 'http://developer.echonest.com/api/v4/track/profile?api_key='
var echonest_song_base = 'http://developer.echonest.com/api/v4/song/profile?api_key='
var echonest_search_base = 'http://developer.echonest.com/api/v4/song/search?api_key='
var echonest_api_key = 'UUZDTANXIMNN98YW6'
var musicbrainz_base = 'http://musicbrainz.org/ws/2/recording/?query=isrc:'
var spotify_auth_base = 'https://accounts.spotify.com/authorize'
var spotify_client_ID = '14fb55b1df36454793caa07ab8abefe6'
var spotify_client_secret = 'cf72548f86e8493d8aa38cc881a63ee4'
var duolingoAPI_base = 'http://ec2-54-77-238-210.eu-west-1.compute.amazonaws.com/duolingoHack/v1.0/'

var have_valid_playlist = false
var username = ''

var flag_channel_base = 'http://ec2-23-20-32-78.compute-1.amazonaws.com/CatchAViral/v1/flagChannel?'
var add_channel_base = 'http://ec2-23-20-32-78.compute-1.amazonaws.com/CatchAViral/v1/addChannel?'
var tag_video_base = 'http://ec2-23-20-32-78.compute-1.amazonaws.com/CatchAViral/v1/flagChannel?'
var flag_video_base = 'http://ec2-23-20-32-78.compute-1.amazonaws.com/CatchAViral/v1/flagVideo?'
// var flag_channel_base = 'http://ec2-23-20-32-78.compute-1.amazonaws.com/CatchAViral/v1/flagChannel?'
//http://ec2-23-20-32-78.compute-1.amazonaws.com/CatchAViral/v1/flagChannel?id=0000&link=kkk

function getJSON(url) 
{
	var get_promise = $.getJSON(url);
	//console.log(url)
	return get_promise.then(JSON.stringify).then(JSON.parse);
}

function addButtonListener()
{
	$(".flag_video_button").click(function(){
		// console.log($('#'+this.id).parent()[0].id)
		// console.log(this.getAttribute('data-videoId'))

		videoId = this.getAttribute('data-videoId')
		url = flag_video_base + 'id=' + videoId
		// console.log(url)
		getJSON(url).then(function(response)
		{
			console.log(response)
			alert('Video flagged. It will be used to train a model to automatically detect if a new video is a music release.')
		})
	})

	$(".flag_channel_button").click(function(){
		// console.log($('#'+this.id).parent()[0].id)
		// console.log(this.getAttribute('data-channelFullName'))
		// console.log(this.getAttribute('data-artistId'))
		link = this.getAttribute('data-channelFullName') 
		artistId = this.getAttribute('data-artistId')

		url = flag_channel_base + 'id=' + artistId + '&link=' + link
		// console.log(url) 
		getJSON(url).then(function(response)
		{
			console.log(response)
			alert('Channel removed. It will not be tracked for latest music releases.')
		})

	})
}

function showVideoThumbNails()
{
	var videos = document.getElementsByClassName("youtube"); 
	 
	for (var i=0; i<videos.length; i++) {
	  
	  var youtube = videos[i];
	  
	  // Based on the YouTube ID, we can easily find the thumbnail image
	  var img = document.createElement("img");
	  img.setAttribute("src", "http://i.ytimg.com/vi/" 
	                          + youtube.id + "/hqdefault.jpg");
	  img.setAttribute("class", "thumb");
	  
	 
	  // Overlay the Play icon to make it look like a video player
	  var circle = document.createElement("div");
	  circle.setAttribute("class","circle");  
	  
	  youtube.appendChild(img);
	  // youtube.appendChild(circle);
	  
	  // Attach an onclick event to the YouTube Thumbnail
	  youtube.onclick = function() {
	 
	    // Create an iFrame with autoplay set to true
	    var iframe = document.createElement("iframe");
	    iframe.setAttribute("src",
	          "https://www.youtube.com/embed/" + this.id 
	        + "?autoplay=1&autohide=1&border=0&wmode=opaque&enablejsapi=1"); 
	    
	    // The height and width of the iFrame should be the same as parent
	    iframe.style.width  = this.style.width;
	    iframe.style.height = this.style.height;
	       
	    // Replace the YouTube thumbnail with YouTube HTML5 Player
	    this.parentNode.replaceChild(iframe, this);
	 
	  }; 
	}
}

function addVideoTable(selected_date)
{
	videos = Update[selected_date]

	for (var j = 0; j < videos.length; j++) 
	// for (var j = 0; j < 20; j++) 
	{
		// videos[j]
		// $("#videoList").append("<li><iframe id='ytplayer' type='text/html' width='560' height='420' src='http://www.youtube.com/embed/" + videos[j]['videoId']+"' frameborder='0'/></li>")
		// $("#videoList").append("<li><div class='youtube' id='" +videos[j]['videoId']+"' style='width:480px; height: 360px;'> </div><p>" +videos[j]['title']+"</p><p>" +videos[j]['description'].substring(0,20)+  " ...</p></li>")
		// $("#videoList").append("<li ><div class='youtube' id='" +videos[j]['videoId']+"' style='width:480px; height: 360px;'> </div> <div class = 'video_description' style='width:480px;'><p>" +videos[j]['title']+"</p><p>" +videos[j]['description'].slice(0,200)+'...'+  "</p><p>" +"Views: "+videos[j]['view_count'] +"</p><p>" + "Release-date: "+ dates[i] +"</p><p>" +"Subscribers: " + videos[j]['subscribers'] + "</p>"+ "<button type='button' class = 'flag_video_button' data-videoId = '" + videos[j]['videoId'] + "'>Flag video</button>"+ "<button type='button' class = 'flag_channel_button' data-channelFullName = '" + videos[j]['channelFull'] + "' data-artistId = '" + videos[j]['artistId'] + "' >Flag channel</button> </div>" +"</li>")
		$("#" + selected_date).append("<li ><div class='youtube' id='" +videos[j]['videoId']+"' style='width:480px; height: 360px;'> </div> <div class = 'video_description' style='width:480px;'><p>" +videos[j]['title']+"</p><p>" +videos[j]['description'].slice(0,200)+'...'+  "</p><p>" +"Views: "+videos[j]['view_count'] +"</p><p>" + "Release-date: "+ selected_date+"</p><p>" +"Channel subscribers: " + videos[j]['subscribers'] + "</p>"+ "<button type='button' class = 'flag_video_button' data-videoId = '" + videos[j]['videoId'] + "'>Flag video</button>"+ "<button type='button' class = 'flag_channel_button' data-channelFullName = '" + videos[j]['channelFull'] + "' data-artistId = '" + videos[j]['artistId'] + "' >Irrelevant channel</button><button type='button' class = 'missing_lyrics_button' data-videoId ='" + videos[j]['artistId'] + "' > Missing lyrics queue </button> </div>" +"</li>")
	}
	showVideoThumbNails()
	addButtonListener()
}

$(document).ready(function(){
	// $("#videoList").append('<li><iframe id="ytplayer" type="text/html" width="562" height="338" src="http://www.youtube.com/embed/H8ELOfZoOQQ" frameborder="0"/></li>')
	// $("#videoList").append('<li><iframe id="ytplayer" type="text/html" width="562" height="338" src="http://www.youtube.com/embed/H8ELOfZoOQQ" frameborder="0"/></li>')
	dates = Object.keys(Update)
	// console.log(dates)
	today = dates[0]
	for (var i = 0; i < dates.length; i++) 
	{
		// console.log(dates[i])
		videos = Update[dates[i]]
		// $("#videoList").append("<p class='date_container'><b> Latest releases for " + dates[i]+ " </b></p>")
		if (i == 0){
			$("#day_selector").append("<option value='"+dates[i]+ "'>" +"New music released today"+"</option>")
		}
		if (i == 1){
			$("#day_selector").append("<option value='"+dates[i]+ "'>" +"New music released yesterday"+"</option>")
		}
		if (i!=0 && i!=1){
			$("#day_selector").append("<option value='"+dates[i]+ "'>" +"New music released "+ dates[i]+"</option>")	
		}
		
		$("#visualizations").append("<ul id ='" + dates[i] +"' style = 'display:none'></ul>")
		
	}

	$("#" + today).css("display","inline-block")
	addVideoTable(today)

	$("#day_selector").change(function(){

		table_name = document.getElementById(this.id)[document.getElementById(this.id).selectedIndex].value
		// console.log(table_name)
		// $("#visualizations" )[0].innerHTML = ''
		// console.log($('#' + table_name)[0].innerHTML)
		// $("#visualizations" ).append($('#' + table_name)[0].innerHTML)
		for (var i = 0; i < dates.length; i++) {
			$("#" + dates[i]).css("display","none")
			$("#" + dates[i])[0].innerHTML = ''
		}
		$("#" + table_name).css("display","inline-block")
		addVideoTable(table_name)
	})

	

	$("#add_channel_button").click(function(){
		// console.log($('#'+this.id).parent()[0].id)
		// console.log(this.getAttribute('data-videoId'))
		link = $("#add_channel_link")[0].value
		artistId = $("#add_channel_artistId")[0].value
		
		console.log(link)
		console.log(artistId)

		url = add_channel_base + 'id=' + artistId + '&link=' + link
		// console.log(url)
		getJSON(url).then(function(response)
		{
			console.log(response)
			alert('Channel added. It will now be tracked for latest music releases.')
		})
	})

	
})


// document.getElementById("genre").innerHTML = ''
// genreList = new Array()
// for (var i = 0; i < genres["music_genre_list"].length; i++) 
// {
// 	// k = {}
// 	// k['value'] = genres["music_genre_list"][i]["music_genre"]["music_genre_id"]
// 	// k['label'] = genres["music_genre_list"][i]["music_genre"]["music_genre_name"]
// 	// document.getElementById("genre").innerHTML += "<option value=" +genres["music_genre_list"][i]["music_genre"]["music_genre_id"] + ">" + genres["music_genre_list"][i]["music_genre"]["music_genre_name"] + "</option>"						
// 	// genreList.push(k)
// };
// nlform = new NLForm( document.getElementById( 'nl-form' ) )
// console.log(genreList)
// console.log($("#genre"))
// $("#genre").autocomplete({source: genreList, messages: { noResults: '',  results: function() {}}})

function getJSON(url) 
{
	var get_promise = $.getJSON(url);
	//console.log(url)
	return get_promise.then(JSON.stringify).then(JSON.parse);
}

// function getLyrics(track) 
// {
// 	var lyrics_URI = mxmAPI_base + 'track.lyrics.get?apikey=b463ed1270b71853d56be5bd776a9b4a&track_id=' + track.track.track_id + '&format=jsonp&callback=?'
// 	lyrics_URI = encodeURI(lyrics_URI)
// 	// console.log(lyrics_URI)
// 	//var get_promise = $.getJSON(lyrics_URI);
// 	//console.log(url)
	
// 	// console.log(trackWithLyrics)
// 	return new Promise(function(resolve,reject)
// 	{
// 		getJSON(lyrics_URI).then(function(response)
// 		{
// 			// console.log(response)
// 			trackWithLyrics = {}
// 			trackWithLyrics['lyrics'] = response
// 			trackWithLyrics['track'] = track.track
// 			resolve(trackWithLyrics)
// 		});
// 	})
// 		//console.log(url)
// 		//return getJSON(url);
// }




// $("#username").keyup(function(event) {
//     if (event.keyCode == 13) {
//     	// myStopFunction();
    	
//         // $("#status").text("Please select language for songs in playlist")
//         // document.getElementById("progress").style.display = "none"
//     }
// });

// MakePlaylist.onclick = function(e){
	
// 	$('#SpotifyWidget').empty()
// 	document.getElementById("SpotifySave").style.display = "none"
// 	document.getElementById("makePlaylist").style.display = "none"
// 	document.getElementById("status").style.display = "inline-block"
// 	$("#status").text("Searching your vocabulary in this language")
// 	getUsernameAndLanguage().then(function()
// 	{
// 		getWordsAndMakePlaylist();	
// 	});
	
// }

// SpotifySave.onclick = function(e){
//   loginWithSpotify()
// }


// GetImages.onclick = function(e){
// 	getTagsAndImages()
// }

// $(window).blur(function(e){
//     //$('#result').text('Clicked out of the window or on the iframe');
//     console.log('Clicked out of the window or on the iframe')
// })
// SpotifySave.onclick = function(e){
//   loginWithSpotify()
// }