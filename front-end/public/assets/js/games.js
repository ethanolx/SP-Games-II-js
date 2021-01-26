function watchGameCreation() {
    $('#new-game').on('submit', (event) => {
        $(this).trigger('reset');
        event.preventDefault();
        const [title, description, priceRaw, yearRaw] = ['#new-game-title', '#new-game-desc', '#new-game-price', '#new-game-year'].map(id => $(id).val());
        // @ts-ignore
        const year = yearRaw === '' ? null : parseInt(yearRaw);
        // @ts-ignore
        const price = parseFloat(priceRaw);
        const categoryids = [];
        const platformids = [];
        $('#new-game-categories').children().children('input:checkbox').each((i, el) => {
            if ($(el).is(':checked')) {
                //@ts-ignore
                categoryids.push(parseInt($(el).val()));
            }
        });
        $('#new-game-platforms').children().children('input:checkbox').each((i, el) => {
            if ($(el).is(':checked')) {
                // @ts-ignore
                platformids.push(parseInt($(el).val()));
            }
        });
        const NEW_GAME = {
            title,
            description,
            price,
            year,
            categoryids,
            platformids
        };
        if (categoryids.length === 0 || platformids.length === 0) {
            alert('Every game must belong to at least 1 category and support at least 1 platform!');
        }
        else {
            fetch('http://localhost:5000/game', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage['sp-games-token']
                },
                body: JSON.stringify(NEW_GAME)
            })
                .then(res => {
                    switch (res.status) {
                        case 400:
                            res.json()
                                .then(err => err['message'])
                                .then(alert);
                            return;
                        case 500:
                            throw new Error('Error');
                        default:
                            alert('Game successfully created!');
                    }
                    return res.json();
                })
                .then(result => {
                    const gid = result['gameid'];
                    const file = $('#new-game-img').prop('files')[0];
                    const formData = new FormData();
                    formData.append('gameImage', file);
                    if (file !== '') {
                        fetch(`http://localhost:5000/game/${ gid }/image`, {
                            method: 'POST',
                            body: formData
                        })
                            .then(res => res.json())
                            .then(alert)
                            .catch(err => alert(err['message']));
                    }
                })
                .catch(console.log)
                .finally(loadAdminGameContent);
        }
    });
}

function loadAdminNewGameContent() {
    fetch('http://localhost:5000/category', { method: 'GET' })
        .then(res => res.json())
        .then(categories => {
            $('#new-game-categories').html(categories.map(category => {
                return CategoryCheckbox(category['id'], category['catname']);
            }));
        });
    fetch('http://localhost:5000/platform', { method: 'GET' })
        .then(res => res.json())
        .then(platforms => {
            $('#new-game-platforms').html(platforms.map(platform => {
                return PlatformCheckbox(platform['id'], `${ platform['platform'] } ${ platform['version'] }`);
            }));
        });
}

function loadAdminGameContent() {
    fetch('http://localhost:5000/games', { method: 'GET' })
        .then(res => res.json())
        .then(
            (
                /** @type {Game[]} */
                games
            ) => {
                let game_labels = '<a class="list-group-item list-group-item-action" data-toggle="list" href="#new-game" role="tab"> New Game </a>';
                let game_details = GameBaseBody();
                game_labels += games.map(g => GameLabel(g['gameid'], g['title'])).join('');
                game_details += games.map(g => GameBody(g['gameid'], g['title'], g['description'], g['price'], g['year'])).join('');

                $('#game-details').html(game_details);
                $('#game-labels').html(game_labels);

                return games;
            })
        .then(games => {
            games.forEach(g => {
                const gid = g['gameid'];
                const categories = g.categories;
                const platforms = g.platforms;
                fetch('http://localhost:5000/category', { method: 'GET' })
                    .then(res => res.json())
                    .then(categories => {
                        $(`#game-${ gid }-categories`).html(categories.map(category => {
                            return CategoryExistingCheckbox(category['id'], category['catname'], gid, g.categories.map(c => c.catid).includes(category['id']));
                        }).join(''));
                    });
                fetch('http://localhost:5000/platform', { method: 'GET' })
                    .then(res => res.json())
                    .then(platforms => {
                        $(`#game-${ gid }-platforms`).html(platforms.map(platform => {
                            return PlatformExistingCheckbox(platform['id'], `${ platform['platform'] } ${ platform['version'] }`, gid, g.platforms.map(p => p.pid).includes(platform['id']));
                        }).join(''));
                    });
            });
        })
        .finally(loadAdminNewGameContent)
        .finally(watchGameCreation)
        .finally(watchGameEdition)
        .finally(watchGameDeletion);
}

function watchGameEdition() {
    $('.game-info').on('submit', (event) => {
        event.preventDefault();
        const $this = event.target;
        const gid = $($this).attr('id').split('-')[1];
        const NEW_GAME_IMG = $(`#game-${ gid }-img`).prop('files')[0];
        const NEW_GAME_TITLE = $(`#game-${ gid }-title`).val();
        const NEW_GAME_DESC = $(`#game-${ gid }-desc`).val();
        const NEW_GAME_PRICE = parseFloat($(`#game-${ gid }-price`).val().toString());
        const NEW_GAME_YEAR = $(`#game-${ gid }-year`).val() === '' ? null : parseInt($(`#game-${ gid }-year`).val().toString());
        const categoryids = [];
        const platformids = [];
        $(`#game-${ gid }-categories`).children().children('input:checkbox').each((i, el) => {
            if ($(el).is(':checked')) {
                //@ts-ignore
                categoryids.push(parseInt($(el).val()));
            }
        });
        $(`#game-${ gid }-platforms`).children().children('input:checkbox').each((i, el) => {
            if ($(el).is(':checked')) {
                // @ts-ignore
                platformids.push(parseInt($(el).val()));
            }
        });
        const UPDATED_GAME = {
            title: NEW_GAME_TITLE,
            description: NEW_GAME_DESC,
            price: NEW_GAME_PRICE,
            year: NEW_GAME_YEAR,
            categoryids: categoryids,
            platformids: platformids
        };
        console.log(UPDATED_GAME);
        const formData = new FormData();
        formData.append('gameImage', NEW_GAME_IMG);
        fetch(`http://localhost:5000/game/${ gid }/image`, {
            method: 'POST',
            body: formData
        });
        fetch(`http://localhost:5000/game/${ gid }`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(UPDATED_GAME)
        })
            .then(res => {
                switch (res.status) {
                    case 400:
                    case 422:
                        res.json()
                            .then(err => err['message'])
                            .then(alert);
                        return;
                    case 500:
                        throw Error('Error');
                    default:
                        alert('Successfully updated!');
                }
            })
            .catch(console.log)
            .finally(loadAdminGameContent);
    });
}

function watchGameDeletion() {
    $('.del-btn').on('click', (event) => {
        event.preventDefault();
        const $this = event.target;
        /** @type {string} */
        const gameSelected = $($this).parent().parent().prop('id');
        const gid = gameSelected.split('-')[1];
        fetch(`http://localhost:5000/game/${ gid }`, { method: 'DELETE' })
            .then(res => res.status)
            .then(status => {
                if (status === 204) {
                    loadAdminGameContent();
                }
            })
            .catch(console.log);
    });
}