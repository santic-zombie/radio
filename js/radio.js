function show()
{

  var lastfm = new LastFM({
    apiKey    : '59ab8307ec00a5ec90574ac91885798e',
    apiSecret : 'e09bec215fdc3100ff998167e5b401f8',
  });

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
      var MPDartist, MPDsong, MPDfile;
      MPDartist = MPDsong = MPDfile = 'empty';
      var array = temp.toString().split("\n");
      // вывод в консоль информации о файле
      for(i in array) {
        console.log(array[i]);}
      // .replace - удаление пробелов в начале и конце строки
      MPDartist = array[0].replace(/^\s*/,'').replace(/\s*$/,'');
      MPDsong = array[1];
      MPDfile = array[2].replace(/^vk_kun\//,'').replace(/\.mp3/,'');
      console.log(MPDfile);

      if (MPDartist !== null) {
        lastfm.artist.getInfo({artist: MPDartist}, {success: function(data){
          var artistLink = data.artist.url;
          // формируем ссылку на артиста в LastFM
          document.querySelector('a[name="lastFMlink"]').setAttribute('href', artistLink);
          // выводим название артиста и трека ссылкой
          $('#title').html(MPDartist+' - '+MPDsong);
        }, error: function(code, message){
          console.log('Error #'+code+': '+message);
          MPDartist = null;
        }});}
        else {
            //document.querySelector('a[name="lastFMlink"]').setAttribute('href', null);
            //$('#title').html(MPDfile);
            alert('WTF!?');}
    });

}

$(document).ready(
  () => {
    show();
    setInterval(show, 5000);
  }
);
