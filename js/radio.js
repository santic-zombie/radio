function show()
{
  $.ajax({
    url: '../trackname.php',
    cache: false,
    success: function(html){
      $('#title').html(html);
    }
  });
}

$(document).ready(function(){
  show();
  setInterval('show()',5000);
  });

function show1()
{
  $.ajax({
    url: '../online.php',
    cache: false,
    success: function(html){
      $('#listeners').html(html);
    }
  });
}

$(document).ready(function(){
  show1();
  setInterval('show1()',5000);
  });
