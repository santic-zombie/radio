var stream_url = 'http://stream.santic-zombie.ru';

var audio = new Audio(stream_url);

var play = document.getElementById('play');
play.addEventListener('click', function() {
  $("#myPlay").text("Now playing:");
  audio.play();
  }, false);

var pause = document.getElementById('pause');
pause.addEventListener('click', function() {
  $("#myPlay").text("Paused");
  audio.pause();
  }, false);

/*
audio.addEventListener("timeupdate", function() {
  var duration = document.getElementById('duration');
  var s = parseInt(audio.currentTime % 60);
  var m = parseInt((audio.currentTime / 60) % 60);
  var h = parseInt((audio.currentTime / 3600) % 60);
  if (s < 10) s = '0' + s;
  if (m < 10) m = '0' + m;
  if (h < 10) h = '0' + h;
  duration.innerHTML = h + ':' + m + ':' + s;
  }, false);
*/

$("#volume").mousemove(function(){
  audio.volume = parseFloat(this.value / 10);
  });

//audio.muted = true;
