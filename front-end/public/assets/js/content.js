function loadContent() {
    const page = window.location.pathname;
    switch (page) {
        case '/':
            break;
        case '/games':
            loadGameContent();
            break;
        case '/admin':
            loadAdminContent();
            break;
    }
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
        content += GameCard(game['title'], game['description'], game['price'], `/game/${ gid }/image`, game['year'], avgRating, numOfReviews);
    }
    $('#games-content').html(content);
}

async function loadAdminContent() {
    let newCategoryName = '<a class=\"list-group-item list-group-item-action active new-category\" data-toggle=\"list\" href=\"#new-category-desc\" role=\"tab\" contenteditable=\"true\" id=\"new-category-name\">New Category</a>';
    let newCategoryDesc = '<div class=\"tab-pane fade show active new-category\" id=\"new-category-desc\" role=\"tabpanel\" contenteditable=\"true\">...description</div>';
    let categoryNames = '';
    let categoryDescs = '';
    const categories = await (fetch('http://localhost:5000/category', { method: 'GET' })
        .then(res => res.json())
        .catch(console.log));
    for (let category of categories) {
        categoryNames += CategoryHead(category['catname'], category['id']);
        categoryDescs += CategoryBody(category['description'], category['id']);
    }
    $('#category-names').html(newCategoryName + categoryNames);
    $('#category-desc').html(newCategoryDesc + categoryDescs);
}