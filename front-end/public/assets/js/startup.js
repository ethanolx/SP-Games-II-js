"use strict";

/*
 *  Author:     Ethan Tan
 *  Admin:      p2012085
 *  Class:      DAAA/FT/1B/03
 *  File:       startup.js
 */

$(async () => {
    await loadNavbar();
    loadPage();
    watchBackButton();
    watchNavRouting();
    watchHashChange();
    watchLogout();
});

//# SPA TECHNICALITIES

function watchBackButton() {
    $(window).on('popstate', () => {
        $(window).trigger('hashchange');
    });
}

function watchHashChange() {
    $(window).on('hashchange', loadPage);
}

function watchNavRouting() {
    $('a.router').on('click', changePage);
}

function loadPage() {
    const path = window.location.pathname;

    // Hide all pages
    $('.page').hide();

    // Show target page only
    if (path === '/') {
        $('#home').show();
    }
    else if (/\/game[^s].*/.test(path)) {
        $('#game').show();
    }
    else {
        $(`#${ path.substr(1) }`).show();
    }

    // Load relevant content
    loadContent();
}

/**
 *
 * @param {Event} event
 */
function changePage(event) {
    event.preventDefault();
    const target = event.target;
    const $this = $(target).hasClass('router') ? target : $(target).parents('.router');
    window.history.pushState(null, null, $($this).attr('href'));
    $(window).trigger('hashchange');
}

//# EVALUATE PROPER PERMISSIONS

/**
 * Checks if user is logged in
 * @returns {Promise<boolean>}
 */
async function checkLogin() {
    const TOKEN = localStorage.getItem('sp-games-token');
    if (!TOKEN) {
        return false;
    }
    return await fetch(`http://${ BACK_END_HOST }:${ BACK_END_PORT }/user/verify-login`, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + TOKEN,
            'Content-Type': 'application/json'
        }
    })
        .then(res => {
            switch (res.status) {
                case 401:
                    throw new Error('Not logged in');
            }
            return res.json();
        })
        .then(user => {
            GLOBAL_USER = user;
            return true;
        })
        .catch(err => false);
}

/**
 * Checks if user is logged in as an Administrator
 * @returns {boolean}
 */
function checkPermissions() {
    return GLOBAL_USER['type'] === 'Admin';
}

//# RESTRICT CONTENT TO BE RENDERED

async function loadNavbar() {
    if (await checkLogin()) {
        if (!checkPermissions()) {
            $('.admin-nav').remove();
            $('.admin').remove();
        }
        $('#login-nav').hide();
        $('#login').hide();
    }
    else {
        $('.admin-nav').remove();
        $('.admin').remove();
        $('.personalisation').remove();
        $('#profile').remove();
        $('#new-review').remove();
        $('#logout-nav').hide();
    }
}

/**
 * Toggle between login and logout status
 */
function toggleLogin() {
    $('#login-nav').toggle();
    $('#logout-nav').toggle();
    $('#login').toggle();
}

/**
 * Monitor when user logs out
 */
function watchLogout() {
    $('#logout').on('click', logout);
}

/**
 * Logs a user out
 * @param {Event} event
 */
function logout(event) {
    // Clear API JWT
    window.localStorage.removeItem('sp-games-token');

    // Clear all details about the previous user
    GLOBAL_USER = {};

    // Remove all elements which require the user to be logged in
    $('.admin-nav').remove();
    $('.admin').remove();
    $('.personalisation').remove();
    $('#profile').remove();
    $('#new-review').remove();

    // Redirects user to home page
    history.pushState(null, null, '/');
    $(window).trigger('hashchange');
    toggleLogin();
}