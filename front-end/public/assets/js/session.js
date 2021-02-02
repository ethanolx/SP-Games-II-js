"use strict";

/*
 *  Author:     Ethan Tan
 *  Admin:      p2012085
 *  Class:      DAAA/FT/1B/03
 *  File:       session.js
 */

$(() => {
    loadLoginPage();
});

//> Logistics

/**
 * Loads all the necessary handlers
 */
function loadLoginPage() {
    $('#register-section').hide();
    $('#sign-up, #sign-in').on('click', () => {
        toggleLoginMode();
    });
    $('#register-form').on('submit', register);
    $('#login-form').on('submit', login);
}

/**
 * Toggles visibility of login/registration forms
 */
function toggleLoginMode() {
    $('#login-section').toggle();
    $('#register-section').toggle();
}

//> Registration Validation

/**
 * Checks if registration fields are valid
 * @returns {boolean}
 */
function validateRegistration() {
    const draftPwd = $('#new-password').val().toString();
    return validatePasswordMatch() && validatePasswordStrength(draftPwd);
}

/**
 *
 * @returns {boolean}
 */
function validatePasswordMatch() {
    const draftPwd = $('#new-password').val();
    const confirmPwd = $('#confirm-password').val();
    return draftPwd === confirmPwd;
}

/**
 *
 * @param {string} password
 * @returns {boolean}
 */
function validatePasswordStrength(password) {
    for (let req of [/[`!~@#\$%\^\&\*\(\)]/, /[0-9]/, /[A-Z]/, /[a-z]/]) {
        if (!req.test(password)) {
            return false;
        }
    }
    return true;
}

//> Login and Registration

/**
 * Register a new user
 * @param {JQuery.Event} event
 */
function register(event) {
    event.preventDefault();
    if (validateRegistration()) {
        const USERNAME = $('#new-username').val().toString();
        const PASSWORD = $('#new-password').val().toString();
        const EMAIL = $('#new-email').val().toString();
        const NEW_USER = {
            username: USERNAME,
            email: EMAIL,
            password: PASSWORD,
            profile_pic_url: null
        };
        fetch(`http://${ BACK_END_HOST }:${ BACK_END_PORT }/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(NEW_USER)
        })
            .then(res => res.json())
            .then(data => {
                login(null, USERNAME, PASSWORD);
            })
            .then(() => alert('You have successfully registered for SP Games!'))
            .catch(ignore);
    }
    else if (validatePasswordMatch()) {
        alert('Your passwords are not strong enough\n(Ensure your password contains at least 1 lowercase,\n1 uppercase letter, 1 number and 1 special character)');
    }
    else {
        alert('Your passwords do not match!');
    }
}

/**
 * Login an existing user
 * @param {JQuery.Event} event
 * @param {string | null} username
 * @param {string | null} password
 */
function login(event, username = null, password = null) {
    event.preventDefault();
    const USERNAME_OR_EMAIL = username || $('#username').val().toString();
    const PASSWORD = password || $('#password').val().toString();
    const CREDENTIALS = {
        username: USERNAME_OR_EMAIL,
        password: PASSWORD
    };
    fetch(`http://${ BACK_END_HOST }:${ BACK_END_PORT }/user/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(CREDENTIALS)
    })
        .then(res => {
            switch (res.status) {
                case 401:
                    throw new Error('Invalid username, email or password provided!');
            }
            return res.json();
        })
        .then(data => {
            const TOKEN = data['token'];
            localStorage.setItem('sp-games-token', TOKEN);
            history.pushState(null, null, '/');
            $(window).trigger('hashchange');
            window.location.reload();
        })
        .catch(err => alert(err['message']));
}