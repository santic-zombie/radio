var MPDartist, MPDsong, MPDfile, MPDCurr, YouURL;
MPDartist = MPDsong = MPDfile = MPDCurr = YouURL = 'empty';

function show()
{

  let xmlHttpRequest = function() {
    return new Promise(function(resolve, reject) {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', '../trackname');
      var temp = 'empty';
      xhr.onload = function (e) {
        if (xhr.readyState == 4 && xhr.status == 200) {
            resolve(xhr.responseText);
        }
      };
      xhr.send();
    });
  };

  xmlHttpRequest()
    .then(function(temp){
      // Получение информации из файла
      var array = temp.toString().split("\n");

      MPDartist = array[0];
      MPDsong   = array[1];
      MPDfile   = array[2].replace(/^vk_kun\//,'').replace(/\.mp3/,'');

      if (MPDartist == '' && MPDCurr != MPDfile) {
        MPDartist = MPDfile.replace(/\s-.*/,'').replace(/^\s*/,'').replace(/\s*$/,'');
        MPDsong = MPDfile.replace(/^.*\s-/,'').replace(/^\s*/,'').replace(/\s*$/,'');
        getArtistURL(MPDartist);
        $("#trackname span").text(MPDartist+" - "+MPDsong);
        getYouTubeRequest(MPDfile);
        addText(MPDfile);
      } else if (MPDCurr != MPDfile) {
          getArtistURL(MPDartist);
          $("#trackname span").text(MPDartist+" - "+MPDsong);
          getYouTubeRequest(MPDfile);
          addText(MPDfile);
        }
      MPDCurr = MPDfile;
    });
}

$(document).ready(
  () => {
    show();
    setInterval(show, 5000);
  }
);

// Процедура для получения ссылки на артиста в last.fm
function getArtistURL(MPDartist)
{
  $("#artistName").text(MPDartist);
  MPDartist = encodeURI("https://www.last.fm/music/"+MPDartist.replace(/\s+/g,'+'));
  document.querySelector('form[name="artistURL"]').setAttribute('action', MPDartist);
  console.log(MPDartist)
}

// Процедура для получения ссылки на песню в last.fm
function getSongURL(MPDartist, MPDsong)
{
  $("#songName span").text(MPDsong);
  MPDartist = MPDartist.replace(/\s+/g,'+');
  MPDsong = encodeURI("https://www.last.fm/music/"+MPDartist+"/_/"+MPDsong.replace(/\s+/g,'+'));
  document.querySelector('form[name="songURL"]').setAttribute('action', MPDsong);
  console.log(MPDsong)
}

// Функция для поиска по YouTube
function getYouTubeRequest(MPDfile) {
    var url = 'https://www.googleapis.com/youtube/v3/search';
    var params = {
        part: 'id',
        part: 'snippet',
        key: 'AIzaSyCfkMY2Nk3QwEh1Tjdqm-8GueBqOS5jgeI',
        q: MPDfile
    };
    // $.getJSON(url, params, showResults);
    $.getJSON(url, params, function() {
      console.log( "success" );
      })
      .done(function(results) {
        // showResults;
        console.log( "second success" );
        var entries = results.items;
        thumb = entries[0].snippet.thumbnails.medium.url;
        YouURL = entries[0].id.videoId;
        document.querySelector('img[name="YouTubeThumb"]').setAttribute('src', thumb);
        document.querySelector('a[name="YouTubeURL"]').setAttribute('href', "https://www.youtube.com/watch?v="+YouURL);
        console.log("https://www.youtube.com/watch?v="+YouURL);
      })
      .fail(function() {
        console.log( "error" );
        document.querySelector('img[name="YouTubeThumb"]').setAttribute('src', '/pic/error.jpg');
        document.querySelector('a[name="YouTubeURL"]').setAttribute('href', "https://www.youtube.com/watch?v=empty");
      });

}

// Процедура для формирования ссылки и картинки на Youtube
// function showResults(results) {
//   var entries = results.items;
//   thumb = entries[0].snippet.thumbnails.medium.url;
//   YouURL = entries[0].id.videoId;
//   document.querySelector('img[name="YouTubeThumb"]').setAttribute('src', thumb);
//   document.querySelector('a[name="YouTubeURL"]').setAttribute('href', "https://www.youtube.com/watch?v="+YouURL);
//   console.log("https://www.youtube.com/watch?v="+YouURL);
// }

// Процедура формирования списка проигрынных треков
function addText(MPDfile) {
  let last_track = document.createElement('div');
  last_track.className = "list_el";
  last_track.innerHTML = MPDfile;
  track_list.prepend(last_track);
}
