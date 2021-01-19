$(async () => {
    const page = window.location.pathname;
    let content = '';
    switch (page) {
        case '/':
            break;
        case '/games':
            const games = await (fetch('http://localhost:5000/games/PC', { method: 'GET' })
                .then(res => res.json())
                .catch(console.log));
            for (let game of games) {
                let gid = game['gameid'];
                const reviews = await (fetch(`http://localhost:5000/game/${ gid }/review`, { method: 'GET' })
                    .then(res => res.json())
                    .catch(console.log));
                const numOfReviews = reviews.length;
                const avgRating = reviews.reduce((r1, r2) => parseFloat(r1['rating']) + parseFloat(r2['rating'])) / numOfReviews;
                content += GameCard(game['title'], game['description'], game['price'], game['year'], '', avgRating, numOfReviews);
            }
            break;
    }
    $('#content').append(content);
})