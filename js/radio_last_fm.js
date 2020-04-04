var lastfm = new LastFM({
  apiKey    : '59ab8307ec00a5ec90574ac91885798e',
  apiSecret : 'e09bec215fdc3100ff998167e5b401f8',
});

var MPDartist, MPDsong, MPDfile, MPDCurr;
MPDartist = MPDsong = MPDfile = MPDCurr = 'empty';

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
      // вывод в консоль информации о файле
      /*
      for(i in array) {
        console.log(array[i]);} */

      // .replace - удаление пробелов в начале и конце строки
      MPDartist = array[0];
      MPDsong   = array[1];
      MPDfile   = array[2].replace(/^vk_kun\//,'').replace(/\.mp3/,'');
/*
      urlArtist = getArtistURL(MPDartist);
      console.log(urlArtist);
      urlSong = getSongURL(MPDartist, MPDsong);
      console.log(urlSong);
*/
      if (MPDartist == '' && MPDCurr != MPDfile) {
        MPDartist = MPDfile.replace(/\s-.*/,'').replace(/^\s*/,'').replace(/\s*$/,'');
        MPDsong = MPDfile.replace(/^.*\s-/,'').replace(/^\s*/,'').replace(/\s*$/,'');
        getArtistURL(MPDartist);
        getSongURL(MPDartist, MPDsong);
        //getLastFM_info(MPDartist, MPDsong);
      } else if (MPDCurr != MPDfile) {
          getArtistURL(MPDartist);
          getSongURL(MPDartist, MPDsong);
          //getLastFM_info(MPDartist, MPDsong);
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

/*
function getLastFM_info(FMartist, FMsong)
{
  lastfm.artist.getInfo({artist: FMartist}, {success: function(data){
    //console.log(data.artist.url);
    // формируем ссылку на артиста в LastFM
    document.querySelector('form[name="artistURL"]').setAttribute('action', data.artist.url);
    // выводим название артиста
    $("#artistName").text(FMartist);
    }, error: function(code, message){
    console.log('Error #'+code+': '+message);}
  });

  lastfm.track.getInfo({track: FMsong, artist: FMartist}, {success: function(data){
    //console.log(data.track.url);
    // формируем ссылку на артиста в LastFM
    document.querySelector('form[name="songURL"]').setAttribute('action', data.track.url);
    // выводим название трека
    $("#songName").text(FMsong);
    }, error: function(code, message){
    console.log('Error #'+code+': '+message);}
  });

}
*/

// Процедура для получения ссылки на артиста в last.fm
function getArtistURL(MPDartist)
{
  $("#artistName").text(MPDartist);
  MPDartist = encodeURI("https://www.last.fm/music/"+MPDartist.replace(/\s+/g,'+'));
  document.querySelector('form[name="artistURL"]').setAttribute('action', MPDartist);
  console.log(MPDartist)
  //return encodeURI(MPDartist);
}

// Процедура для получения ссылки на песню в last.fm
function getSongURL(MPDartist, MPDsong)
{
  $("#songName").text(MPDsong);
  MPDartist = MPDartist.replace(/\s+/g,'+');
  MPDsong = encodeURI("https://www.last.fm/music/"+MPDartist+"/_/"+MPDsong.replace(/\s+/g,'+'));
  document.querySelector('form[name="songURL"]').setAttribute('action', MPDsong);
  console.log(MPDsong)
  //return encodeURI(MPDsong);
}
