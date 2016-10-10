/** --- DO NOT MODIFY THIS FILE --- **/
$(document).ready(function () {

  /**---------- Event Handling ----------**/
  $('#searchButton').on('click', function (event) {
    event.preventDefault();

    var queryString = $('#search').val();

    searchTreats(queryString);
  });

  $('#modeToggle').on('click', function (event) {
    event.preventDefault();
    toggleView();
  });

  $('#treat-display').on('click', '.edit', function () {
    var $treat = $(this).closest('.individual-treat');
    var Treat = {
      id: $treat.data('id'),
      name: $.trim($treat.find('h3').text()),
      description: $.trim($treat.find('p').text()),
      pic: $treat.find('img').attr('src'),
    };

    displayEditModal(Treat);
  });

  $('#treat-display').on('click', '.delete', function (event) {
    var $treat = $(this).closest('.individual-treat');
    deleteTreat($treat.data('id'));
  });

  $('#modal-save').on('click', function (event) {
    event.preventDefault();

    $('#modal').hide();
    var id = $('#modal').data('id');
    var treat = {
      name: $('#treat-name').val(),
      description: $('#treat-description').val(),
      pic: $('#treat-url').val(),
    };

    putTreat(id, treat);
  });

  $('#modal-cancel').on('click', function (event) {
    event.preventDefault();
    $('#modal').hide();
  });
  /**---------- AJAX Functions ----------**/

  // GET /treats
  function getTreats() {
    $.ajax({
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
    $.ajax({
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
    $.ajax({
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
    $.ajax({
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
    $.ajax({
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

    // append a treat to the DOM and add data attributes
    // treat-display -> treat row -> treat
    var treatCount = $treats.children().children().length;

    if (treatCount % 2 === 0) {
      // add a treat row
      $treats.append('<div class="treat row"></div>');
    }

    var $treat = $('<div class="six columns individual-treat">' +
                  '<div class="image-wrap">' +
                  '<img src="' + treat.pic + '" class="u-max-full-width" />' +
                  '<div class="toggle row">' +
                  '<div class="six columns">' +
                  '<button class="edit u-full-width">Edit</button>' +
                  '</div>' +
                  '<div class="six columns">' +
                  '<button class="delete u-full-width">Delete</button>' +
                  '</div>' +
                  '</div>' +
                  '</div>' +
                  '<h3>' + treat.name + '</h3>' +
                  '<p>' + treat.description + '</p>' +
                  '</div>');

    $treat.data('id', treat.id);

    $('treat-row:last-of-type').append($treat);
  }

  // show/hide edit buttons
  function toggleView() {
    if ($('#modeToggle').text() == 'View') {
      // change button to Edit
      $('#modeToggle').text('Edit');
    } else {
      //change button to View
      $('#modeToggle').text('View');
    }

    $('.toggle').toggle();
  }

  function displayEditModal(treat) {
    $('#modal').show();

    // populate with data
    $('#treat-name').val(treat.name);
    $('#treat-description').val(treat.description);
    $('#treat-url').val(treat.pic);
    $('#modal').data('id', treat.id);
  }

});
