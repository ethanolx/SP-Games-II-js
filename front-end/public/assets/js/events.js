$(() => {
    loadNavbar();
    loadPage();
    watchBackButton();
    watchNavRouting();
    watchLogout();
    watchHashChange();
});

function watchHashChange() {
    $(window).on('hashchange', loadPage);
}

function watchBackButton() {
    $(window).on('popstate', () => {
        $(this).trigger('hashchange');
    });
}

function watchNavRouting() {
    $('a.nav-link:not(#login)').on('click', changePage);
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
    else {
        $(`#${ path.substr(1) }`).show();
    }
}

function toggleLogin() {
    $('#login').toggle();
    $('#logout').toggle();
}

function loadNavbar() {
    if (checkLogin()) {
        if (!checkPermissions()) {
            $('#admin-nav').remove();
        }
        $('#login').hide();
    }
    else {
        $('#admin-nav').remove();
        $('#logout').hide();
    }
}

function checkLogin() {
    const TOKEN = localStorage.getItem('token');
    const USER = localStorage.getItem('user');
    return TOKEN !== undefined && TOKEN !== null && USER !== undefined && USER !== null;
}

function checkPermissions() {
    return localStorage?.user?.role === 'Admin';
}

function logout() {
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('user');
    $('#admin-nav').remove();
    toggleLogin();
}