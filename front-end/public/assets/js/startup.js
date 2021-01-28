$(async () => {
    await loadNavbar();
    loadPage();
    watchBackButton();
    watchNavRouting();
    watchHashChange();
    watchLogout();
    watchAdministration();
    watchGameSelection();
});

/** @type {Object} */
let GLOBAL_USER;

/** @type {((game: Game) => boolean)[]} */
let conditions = [];

/** @type {'title' | 'date'} */
let sortCondition = 'date';

function watchHashChange() {
    $(window).on('hashchange', loadPage);
}

function watchBackButton() {
    $(window).on('popstate', () => {
        $(this).trigger('hashchange');
    });
}

function watchNavRouting() {
    $('a.router:not(#logout)').on('click', changePage);
}

function watchLogout() {
    $('#logout').on('click', logout);
}

/**
 *
 * @param {Event} event
 */
function changePage(event) {
    const $this = event.target;
    console.log('hey')
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
        $('#logout-nav').hide();
        $('#new-review').remove();
    }
}

async function checkLogin() {
    const TOKEN = localStorage.getItem('sp-games-token');
    return await fetch('http://localhost:5000/user/verify-login', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + TOKEN,
            'Content-Type': 'application/json'
        }
    })
        .then(res => {
            switch (res.status) {
                case 403:
                    throw new Error();
            }
            return res.json();
        })
        .then(user => {
            GLOBAL_USER = user;
            return true;
        })
        .catch(err => false);
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

function watchAdministration() {
    watchCategoryCreation();
    watchPlatformCreation();
}

function watchGameSelection() {
    $('.game-details').on('click', (event) => {
        event.preventDefault();
        const $this = $(event.target).parents('.game-details');
        const gameElementId = $($this).attr('id').split('-');
        const gid = gameElementId[gameElementId.length - 1];
        history.pushState(null, null, '/game/' + gid);
        $(window).trigger('hashchange');
    });
}