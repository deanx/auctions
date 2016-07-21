$('.bid-button').on('click', function() {
  let bid = ($(this).prev().val());
  let item = ($(this).next().val());


  $.ajax({
    url: 'http://localhost:3000?item=' + item + "&bid=" + bid,
    type: 'POST',
    contentType: 'application/json'}).done(function(data) {
      let msg = '';
      let success = () => {
        msg = 'Bid accepted! Congratulations!'; location.reload();
      }
      data === true ? success() : msg = 'Bid rejected. Try again!';
      alert(msg);
    });

});
