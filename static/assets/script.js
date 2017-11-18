var handler = StripeCheckout.configure({
  key: 'pk_test_HHalqsNZCY3AZfOURrIiSPlD',
  locale: 'auto',
  name: 'Lucky Dip Donating',
  description: '',
  currency: 'gbp',
  token: function(token) {

    var amount = $('select#value').val();
    amount = amount.substr(1);

    amount = parseFloat(amount);
    amount = amount * 100; // Needs to be an integer!


    $('input#stripeToken').val(token.id);
    $('input#stripeEmail').val(token.email);
    $('input#amount').val(amount);
    $('form').submit();
  }
});

$( document ).ready(function() {

  $( "#donateButton" ).click(function(e) {
  // $('#donateButton').on('click', function(e) {
    e.preventDefault();


    var amount = $('select#value').val();
    amount = amount.substr(1);

    amount = parseFloat(amount);
    amount = amount * 100; // Needs to be an integer!

      handler.open({
        amount: Math.round(amount)
      });

  });

  $(".not-complete").click(function(e) {
      e.preventDefault();
     $("#coming-soon").addClass("is-active");
  });

  $("button.close").click(function() {
     $("#coming-soon").removeClass("is-active");
  });
});
