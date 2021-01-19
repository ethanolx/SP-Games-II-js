$(() => {
    setPageMode();
    $('#register-section').hide();
    $('#sign-up').on('click', toggleLogin);
    $('#sign-in').on('click', toggleLogin);
    $('#register').on('click', register);
    $('#login').on('click', login);
    watchEnter();
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
    return validatePasswordMatch() && validatePasswordStrength();
}

function validatePasswordStrength() {
    const draftPwd = $('#new-password');
    for (let req of [/[\W\S_]/, /[0-9]/, /[A-Z]/, /[a-z]/]) {
        if (!req.test(draftPwd.val().toString())) {
            return false;
        }
    }
    return true;
}

function validatePasswordMatch() {
    const draftPwd = $('#new-password').val();
    const confirmPwd = $('#confirm-password').val();
    return draftPwd === confirmPwd;
}

function register(event) {
    event.preventDefault();
    // @ts-ignore
    $('#register-form')[0].reportValidity();
    if (validateRegistration()) {
        const USERNAME = $('#new-username').val();
        const PASSWORD = $('#new-password').val();
        const EMAIL = $('#new-email').val();

        $.ajax({
            url: 'http://localhost:5000/users',
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify({
                username: USERNAME,
                email: EMAIL,
                password: PASSWORD,
                type: 'Customer',
                profile_pic_url: null
            }),
            dataType: 'json',
            success: (data, textStatus, xhr) => {
                window.localStorage.setItem('token', data['token']);
                window.localStorage.setItem('user', JSON.stringify(data['user']));
                window.location.assign('/');
                alert('You have successfully registered for SP Games!');
            },
            error: (xhr, textStatus, err) => {
                alert('Invalid username or password provided!')
                console.log(err);
            }
        });
    }
    else {
        alert('Bad');
    }
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
            window.localStorage.setItem('user', JSON.stringify(data['user']));
            window.location.assign('/');
        },
        error: (xhr, textStatus, err) => {
            console.log('err');
        }
    });
}

function watchEnter() {
    $('.form-group').on('keypress', (event) => {
        if (event.which === 13) {
            if (window.sessionStorage.getItem('mode') === 'sign-in') {
                $('#login').trigger('click');
            }
            else {
                $('#register').trigger('click');
            }
        }
    });
}