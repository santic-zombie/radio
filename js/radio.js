function show()
{
  $.ajax({
    url: '../trackname.php',
    cache: false,
    success: function(html){
      $('#title').html(html);
    }
  });
  $.ajax({
    url: '../online.php',
    cache: false,
    success: function(html){
      $('#listeners').html(html);
    }
  });
}

$(document).ready(
  () => {
    show();
    setInterval(show, 5000);
  }
);
