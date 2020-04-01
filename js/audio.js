var stream_url = 'http://stream.santic-zombie.ru';

var audio = new Audio(stream_url);

audio.volume = 0.01;

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

$("#volume").mousemove(function(){
  audio.volume = parseFloat(this.value / 10);
  });

//audio.muted = true;
