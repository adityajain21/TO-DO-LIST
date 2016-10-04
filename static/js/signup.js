$(function() {
    $('#btnSignUp').click(function() {
 
        $.ajax({
            url: '/signup_check',
            data: $('form').serialize(),
            type: 'POST',
            success: function(response) {
                console.log(response);
            },
            error: function(error) {
                console.log(error);
            }
        });
    });
});