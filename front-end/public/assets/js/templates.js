"use strict";

/*
 *  Name:   Ethan Tan
 *  Admin:  p2012085
 *  Class:  DAAA/1A/03
 */

//# GAMES

//> GAMES OVERVIEW

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
function GameCardOld(id, title, price, pic, avgRating, numberOfReviews) {
    return `
    <div class=\"card border-dark\">
        <!-- <img src=\"${ pic }\" alt=\"Image for \'${ title }\'\" class=\"card-img-top\" onerror=\"this.src=\'/img/pic.jpg\'\"> -->
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

function GameCard(id, title, price, pic, avgRating, numberOfReviews) {
    return `
    <div class="col-xl-4 col-md-6 mb-4">
        <div class="card border-left-primary shadow h-100 py-2 game-details" id="game-card-${id}">
            <div class="card-body">
                <div class="row no-gutters align-items-center">
                    <div class="col mr-2">
                        <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
                            ${title}
                        </div>
                        <div class="h5 mb-0 font-weight-bold text-gray-800">$${ price.toFixed(2) }</div>
                    </div>
                </div>
                <div class="row no-gutters align-items-center mt-2">
                    <div class="col mr-2">
                        <p class="card-text brief-game-details">Rating: ${ avgRating ? `${ avgRating.toFixed(2) } / 10` : '~' }</p>
                        <p class="card-text brief-game-details">${ numberOfReviews } ${ numberOfReviews === 1 ? 'review' : 'reviews' }</p>
                    </div>
                    <div class="col-auto">
                        <i class="fas fa-gamepad fa-2x text-gray-300"></i>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
}

//> GAMES FILTERS

/**
 *
 * @param {'category' | 'platform'} type
 * @param {number} id
 * @param {string} text
 * @returns
 */
function GenericFilterOption(type, id, text) {
    return `
    <option value="${ type }-filter-${ id }">${ text }</option>
    `;
}

/**
 *
 * @param {number} id
 * @param {string} catname
 * @returns
 */
function CategoryFilterOption(id, catname) {
    return GenericFilterOption('category', id, catname);
}

/**
 *
 * @param {number} id
 * @param {string} platformFull
 * @returns
 */
function PlatformFilterOption(id, platformFull) {
    return GenericFilterOption('platform', id, platformFull);
}

//> REVIEWS

/**
 *
 * @param {string} username
 * @param {number} rating
 * @param {string} content
 * @returns
 */
function ReviewCard(username, rating, content) {
    return `
    <div class="col-4">
        <div class="card border-info h-100">
            <div class="card-header border-info text-dark">
                <i class="fas fa-star"></i>
                <span>${ rating } / 10</span>
            </div>
            <div class="card-body border-info px-3 text-justify">
                <span class="card-text">${ content }</span>
            </div>
            <div class="card-footer text-right border-info text-dark">
                <span class="card-text">~ ${ username }</span>
            </div>
        </div>
    </div>
    `;
}

//# PROFILE

/**
 *
 * @param {string} username
 * @param {string} email
 * @param {string | null} profile_pic_url
 * @returns
 */
function ProfileCard(username, email, profile_pic_url) {
    return `
    <fieldset>
        <legend>My Profile</legend>
        <img src="${ profile_pic_url }" alt="hello" id="profile-pic" class="img-top img-fluid"
            onerror="this.src='/img/pic.jpg'">
        <div class="form-group">
            <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <span class="input-group-text">Upload</span>
                </div>
                <div class="custom-file">
                    <input type="file" class="custom-file-input" id="chg-pic">
                    <label class="custom-file-label" for="chg-pic">Choose New Profile Pic</label>
                </div>
            </div>
        </div>
        <div class="form-group">
            <label for="chg-username">Username</label>
            <input type="text" id="chg-username" class="form-control" value="${ username }">
        </div>
        <div class="form-group">
            <label for="chg-email">Email</label>
            <input type="email" id="chg-email" class="form-control" value="${ email }">
        </div>
        <div class="form-group">
            <label for="chg-password">Password</label>
            <input type="password" id="chg-password" class="form-control" value="">
        </div>
        <div id="profile-edit-btns" class="input-group">
            <div class="input-group-prepend">
                <button type="reset" class="btn btn-warning">Reset</button>
            </div>
            <div class="input-group-append">
                <button type="submit" class="btn btn-success">Save</button>
            </div>
        </div>
    </fieldset>
    `;
}

