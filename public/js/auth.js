$(function() {
// register
    $('.register-btn').on('click', function(e) {
        e.preventDefault();
        var data = {
            nick: $('#register-nick').val(),
            email: $('#register-email').val(),
            password: $('#register-password').val(),
            passwordConfirm: $('#register-password-confirm').val()
        };

        $('input').on('focus', function() {
            $('p.alert.alert-danger').remove();
            $('input').removeClass('is-invalid');
        });
        
        // otpravka na server
        $.ajax({
            type: "POST",
            data: JSON.stringify(data),
            contentType: 'application/json',
            url: '/api/auth/register'
        }).done(function(data) {
            if (!data.ok) {
                $('.register h2').after('<p class="alert alert-danger">' + data.error + '</p>');
                if (data.fields) {
                    data.fields.forEach(item => {
                        $('input[name=' + item + ']').addClass('is-invalid')
                    });
                }
            } else {

            }
        });
    })
});