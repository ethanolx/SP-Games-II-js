$(() => {
    // setPageMode();
    $('#register-section').hide();
    $('#sign-up').on('click', () => {
        toggleLogin2();
    });
    $('#sign-in').on('click', () => {
        toggleLogin2;
    });
    $('#register-form').on('submit', register);
    $('#login-form').on('submit', (event) => {
        event.preventDefault();
        login();
    });
    // watchEnter();
});

let MODE = 'sign-in';

// function setPageMode() {
//     MODE =
// }

function toggleLogin2() {
    if (MODE === 'sign-in') {
        $('#sign-up').text('Sign In').attr('id', 'sign-in');
        MODE = 'sign-up';
    }
    else {
        $('#sign-in').text('Sign Up').attr('id', 'sign-up');
        MODE = 'sign-in';
    }
    $('#login-section').toggle();
    $('#register-section').toggle();
}

function validateRegistration() {
    console.log(validatePasswordMatch(), validatePasswordStrength());
    return validatePasswordMatch() && validatePasswordStrength();
}

function validatePasswordStrength() {
    const draftPwd = $('#new-password');
    // for (let req of [/[`~@#\$%\^\&\*\(\)]/, /[0-9]/, /[A-Z]/, /[a-z]/]) {
    //     if (!req.test(draftPwd.val().toString())) {
    //         return false;
    //     }
    // }
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
    // $('#register-form')[0].reportValidity();
    if (validateRegistration()) {
        const USERNAME = $('#new-username').val();
        const PASSWORD = $('#new-password').val();
        const EMAIL = $('#new-email').val();

        const NEW_USER = {
            username: USERNAME,
            email: EMAIL,
            password: PASSWORD,
            type: 'Customer',
            profile_pic_url: null
        };
        fetch('http://localhost:5000/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(NEW_USER)
        })
            .then(res => res.json())
            .then(data => {
                const userid = data['userid'];
                login(USERNAME, PASSWORD);
            })
            .then(() => alert('You have successfully registered for SP Games!'));
        // .catch(ignore);
    }
    else {
        alert();
    }
}

function login(username = null, password = null) {
    const USERNAME_OR_EMAIL = username || $('#username').val();
    const PASSWORD = password || $('#password').val();
    const CREDENTIALS = {
        username: USERNAME_OR_EMAIL,
        password: PASSWORD
    };
    fetch('http://localhost:5000/user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(CREDENTIALS)
    })
        .then(res => {
            switch (res.status) {
                case 403:
                    throw new Error('Invalid username, email or password provided!');
            }
            return res.json();
        })
        .then(data => {
            const TOKEN = data['token'];
            localStorage.setItem('sp-games-token', TOKEN);
            history.pushState(null, null, '/');
            $(window).trigger('hashchange');
            location.reload();
        })
        .catch(err => alert(err['message']));
}

// function watchEnter() {
//     $('.form-group').on('keypress', (event) => {
//         if (event.which === 13) {
//             if (window.sessionStorage.getItem('mode') === 'sign-in') {
//                 $('#login').trigger('click');
//             }
//             else {
//                 $('#register').trigger('click');
//             }
//         }
//     });
// }