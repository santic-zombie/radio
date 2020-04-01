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
      MPDsong = array[1];
      MPDfile = array[2].replace(/^vk_kun\//,'').replace(/\.mp3/,'');

      if (MPDartist == '' && MPDCurr != MPDfile) {
        MPDartist = MPDfile.replace(/\s-.*/,'').replace(/^\s*/,'').replace(/\s*$/,'');
        MPDsong = MPDfile.replace(/^.*\s-/,'').replace(/^\s*/,'').replace(/\s*$/,'');
        getLastFM_url(MPDartist, MPDsong);
      } else if (MPDCurr != MPDfile) {
          getLastFM_url(MPDartist, MPDsong);
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

function getLastFM_url(FMartist, FMsong)
{
  lastfm.artist.getInfo({artist: FMartist}, {success: function(data){
    console.log(data.artist.url);
    // формируем ссылку на артиста в LastFM
    document.querySelector('a[name="lastFMlink"]').setAttribute('href', data.artist.url);
    // выводим название артиста и трека ссылкой
    $('#title').html(FMartist+' - '+FMsong);
    }, error: function(code, message){
    console.log('Error #'+code+': '+message);}
  });
}
