$(document).ready(function () {
  var $treats = $('#treat-display');
  console.log($treats);

  /**---------- AJAX Functions ----------**/

  // GET /treats
  function getTreats() {
    $ajax({
      method: 'GET',
      url: '/treats',
    })
    .done(function (treatArray) {
      console.log('GET /treats returned ', treatArray);

      $.each(treatArray, function (index, treat) {
        appendTreat(treat);
      });
    });
  }

  // GET /treats?q=thing
  function searchTreats(query) {
    $ajax({
      method: 'GET',
      url: '/treats?q=' + query,
    })
    .done(function (treatArray) {
      console.log('GET /treats?q=', query, 'returned ', treatArray);

      $.each(treatArray, function (index, treat) {
        appendTreat(treat);
      });
    });
  }

  // POST /treats
  function postTreat(treat) {
    $ajax({
      method: 'POST',
      url: '/treats',
      data: treat,
    })
    .done(function () {
      console.log('POST /treats sent ', treat);

      getTreats();
    });
  }

  // PUT /treats/1
  function putTreat(treatId, treat) {
    $ajax({
      method: 'PUT',
      url: '/treats/' + treatId,
      data: treat,
    })
    .done(function () {
      console.log('PUT /treats/', treatId);

      getTreats();
    });
  }

  // DELETE /treats/1
  function deleteTreat(treatId) {
    $ajax({
      method: 'DELETE',
      url: '/treats/' + treatId,
    })
    .done(function () {
      console.log('DELETE /treats/', treatId);

      getTreats();
    });
  }
  /** ---------- DOM Functions ----------**/
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
