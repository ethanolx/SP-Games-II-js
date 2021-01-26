$(async () => {
    await loadNavbar();
    loadPage();
    watchBackButton();
    watchNavRouting();
    watchLogout();
    watchHashChange();
    watchAdministration();
    watchGameSelection();
});

let GLOBAL_USER;

function watchHashChange() {
    $(window).on('hashchange', loadPage);
}

function watchBackButton() {
    $(window).on('popstate', () => {
        $(this).trigger('hashchange');
    });
}

function watchNavRouting() {
    $('a.nav-link:not(#logout)').on('click', changePage);
}

function watchLogout() {
    $('#logout').on('click', logout);
}

function changePage(event) {
    const $this = event.target;
    event.preventDefault();
    window.history.pushState(null, null, $($this).attr('href'));
    $(window).trigger('hashchange');
}

function loadPage() {
    const path = window.location.pathname;
    $('.page').hide();
    if (path === '/') {
        $('#home').show();
    }
    else if (/\/game[^s].*/.test(path)) {
        $('#game').show();
    }
    else {
        $(`#${ path.substr(1) }`).show();
    }
    loadContent();
}

function toggleLogin() {
    $('#login-nav').toggle();
    $('#login').toggle();
    $('#logout-nav').toggle();
}

async function loadNavbar() {
    if (await checkLogin()) {
        if (!checkPermissions()) {
            $('#admin-nav').remove();
            $('#admin').remove();
        }
        $('#login-nav').hide();
        $('#login').hide();
    }
    else {
        $('#admin-nav').remove();
        $('#admin').remove();
        $('#profile-nav').remove();
        $('#profile').remove();
        $('#logout-nav').hide();
        $('#new-review').remove();
    }
}

async function checkLogin() {
    const TOKEN = localStorage.getItem('sp-games-token');
    return await fetch('http://localhost:5000/user/verify-login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token: TOKEN })
    })
        .then(res => res.json())
        .then(user => {
            GLOBAL_USER = user;
            return true;
        })
        .catch(err => false);
    // const USER = JSON.parse(localStorage.getItem('user'))
    // return TOKEN !== undefined && TOKEN !== null && USER !== undefined && USER !== null;
}

function checkPermissions() {
    return GLOBAL_USER['type'] === 'Admin';
}

function logout() {
    window.localStorage.removeItem('sp-games-token');
    GLOBAL_USER = {};
    $('#admin-nav').remove();
    $('#admin').remove();
    $('#profile-nav').remove();
    $('#profile').remove();
    history.pushState(null, null, '/');
    $(window).trigger('hashchange');
    toggleLogin();
}