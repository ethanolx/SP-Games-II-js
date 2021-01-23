"use strict";

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
            <button type=\"button\" id=\"game-card-${ id }\" class=\"btn btn-info stretched-link game-details\">Read More</button>
        </section>
        <footer class=\"card-footer\">
            <p class=\"card-text\">Rating: ${ avgRating ? `${ avgRating.toFixed(2) } / 10` : '~' }</p>
            <p class=\"card-text\">${ numberOfReviews } ${ numberOfReviews === 1 ? 'review' : 'reviews' }</p>
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

// function CategoryHead(title, id) {
//     return `
//     <a class="list-group-item list-group-item-action" data-toggle="list" href="#category-${ id }" role="tab">
//         ${ title }
//     </a>
//     `;
// }

function CategoryLabel(id, name) {
    return GeneralLabel('category', id, name);
}

function PlatformLabel(id, platform) {
    return GeneralLabel('platform', id, platform);
}

/**
 *
 * @param {'category' | 'platform'} type
 * @param {number} id
 * @param {string} label
 * @returns
 */
function GeneralLabel(type, id, label) {
    return `
    <a class="list-group-item list-group-item-action" data-toggle="list" href="#${ type }-${ id }" role="tab">
        ${ label }
    </a>
    `;
}

// function CategoryBody(name, desc, id) {
//     return `
//     <form action="" id="category-${id}" class="tab-pane fade show category-info" role="tabpanel">
//         <div class="form-row mt-2">
//             <label for="category-${id}-name" class=\"col-form-label\">Category Name</label>
//             <input type="text" id="category-${id}-name" value=\"${name}\" class=\"form-control\" required />
//         </div>
//         <div class="form-row mt-2">
//             <label for="category-${id}-desc" class=\"col-form-label\">Category Description</label>
//             <textarea id="category-${id}-desc" class=\"form-control\" required>${desc}</textarea>
//         </div>
//         <div class="form-row mt-5">
//             <button type=\"button\" class="btn btn-danger edit del-btn">DELETE</button>
//             <button type=\"reset\" class="btn btn-warning edit canc-btn">CANCEL</button>
//             <button type=\"submit\" class="btn btn-success edit save-btn">SAVE</button>
//         </div>
//     </form>
//     `;
// }

/**
 *
 * @param {'category' | 'platform'} type
 * @param {number} id
 * @param {string} p1
 * @param {string} p2
 * @returns
 */
function Body(type, id, p1, p2) {
    const P1 = (type === 'category' ? 'Category Name' : 'Platform Name');
    const P2 = (type === 'category' ? 'Category Description' : 'Platform Version');
    return `
    <form action="" id="${ type }-${ id }" class="tab-pane fade show ${ type }-info" role="tabpanel">
        <div class="form-row mt-2">
            <label for="${ type }-${ id }-name" class=\"col-form-label\">${ P1 }</label>
            <input type="text" id="${ type }-${ id }-name" value=\"${ p1 }\" class=\"form-control\" required />
        </div>
        <div class="form-row mt-2">
            <label for="${ type }-${ id }-desc" class=\"col-form-label\">${ P2 }</label>
            <textarea id="${ type }-${ id }-desc" class=\"form-control\" required>${ p2 }</textarea>
        </div>
        <div class="form-row mt-5">
            <button type=\"button\" class="btn btn-danger col del-btn">DELETE</button>
            <button type=\"reset\" class="btn btn-warning col canc-btn">CANCEL</button>
            <button type=\"submit\" class="btn btn-success col save-btn">SAVE</button>
        </div>
    </form>
    `;
}

function CategoryBody(id, name, desc) {
    return Body('category', id, name, desc);
}

function PlatformBody(id, platform, version) {
    return Body('platform', id, platform, version);
}

function GenericCheckbox(type, id, val) {
    return `
    <div class="form-check">
        <input type="checkbox" id="new-game-${ type }-${ id }" class="form-check-input" value="${ id }" />
        <label for="new-game-${ type }-${ id }" class="form-check-label">${ val }</label>
    </div>
    `;
}

function CategoryCheckbox(id, catname) {
    return GenericCheckbox('category', id, catname);
}

function PlatformCheckbox(id, platformFull) {
    return GenericCheckbox('platform', id, platformFull);
}

function GenericFilterOption(type, id, text) {
    return `
    <option value="${type}-filter-${id}">${text}</option>
    `;
}

function CategoryFilterOption(id, catname) {
    return GenericFilterOption('category', id, catname);
}

function PlatformFilterOption(id, platformFull) {
    return GenericFilterOption('platform', id, platformFull);
}