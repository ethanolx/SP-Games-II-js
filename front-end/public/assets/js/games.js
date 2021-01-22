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
                    'Authorization': 'Bearer ' + localStorage['token']
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
                })
                .then(() => {
                    loadAdminGameContent();
                })
                .catch(console.log);
        }
    });
}

function loadAdminGameContent() {
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