//# ADMIN

//? Generics

/**
 *
 * @param {'category' | 'platform' | 'game'} type
 * @param {number} id
 * @param {string} label
 * @returns
 */
function GenericLabel(type, id, label) {
    return `
    <a class="list-group-item list-group-item-action" data-toggle="list" href="#${ type }-${ id }" role="tab">
        ${ label }
    </a>
    `;
}

/**
 *
 * @param {'category' | 'platform'} type
 * @param {number} id
 * @param {string} p1
 * @param {string} p2
 * @returns
 */
function GenericBody(type, id, p1, p2) {
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

//> CATEGORIES

/**
 *
 * @param {number} id
 * @param {string} name
 * @returns
 */
function CategoryLabel(id, name) {
    return GenericLabel('category', id, name);
}

/**
 *
 * @param {number} id
 * @param {string} name
 * @param {string} desc
 * @returns
 */
function CategoryBody(id, name, desc) {
    return GenericBody('category', id, name, desc);
}

//> PLATFORMS

/**
 *
 * @param {number} id
 * @param {string} platform
 * @returns
 */
function PlatformLabel(id, platform) {
    return GenericLabel('platform', id, platform);
}

/**
 *
 * @param {number} id
 * @param {string} platform
 * @param {string} version
 * @returns
 */
function PlatformBody(id, platform, version) {
    return GenericBody('platform', id, platform, version);
}

//> GAMES

//? Generics

/**
 *
 * @param {'category' | 'platform'} type
 * @param {number} id
 * @param {string} val
 * @param {number} gid
 * @param {boolean} nw
 * @param {boolean} isSelected
 * @returns
 */
function GenericCheckbox(type, id, val, gid = null, nw = true, isSelected = false) {
    return `
    <div class="form-check">
        <input type="checkbox" id="${ nw ? 'new-' : '' }game-${ gid ? gid + '-' : '' }${ type }-${ id }" class="form-check-input" value="${ id }" ${ isSelected ? 'checked' : '' } />
        <label for="${ nw ? 'new-' : '' }game-${ gid ? gid + '-' : '' }${ type }-${ id }" class="form-check-label">${ val }</label>
    </div>
    `;
}

//? Label

/**
 *
 * @param {number} id
 * @param {string} title
 * @returns
 */
function GameLabel(id, title) {
    return GenericLabel('game', id, title);
}

//? New Game

//* Details

/**
 *
 * @returns
 */
function GameBaseBody() {
    return `
    <form class="tab-pane fade show active pt-4" id="new-game">
        <legend>Create a New Game</legend>
        <div class="form-row form-group pl-2">
            <div class="input-group">
                <div class="input-group-prepend">
                    <span class="input-group-text">Upload</span>
                </div>
                <div class="custom-file">
                    <input type="file" class="custom-file-input" id="new-game-img" accept="image/png, image/jpg, image/jpeg">
                    <label class="custom-file-label" for="new-game-img">Choose Image for
                        Game</label>
                </div>
            </div>
        </div>
        <div class="form-row form-group pl-2">
            <label for="new-game-title">New Game Title</label>
            <input type="text" id="new-game-title" class="form-control" placeholder="Diablo III"
                required>
        </div>
        <div class="form-row form-group pl-2">
            <label for="new-game-desc">New Game Description</label>
            <textarea type="text" id="new-game-desc" class="form-control"
                placeholder="Fun and Exciting!" rows="3" required></textarea>
        </div>
        <div class="form-row">
            <div class="form-group col-6">
                <label for="new-game-price">New Game Price</label>
                <div class="input-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text">S$</span>
                    </div>
                    <input type="number" id="new-game-price" class="form-control" value="10.00"
                        min="0" max="100" step="0.01" required>
                </div>
            </div>
            <div class="form-group col-6">
                <label for="new-game-year">New Game Year</label>
                <input type="number" id="new-game-year" class="form-control" placeholder="2000"
                    min="1980" max="2021" step="1">
            </div>
        </div>
        <div class="form-row">
            <div class="form-group col-6">
                <label>Categories</label>
                <div id="new-game-categories"></div>
            </div>
            <div class="form-group col-6">
                <label>Platforms</label>
                <div id="new-game-platforms"></div>
            </div>
        </div>
        <div class="form-row">
            <button type="submit" class="btn btn-block btn-success">CREATE</button>
        </div>
    </form>
    `;
}

//* Categories

/**
 *
 * @param {number} id
 * @param {string} catname
 * @returns
 */
function CategoryCheckbox(id, catname) {
    return GenericCheckbox('category', id, catname);
}

//* Platforms

/**
 *
 * @param {number} id
 * @param {string} platformFull
 * @returns
 */
function PlatformCheckbox(id, platformFull) {
    return GenericCheckbox('platform', id, platformFull);
}

//? Existing Games

//* Details

/**
 *
 * @param {number} id
 * @param {string} title
 * @param {string} description
 * @param {number} price
 * @param {number} year
 * @returns
 */
function GameBody(id, title, description, price, year) {
    return `
    <form class="tab-pane fade game-info pt-4" id="game-${ id }">
        <legend>${ title }</legend>
        <div class="form-row form-group pl-2">
            <div class="input-group">
                <div class="input-group-prepend">
                    <span class="input-group-text">Upload</span>
                </div>
                <div class="custom-file">
                    <input type="file" class="custom-file-input" id="game-${ id }-img">
                    <label class="custom-file-label" for="new-game-img">Choose Image for
                        Game</label>
                </div>
            </div>
        </div>
        <div class="form-row form-group pl-2">
            <label for="game-${ id }-title">Title</label>
            <input type="text" id="game-${ id }-title" class="form-control" value="${ title }" required>
        </div>
        <div class="form-row form-group pl-2">
            <label for="game-${ id }-desc">Description</label>
            <textarea type="text" id="game-${ id }-desc" class="form-control" rows="3" required>${ description }</textarea>
        </div>
        <div class="form-row">
            <div class="form-group col-6">
                <label for="game-${ id }-price">New Game Price</label>
                <div class="input-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text">S$</span>
                    </div>
                    <input type="number" id="game-${ id }-price" class="form-control" value="${ price }" min="0" max="100"
                        step="0.01" required>
                </div>
            </div>
            <div class="form-group col-6">
                <label for="game-${ id }-year">New Game Year</label>
                <input type="number" id="game-${ id }-year" class="form-control" placeholder="2000" min="1980" max="2021"
                    step="1" value="${ year ? year : '' }">
            </div>
        </div>
        <div class="form-row">
            <div class="form-group col-6">
                <label>Categories</label>
                <div id="game-${ id }-categories"></div>
            </div>
            <div class="form-group col-6">
                <label>Platforms</label>
                <div id="game-${ id }-platforms"></div>
            </div>
        </div>
        <div class="form-row">
            <button type="button" class="btn btn-danger col del-btn">DELETE</button>
            <button type="reset" class="btn btn-warning col canc-btn">CANCEL</button>
            <button type="submit" class="btn btn-success col save-btn">SAVE</button>
        </div>
    </form>
    `;
}

//* Categories

/**
 *
 * @param {number} id
 * @param {string} catname
 * @param {number} gid
 * @param {boolean} isSelected
 * @returns
 */
function CategoryExistingCheckbox(id, catname, gid, isSelected) {
    return GenericCheckbox('category', id, catname, gid, false, isSelected);
}

//* Platforms

/**
 *
 * @param {number} id
 * @param {string} platformFull
 * @param {number} gid
 * @param {boolean} isSelected
 * @returns
 */
function PlatformExistingCheckbox(id, platformFull, gid, isSelected) {
    return GenericCheckbox('platform', id, platformFull, gid, false, isSelected);
}