function loadContent() {
    const page = window.location.pathname;
    if (/\/game\/[\d]+/.test(page)) {
        loadSingleGameContent(parseInt(page.substr(1).split('/')[1]));
    }
    else {
        switch (page) {
            case '/':
                break;
            case '/games':
                watchSearchConditions();
                loadGameContent();
                loadFilterBar();
                break;
            case '/profile':
                loadProfileContent();
                break;
            case '/admin':
                loadAdminContent();
                loadAdminGameContent();
                break;
        }
    }
}

function loadSingleGameContent(id) {
    fetch(`http://localhost:5000/game/${ id }`, { method: 'GET' })
        .then(res => res.json())
        .then(game => {
            if (game === undefined) {
                return;
            }
            fetch(`http://localhost:5000/game/${ id }/review`, { method: 'GET' })
                .then(res => {
                    if (res.ok) {
                        return res.json();
                    }
                    else if (res.status === 404) {
                        throw new Error('No reviews');
                    }
                    else {
                        throw new Error();
                    }
                })
                .then(reviews => {
                    return reviews.map(r => `<div class\"jumbotron\">${ r.content }</div>`).join('');
                })
                .then(r => {
                    $("#review-stack").html(r);
                })
                .catch(console.log);
            /** @type {{
             * title: string,
             * description: string,
             * price: number,
             * year: number,
             * platforms: {
             *      platform: string,
             *      version: string
             * }[],
             * categories: {
             *      catname: string,
             *      description: string
             * }[]}} */
            let { title, description, price, year, platforms, categories } = game;
            $('#game-title').text(title);
            $('#game-desc').text(description);
            $('#game-price').text(price);
            $('#game-year').text(year);
            $('#game-categories').html(`<h5>Categories</h5><ul class=\"list-group\">${ categories.map(c => `<li class=\"list-group-item\">${ c.catname }</li>`).join('') }</ul>`);
            $('#game-platforms').html(`<h5>Platforms</h5><ul class=\"list-group\">${ platforms.map(p => `<li class=\"list-group-item\">${ p.platform } ${ p.version }</li>`).join('') }</ul>`);
        })
        .catch(console.log);
}

let conditions = [];

function watchSearchConditions() {
    $('#search input, #search select').on('input', (event) => {
        const filterIds = ['#title-filter', '#min-price-filter', '#max-price-filter', '#category-filter', '#platform-filter'];
        /** @type {((game: Game) => boolean)[]} */
        let c = [];
        const [title, minPrice, maxPrice, categoryids, platformids] = filterIds;
        if ($(title).val() !== '') {
            // @ts-ignore
            c.push(((game) => RegExp($(title).val()).test(game['title'])));
        }
        if ($(categoryids).children(':selected').val() !== 'Any') {
            c.push(((game) => game.categories.map(cat => cat.catid).includes(parseInt($(categoryids).children(':selected').val().toString().split('-')[2]))));
        }
        if ($(platformids).children(':selected').val() !== 'Any') {
            c.push(((game) => game.platforms.map(platf => platf.pid).includes(parseInt($(platformids).children(':selected').val().toString().split('-')[2]))));
        }
        if ($(minPrice).val() !== '') {
            c.push(((game) => game.price > parseInt($(minPrice).val().toString())));
        }
        if ($(maxPrice).val() !== '') {
            c.push(((game) => game.price < parseInt($(maxPrice).val().toString())));
        }
            // const title = $('#title-filter').val();
            // const minPrice = $('#min-price-filter').val();
            // const maxPrice = $('#max-price-filter').val();
            // const categoryids = $('#category-filter').val();
            // const platformids = $('#platform-filter').val();

            conditions = c;
        loadGameContent();
    });
}

/** @typedef {{
 *      title: string,
 *      description: string,
 *      price: number,
 *      year: number,
 *      categories: {
 *          catid: number,
 *          catname: string
 *      }[],
 *      platforms: {
 *          pid: number,
 *          platform: string,
 *          version: string
 *      }[]}
 * } Game */

/**
 *
 * @param {((game: Game) => boolean)[]} conditions
 * @returns
 */
function filter(conditions) {
    return (
        /** @type {Game[]} */
        games
    ) => {
        let copy = [...games];
        for (let f of conditions) {
            copy = copy.filter(f);
        }
        return copy;
    };
}

// /**
//  *
//  * @param {Game} game
//  * @param {RegExp} title
//  */
// function filterByTitle(game, title) {
//     return title.test(game['title']);
// }

function loadFilterBar() {
    fetch('http://localhost:5000/category', { method: 'GET' })
        .then(res => res.json())
        .then(categories => {
            let categoryFilterOptions = '<option value=\"Any\" selected>Any</option>';
            categoryFilterOptions += categories.map(category => CategoryFilterOption(category['id'], category['catname'])).join('');
            $('#category-filter').html(categoryFilterOptions);
        });
    fetch('http://localhost:5000/platform', { method: 'GET' })
        .then(res => res.json())
        .then(platforms => {
            let platformFilterOptions = '<option value=\"Any\" selected>Any</option>';
            platformFilterOptions += platforms.map(platform => PlatformFilterOption(platform['id'], `${ platform['platform'] } ${ platform['version'] }`)).join('');
            $('#platform-filter').html(platformFilterOptions);
        });
}

function loadGameContent() {
    $('#games-content').empty();
    fetch('http://localhost:5000/games', { method: 'GET' })
        .then(res => res.json())
        .then(filter(conditions))
        .then(gamesFiltered => {
            let content = '';
            gamesFiltered.forEach(game => {
                const gid = game['gameid'];
                fetch(`http://localhost:5000/game/${ gid }/review`, { method: 'GET' })
                    .then(res => {
                        if (res.ok) {
                            return res.json();
                        }
                        else if (res.status === 404) {
                            return Promise.resolve([]);
                        }
                        else {
                            throw new Error();
                        }
                    })
                    .then(reviews => {
                        const numOfReviews = reviews.length;
                        if (numOfReviews === 0) {
                            content += GameCard(gid, game['title'], game['price'], `/game/${ gid }/image`, null, numOfReviews);
                        }
                        else {
                            /** @type {number} */
                            const avgRating = (reviews.length > 1) ? reviews.reduce((r1, r2) => parseFloat(r1['rating']) + parseFloat(r2['rating'])) / numOfReviews : (reviews.length === 1 ? reviews[0]['rating'] : null);
                            content += GameCard(gid, game['title'], game['price'], `/game/${ gid }/image`, avgRating, numOfReviews);
                        }
                    })
                    .catch(ignore)
                    .finally(() => {
                        $('#games-content').html(content);
                        watchGameSelection();
                    });
            });
        })
        .catch(console.log);
}

function loadAdminContent() {
    loadCategoryContent();
    loadPlatformContent();
}

function loadCategoryContent() {
    fetch('http://localhost:5000/category', { method: 'GET' })
        .then(res => res.json())
        .then(categories => {
            let categoryLabels = '';
            let categoryData = '';
            for (let category of categories) {
                categoryLabels += CategoryLabel(category['id'], category['catname']);
                categoryData += CategoryBody(category['id'], category['catname'], category['description']);
            }
            $('#category-labels').html(categoryLabels);
            $('#category-details').html(categoryData);
            watchCategoryDeletion();
            watchCategoryEdition();
        })
        .catch(console.log);
}

function loadPlatformContent() {
    fetch('http://localhost:5000/platform', { method: 'GET' })
        .then(res => res.json())
        .then(platforms => {
            let platformLabels = '';
            let platformData = '';
            for (let platform of platforms) {
                platformLabels += PlatformLabel(platform['id'], `${ platform['platform'] } ${ platform['version'] }`);
                platformData += PlatformBody(platform['id'], platform['platform'], platform['version']);
            }
            $('#platform-labels').html(platformLabels);
            $('#platform-details').html(platformData);
            watchPlatformDeletion();
            watchPlatformEdition();
        })
        .catch(console.log);
}

function loadProfileContent() {
    const user = JSON.parse(window.localStorage.getItem('user'));
    console.log(user);
    const { username, email, profile_pic_url } = user;
    if (profile_pic_url !== null) {
        $('#profile-pic').attr('src', profile_pic_url);
    }
    $('#chg-username').val(username);
    $('#chg-email').val(email);
    $('#chg-password').val('');
}