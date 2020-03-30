/* Create a cache object */
//var cache = new LastFMCache();

/* Create a LastFM object */
var lastfm = new LastFM({
  apiKey    : '59ab8307ec00a5ec90574ac91885798e',
  apiSecret : 'e09bec215fdc3100ff998167e5b401f8',
//  cache     : cache
});

/* Load some artist info. */
/*
lastfm.artist.getInfo({artist: 'Boris'}, {success: function(data){
  $('#curr_artist').html(
	$('#lastfmTemplateArtistInfo').render(data.artist));
}, error: function(code, message){
  alert('Error #'+code+': '+message);
}});
*/

lastfm.artist.getInfo({artist: 'Boris'}, {success: function(data){
  alert(data.artist.url)
}, error: function(code, message){
  alert('Error #'+code+': '+message);
}});
