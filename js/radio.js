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

      // .replace - удаление пробелов в начале и конце строки
      MPDartist = array[0];
      MPDsong   = array[1];
      MPDfile   = array[2].replace(/^vk_kun\//,'').replace(/\.mp3/,'');

      if (MPDartist == '' && MPDCurr != MPDfile) {
        MPDartist = MPDfile.replace(/\s-.*/,'').replace(/^\s*/,'').replace(/\s*$/,'');
        MPDsong = MPDfile.replace(/^.*\s-/,'').replace(/^\s*/,'').replace(/\s*$/,'');
        getArtistURL(MPDartist);
        $("#trackname span").text(MPDartist+" - "+MPDsong);
      } else if (MPDCurr != MPDfile) {
          getArtistURL(MPDartist);
          $("#trackname span").text(MPDartist+" - "+MPDsong);

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
