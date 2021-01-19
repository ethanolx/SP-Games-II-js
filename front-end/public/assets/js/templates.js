/**
 * Card display for a Game's details
 * @param {string} title
 * @param {string} desc
 * @param {number} price
 * @param {number} [year]
 * @param {string} [pic]
 * @param {number} [avgRating]
 * @param {number} [numberOfReviews]
 * @returns
 */
function GameCard(title, desc, price, year, pic, avgRating, numberOfReviews) {
    return `
    <div class=\"card border-dark\">
        <img src=\"${ pic ? pic : '/img/pic.jpg' }\" alt=\"Image for \'${title}\'\" class=\"card-img-top\">
        <section class=\"card-body\">
            <h5 class\"card-title\">${ title }</h5>
            <p class=\"card-text\">${ desc }</p>
            <p class=\"card-text\">$${ price.toFixed(2) }</p>
            ${ year ? `<p class=\"card-text\">${ year }</p>` : '' }
        </section>
        <footer class=\"card-footer\">
            ${avgRating ? `<p class=\"card-text\">Rating: ${ avgRating.toFixed(2) }/10</p>` : ''}
            ${numberOfReviews ? `<p class=\"card-text\">${numberOfReviews} reviews</p>`: ''}
        </footer>
    </div>
    `;
}