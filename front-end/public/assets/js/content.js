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
                loadGameContent();
                break;
            case '/profile':
                loadProfileContent();
                break;
            case '/admin':
                loadAdminContent();
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

async function loadGameContent() {
    let content = '';
    const games = await (fetch('http://localhost:5000/games/PC', { method: 'GET' })
        .then(res => res.json())
        .catch(console.log));
    for (let game of games) {
        let gid = game['gameid'];
        /** @type {Object[]} */
        const reviews = await (fetch(`http://localhost:5000/game/${ gid }/review`, { method: 'GET' })
            .then(res => res.json())
            .catch(console.log));
        const numOfReviews = reviews.length;

        /** @type {number} */
        const avgRating = (reviews.length > 1) ? reviews.reduce((r1, r2) => parseFloat(r1['rating']) + parseFloat(r2['rating'])) / numOfReviews : (reviews.length === 1 ? reviews[0]['rating'] : null);
        content += GameCard(gid, game['title'], game['price'], `/game/${ gid }/image`, avgRating, numOfReviews);
    }
    $('#games-content').html(content);
    watchGameSelection();
}

function loadAdminContent() {
    loadCategoryContent();
}

function loadCategoryContent() {
    fetch('http://localhost:5000/category', { method: 'GET' })
        .then(res => res.json())
        .then(categories => {
            let categoryNames = '';
            let categoryDescs = '';
            for (let category of categories) {
                categoryNames += CategoryHead(category['catname'], category['id']);
                categoryDescs += CategoryBody(category['catname'], category['description'], category['id']);
            }
            $('#category-names').html(categoryNames);
            $('#category-desc').html(categoryDescs);
            watchCategoryDeletion();
        })
        .catch(console.log);
}

async function loadProfileContent() {
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