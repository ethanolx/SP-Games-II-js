/**
 * Card display for a Game's details
 * @param {string} title
 * @param {string} desc
 * @param {number} price
 * @param {string} pic
 * @param {number} [year]
 * @param {number} [avgRating]
 * @param {number} [numberOfReviews]
 * @returns
 */
function GameCard(title, desc, price, pic, year, avgRating, numberOfReviews) {
    return `
    <div class=\"card border-dark\">
        <img src=\"${ pic }\" alt=\"Image for \'${ title }\'\" class=\"card-img-top\" onerror=\"this.src=\'/img/pic.jpg\'\">
        <section class=\"card-body\">
            <h5 class=\"card-title\">${ title }</h5>
            <p class=\"card-text\">${ desc }</p>
            <p class=\"card-text\">$${ price.toFixed(2) }</p>
            ${ year ? `<p class=\"card-text align-bottom\">${ year }</p>` : '' }
        </section>
        <footer class=\"card-footer\">
            ${ avgRating ? `<p class=\"card-text\">Rating: ${ avgRating.toFixed(2) }/10</p>` : '' }
            ${ numberOfReviews ? `<p class=\"card-text\">${ numberOfReviews } reviews</p>` : '' }
        </footer>
    </div>
    `;
}

function CategoryHead(title, id) {
    return `
    <a class="list-group-item list-group-item-action" data-toggle="list" href="#category-${ id }" role="tab">
        ${ title }
    </a>
    `;
}

function CategoryBody(content, id) {
    return `
    <div class="tab-pane fade show" id="category-${ id }" role="tabpanel">
        ${ content }
    </div>
    `;
}

function ProfileCard(profilePicUrl, username, email) {
    return `

    `;
}