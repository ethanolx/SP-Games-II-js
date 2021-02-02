/**
 * Monitor user's choice of review sorting
 */
function watchReviewSort() {
    const routes = window.location.pathname.split('/');
    const gameid = parseInt(routes[routes.length - 1]);
    $('#sort-reviews-condition').one('input', (event) => {
        const $this = event.target;
        const SORT_CONDITION = $($this).val().toString();
        // @ts-ignore
        reviewsSortCondition = SORT_CONDITION;
        loadSingleGameContent(gameid);
    });
    $('#sort-reviews-order').one('input', (event) => {
        const $this = event.target;
        const SORT_ORDER = $($this).val().toString();
        // @ts-ignore
        reviewsSortOrder = SORT_ORDER;
        loadSingleGameContent(gameid);
    });
}

/**
 * Sort reviews by conditions specified by the user
 * @param {Review[]} reviews
 * @returns
 */
function sortReviews(reviews) {
    const copy = [...reviews];
    switch (reviewsSortCondition) {
        case 'date':
            copy.sort((r1, r2) => r1['created_at'].localeCompare(r2['created_at']));
            break;
        case 'rating':
            copy.sort((r1, r2) => parseFloat(r1['rating']) - parseFloat(r2['rating']));
            break;
        case 'user':
            copy.sort((r1, r2) => r1['username'].localeCompare(r2['username']));
            break;
    }
    if (reviewsSortOrder === 'dsc') {
        copy.reverse();
    }
    return copy;
}

/**
 * Load all details of a single game selected by the user
 * @param {number} id
 */
function loadSingleGameContent(id) {
    $('#sort-reviews-condition').off('input');
    $('#sort-reviews-order').off('input');
    $('#new-review').off('submit');
    fetch(`http://${ BACK_END_HOST }:${ BACK_END_PORT }/game/${ id }`, { method: 'GET' })
        .then(res => res.json())
        .then(async (/** @type {Game} */ game) => {
            if (game === undefined) {
                return;
            }
            await fetch(`http://${ BACK_END_HOST }:${ BACK_END_PORT }/game/${ id }/review`, { method: 'GET' })
                .then(res => {
                    if (res.ok) {
                        return res.json();
                    }
                    else {
                        throw new Error();
                    }
                })
                .then(sortReviews)
                .then(reviews => {
                    const numOfReviews = reviews.length;
                    const avgRating = numOfReviews > 1 ? reviews.map(r => parseFloat(r['rating'])).reduce((r1, r2) => r1 + r2) / numOfReviews : (numOfReviews === 1 ? parseFloat(reviews[0]['rating']) : null);
                    $('#game-num-reviews').html(GameDetailsBlock('Number of Reviews: ', numOfReviews.toString()));
                    $('#game-avg-rating').html(GameDetailsBlock('Mean Rating: ', avgRating ? `${ avgRating.toFixed(2) } / 10` : '~'));
                    return reviews.map(r => ReviewCard(r['username'], parseFloat(r['rating']), r['content'])).join('');
                })
                .then(r => {
                    $("#review-stack").html(r);
                })
                .catch(ignore);

            /** @type {Game} */
            let { title, description, price, year, platforms, categories } = game;
            $('#game-id').text(title);
            $('#game-image').attr('src', `http://localhost:5000/game/${ game.id }/image`);
            $('#game-title').text(title);
            $('#game-desc').text(description);
            $('#game-price').html(GameDetailsBlock('Price: ', `S$${ price }`));
            $('#game-year').html(GameDetailsBlock('Year of Release: ', year ? year.toString() : '~'));
            $('#new-review button[type=\"submit\"]').attr('id', game.id);
            $('#game-categories').html(`<h5>Categories</h5><ul class=\"list-group\">${ categories.map(c => `<li class=\"list-group-item\">${ c.catname }</li>`).join('') }</ul>`);
            $('#game-platforms').html(`<h5>Platforms</h5><ul class=\"list-group\">${ platforms.map(p => `<li class=\"list-group-item\">${ p.platform } ${ p.version }</li>`).join('') }</ul>`);
        })
        .catch(ignore)
        .finally(watchReviewSort)
        .finally(watchReviewCreation);
}

function watchReviewCreation() {
    $('#new-review-rating').on('input', (event) => {
        const $this = event.target;
        const CURRENT_RATING = $($this).val().toString();
        $('#current-rating').text(CURRENT_RATING);
    });
    $('#new-review').one('submit', (event) => {
        event.preventDefault();
        const RATING = parseFloat($('#new-review-rating').val().toString());
        const CONTENT = $('#new-review-content').val();
        const userid = GLOBAL_USER['userid'];
        const gameid = parseInt($('#new-review button[type=\"submit\"]').attr('id'));
        fetch(`http://${ BACK_END_HOST }:${ BACK_END_PORT }/user/${ userid }/game/${ gameid }/review`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('sp-games-token')
            },
            body: JSON.stringify({
                rating: RATING,
                content: CONTENT
            })
        })
            .then(res => $('#new-review').trigger('reset'))
            .catch(ignore)
            .finally(() => {
                loadSingleGameContent(gameid);
            });
    });
}
