$(document).ready(function () {
  var $treats = $('#treat-display');
  console.log($treats);

  // GET /treats
  function getTreats() {
    $ajax({
      method: 'GET',
      url: '/treats',
    })
    .done(function (treatArray) {
      $.each(treatArray, function (index, treat) {
        appendTreat(treat);
      });
    });
  }

  // GET /treats?q=thing

  // POST /treats

  // PUT /treats/1

  // DELETE /treats/1

  function appendTreat(treat) {

    // treat-display -> treat row -> treat
    var treatCount = $treats.children().children().length;

    if (treatCount % 2 === 0) {
      // add a treat row
      $treats.append('<div class="treat row"></div>');
    }

    $('treat-row:last-of-type').append('<div class="six columns">'
                            + '<div class="image-wrap">'
                            + '<img src="' + treat.pic + '" class="u-max-full-width" />'
                            + '</div>'
                            + '<h3>' + treat.name + '</h3>'
                            + '<p>' + treat.description + '</p>'
                            + '</div>');
  }
});
