function loadContent() {
    const page = window.location.pathname;
    if (/\/game[^s].*/.test(page)) {
        loadSingleGameContent(parseInt(page.substr(1).split('/')[1]));
    }
    else {
        switch (page) {
            case '/':
                break;
            case '/games':
                // watchSearchConditions();
                loadGameContent();
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

async function loadSingleGameContent(id) {
    const game = await (fetch(`http://localhost:5000/game/${ id }`, { method: 'GET' })
        .then(res => res.json())
        .catch(console.log));
    if (game === undefined) {
        return;
    }
    /** @type {{content: string, username: string, rating: number}[]} */
    const reviews = await (fetch(`http://localhost:5000/game/${ id }/review`, { method: 'GET' })
        .then(res => res.json())
        .catch(console.log));
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
    const { title, description, price, year, platforms, categories } = game;
    $('#game-title').text(title);
    $('#game-desc').text(description);
    $('#game-price').text(price);
    $('#game-year').text(year);
    $('#game-categories').html(`<h5>Categories</h5><ul class=\"list-group\">${ categories.map(c => `<li class=\"list-group-item\">${ c.catname }</li>`).join('') }</ul>`);
    $('#game-platforms').html(`<h5>Platforms</h5><ul class=\"list-group\">${ platforms.map(p => `<li class=\"list-group-item\">${ p.platform } ${ p.version }</li>`).join('') }</ul>`);
    $('#review-stack').html(reviews.map(r => `<div class\"jumbotron\">${ r.content }</div>`).join(''));
}

let currentFilter = filter([]);

let conditions = [];

function watchSearchConditions() {
    $('#search input').on('input', (event) => {
        const filterIds = ['#title-filter', '#min-price-filter', '#max-price-filter', '#category-filter', '#platform-filter'];
        /** @type {((game: Game) => boolean)[]} */
        let c = [];
        const [title, minPrice, maxPrice, categoryids, platformids] = filterIds;
        if ($(title).val() !== '') {
            // @ts-ignore
            c.push(((game) => RegExp($(title).val()).test(game['title'])));
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

/**
 *
 * @param {Game} game
 * @param {RegExp} title
 */
// function filterByTitle(game, title) {
//     return title.test(game['title']);
// }

function loadGameContent() {
    $('#games-content').empty();
    (fetch('http://localhost:5000/games/PC', { method: 'GET' })
        .then(res => res.json())
        .then(games => {
            let content = '';
            // const gamesFiltered = currentFilter(games);
            const gamesFiltered = filter(conditions)(games);
            gamesFiltered.forEach(game => {
                let gid = game['gameid'];
                (fetch(`http://localhost:5000/game/${ gid }/review`, { method: 'GET' })
                    .then(res => res.json())
                    .then(reviews => {
                        const numOfReviews = reviews.length;

                        /** @type {number} */
                        const avgRating = (reviews.length > 1) ? reviews.reduce((r1, r2) => parseFloat(r1['rating']) + parseFloat(r2['rating'])) / numOfReviews : (reviews.length === 1 ? reviews[0]['rating'] : null);
                        content += GameCard(gid, game['title'], game['price'], `/game/${ gid }/image`, avgRating, numOfReviews);
                    })
                    .then(() => {
                        $('#games-content').html(content);
                        watchGameSelection();
                    })
                    .catch(console.log));
            });
        })
        .catch(console.log));
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