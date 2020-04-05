var stream_url = 'http://stream.santic-zombie.ru';

var audio = new Audio(stream_url);

audio.volume = 0.01;

var play = document.getElementById('play');
play.addEventListener('click', function() {
  $("#PlayStat").text("Now playing");
  audio.play();
  }, false);

var pause = document.getElementById('pause');
pause.addEventListener('click', function() {
  $("#PlayStat").text("Paused");
  audio.pause();
  }, false);

$("#volume").mousemove(function(){
  audio.volume = parseFloat(this.value / 10);
  });

var button = document.getElementById('buff');
button.addEventListener('click', function () {

  var MsgText = $('<div id="message-success"><p>Trackname copied to clipboard</p></div>'),
      MsgData = $('#jGrowl');
  MsgData.html(MsgText).fadeIn();
  setTimeout(function() {MsgData.fadeOut();}, 2000);

  //нашли наш контейнер
  var ta = document.getElementById('trackname');
  //производим его выделение
  var range = document.createRange();
  range.selectNode(ta);
  window.getSelection().addRange(range);
  //пытаемся скопировать текст в буфер обмена
  try {
    document.execCommand('copy');
  } catch(err) {
    console.log('Can`t copy, boss');
  }
  //очистим выделение текста, чтобы пользователь "не парился"
  window.getSelection().removeAllRanges();
  });

//audio.muted = true;
