/**
 * Card display for a Game's details
 * @param {number} id
 * @param {string} title
 * @param {number} price
 * @param {string} pic
 * @param {number} [avgRating]
 * @param {number} [numberOfReviews]
 * @returns
 */
function GameCard(id, title, price, pic, avgRating, numberOfReviews) {
    return `
    <div class=\"card border-dark\">
        <img src=\"${ pic }\" alt=\"Image for \'${ title }\'\" class=\"card-img-top\" onerror=\"this.src=\'/img/pic.jpg\'\">
        <section class=\"card-body\">
            <h5 class=\"card-title\">${ title }</h5>
            <p class=\"card-text\">$${ price.toFixed(2) }</p>
            <button type=\"button\" id=\"game-card-${id}\" class=\"btn btn-info stretched-link game-details\">Read More</button>
        </section>
        <footer class=\"card-footer\">
            ${ avgRating ? `<p class=\"card-text\">Rating: ${ avgRating.toFixed(2) }/10</p>` : '' }
            ${ numberOfReviews ? `<p class=\"card-text\">${ numberOfReviews } reviews</p>` : '' }
        </footer>
    </div>
    `;
}

//! function GameFull(id, title, desc, price, pic, reviews) {
//     return `
//     <div class="row">
//         <div class="col-6">
//             <img src="" alt="" class="img-thumbnail" onerror="this.src='/img/pic.jpg'">
//             <div class="row"></div>
//         </div>
//         <div class="col-6"></div>
//     </div>
//     `;
// }

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