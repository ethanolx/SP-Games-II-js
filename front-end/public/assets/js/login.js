$(() => {
    setPageMode();
    $('#register-section').hide();
    $('#sign-up').on('click', toggleLogin);
    $('#sign-in').on('click', toggleLogin);
    $('#register').on('click', register);
    $('#login').on('click', login);
});

function setPageMode() {
    window.sessionStorage.setItem('mode', 'sign-in');
}

function toggleLogin() {
    if (window.sessionStorage.getItem('mode') === 'sign-in') {
        $('#sign-up').text('Sign In').attr('id', 'sign-in');
        window.sessionStorage.setItem('mode', 'sign-up');
    }
    else {
        $('#sign-in').text('Sign Up').attr('id', 'sign-up');
        window.sessionStorage.setItem('mode', 'sign-in');
    }
    $('#login-section').toggle();
    $('#register-section').toggle();
}

function validateRegistration() {

}

function register() {
    const USERNAME = $('#new-username').val();
    const PASSWORD = $('#new-password').val();
    const EMAIL = $('#new-email').val();

    $.ajax({
        url: 'http://localhost:5000/user',
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
    });
}

function login() {
    const USERNAME_OR_EMAIL = $('#username').val();
    const PASSWORD = $('#password').val();
    $.ajax({
        url: 'http://localhost:5000/user/login',
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify({ username: USERNAME_OR_EMAIL, password: PASSWORD }),
        dataType: 'json',
        success: (data, textStatus, xhr) => {
            window.localStorage.setItem('token', data['token']);
            window.localStorage.setItem('user', data['user']);
            window.location.assign('/');
        },
        error: (xhr, textStatus, err) => {
            console.log('er');
        }
    });
}