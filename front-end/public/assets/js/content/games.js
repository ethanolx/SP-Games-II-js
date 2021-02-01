/**
 * Filter games by specified conditions
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
 * Sort games alphabetically
 * @param {Game[]} games
 */
function sort(games) {
    let copy = [...games];
    return copy.sort((a, b) => a.title.localeCompare(b.title));
}

/**
 * Monitor user's filter
 */
function watchSearchConditions() {
    $('#search input, #search select').on('input', (event) => {
        /** @type {((game: Game) => boolean)[]} */
        let c = [];

        const filterIds = ['#title-filter', '#min-price-filter', '#max-price-filter', '#category-filter', '#platform-filter'];
        const [title, minPrice, maxPrice, categoryids, platformids] = filterIds;

        // Filter Functions
        if ($(title).val() !== '') {
            // filter by title
            c.push(((game) => RegExp($(title).val().toString(), 'i').test(game['title'])));
        }
        if ($(categoryids).children(':selected').val() !== 'Any') {
            // filter by category
            c.push(((game) => game.categories.map(cat => cat.catid).includes(parseInt($(categoryids).children(':selected').val().toString().split('-')[2]))));
        }
        if ($(platformids).children(':selected').val() !== 'Any') {
            // filter by platform
            c.push(((game) => game.platforms.map(platf => platf.pid).includes(parseInt($(platformids).children(':selected').val().toString().split('-')[2]))));
        }
        if ($(minPrice).val() !== '') {
            // filter by min. price
            c.push(((game) => parseFloat(game.price) >= parseInt($(minPrice).val().toString())));
        }
        if ($(maxPrice).val() !== '') {
            // filter by max. price
            c.push(((game) => parseFloat(game.price) <= parseInt($(maxPrice).val().toString())));
        }
        conditions = c;
        loadGameContent();
    });
}

/**
 * Loads the filter bar
 */
function loadFilterBar() {
    fetch('http://localhost:5000/category', { method: 'GET' })
        .then(res => res.json())
        .then(categories => {
            let categoryFilterOptions = '<option value=\"Any\" selected>Any</option>';
            categoryFilterOptions += categories.map((
                /** @type {Category} */
                category
            ) => CategoryFilterOption(category.id, category.catname)).join('');
            $('#category-filter').html(categoryFilterOptions);
        });
    fetch('http://localhost:5000/platform', { method: 'GET' })
        .then(res => res.json())
        .then(platforms => {
            let platformFilterOptions = '<option value=\"Any\" selected>Any</option>';
            platformFilterOptions += platforms.map((
                /** @type {Platform} */
                platform
            ) => PlatformFilterOption(platform.id, `${ platform.platform } ${ platform.version }`)).join('');
            $('#platform-filter').html(platformFilterOptions);
        });
}

/**
 * Load games with brief details
 */
function loadGameContent() {
    $('#games-content').empty();
    fetch('http://localhost:5000/games', { method: 'GET' })
        .then(res => res.json())
        .then(filter(conditions))
        .then(sort)
        .then(async gamesFiltered => {
            let content = '';
            for (let game of gamesFiltered) {
                const gid = game['gameid'];
                content += await fetch(`http://localhost:5000/game/${ gid }/review`, { method: 'GET' })
                    .then(res => {
                        if (res.ok) {
                            return res.json();
                        }
                        else {
                            throw new Error();
                        }
                    })
                    .then((
                        /** @type {Review[]} */
                        reviews
                    ) => {
                        let reviewsContent = '';

                        /** @type {number} */
                        const numOfReviews = reviews.length;
                        if (numOfReviews === 0) {
                            reviewsContent += GameCard(gid, game['title'], game['price'], `/game/${ gid }/image`, null, numOfReviews);
                        }
                        else {
                            /** @type {number} */
                            const avgRating = (numOfReviews > 1) ? reviews.map(r => parseFloat(r.rating)).reduce((r1, r2) => r1 + r2) / numOfReviews : parseFloat(reviews[0].rating);
                            reviewsContent += GameCard(gid, game['title'], game['price'], `/game/${ gid }/image`, avgRating, numOfReviews);
                        }
                        return reviewsContent;
                    })
                    .catch(ignore);
            }
            return content;
        })
        .then(content => {
            $('#games-content').html(content);
            watchGameSelection();
        })
        .catch(ignore);
}

/**
 * Monitor when user clicks on a game card
 */
function watchGameSelection() {
    $('.game-details').on('click', (event) => {
        event.preventDefault();
        const $this = $(event.target).parents('.game-details');
        const gid = $($this).attr('id').split('-')[2];
        history.pushState(null, null, '/game/' + gid);
        $(window).trigger('hashchange');
    });
}