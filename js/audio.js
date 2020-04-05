var stream_url = 'http://stream.santic-zombie.ru';
var audio      = new Audio(stream_url);
audio.volume   = 0.05;

var play = document.getElementById('play');
play.addEventListener('click', function() {
  var   MsgText    = $('<div id="message-success"><p>Play</p></div>');
  PopUpMsg(MsgText);
  $("#PlayStat").text("Now playing");
  audio.play();
  }, false);

var pause = document.getElementById('pause');
pause.addEventListener('click', function() {
  var   MsgText    = $('<div id="message-success"><p>Pause</p></div>');
  PopUpMsg(MsgText);
  $("#PlayStat").text("Paused");
  audio.pause();
  }, false);

$("#volume").mousemove(function(){
  audio.volume = parseFloat(this.value / 10);
  });

var copyClipBoard = document.getElementById('buff');
copyClipBoard.addEventListener('click', function () {
  var   MsgText    = $('<div id="message-success"><p>Trackname copied to clipboard</p></div>');
  PopUpMsg(MsgText);
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

  var mute = document.getElementById('mute');
  mute.addEventListener('click', function() {
      $(this)
      .find("i")
      .toggleClass('fas fa-volume-up')
      .toggleClass('fas fa-volume-mute');
      if (audio.muted === false) {
        var   MsgText    = $('<div id="message-success"><p>Mute Sound</p></div>');
        PopUpMsg(MsgText);
        audio.muted = true;
      } else {
        var   MsgText    = $('<div id="message-success"><p>unmute Sound</p></div>');
        PopUpMsg(MsgText);
        audio.muted = false;
      }
    }, false);

function PopUpMsg(MsgText) {
  const MsgData    = $('#jGrowl');
  MsgData.html(MsgText).fadeIn();
  setTimeout(function() {MsgData.fadeOut();}, 2000);
}
