function watchPlatformCreation() {
    $('#new-platform').on('submit', (event) => {
        event.preventDefault();
        const newPlatName = $('#new-platform-name').val();
        const newPlatVersion = $('#new-platform-version').val();
        if (newPlatName !== '' && newPlatVersion !== '') {
            const NEW_PLATFORM = {
                platform: newPlatName,
                version: newPlatVersion
            };
            fetch('http://localhost:5000/platform', {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('sp-games-token'),
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(NEW_PLATFORM)
            })
                .then(res => {
                    $('#new-platform').trigger('reset');
                    switch (res.status) {
                        case 400:
                        case 422:
                            res.json()
                                .then(err => err['message'])
                                .then(alert);
                            return;
                        case 500:
                            throw Error('Error');
                    }
                })
                .then(() => {
                    loadPlatformContent();
                })
                .catch(console.log);
        }
    });
}

function aliasPlatformEdition() {

}

function watchPlatformEdition() {
    $('.platform-info').on('submit', (event) => {
        event.preventDefault();
        const $this = event.target;
        const cid = $($this).attr('id').split('-')[1];
        const newPlatName = $(`#platform-${ cid }-name`).val();
        const newPlatVersion = $(`#platform-${ cid }-desc`).val();
        const UPDATED_PLATFORM = {
            platform: newPlatName,
            version: newPlatVersion
        };
        fetch(`http://localhost:5000/platform/${ cid }`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(UPDATED_PLATFORM)
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
            .then(() => {
                loadPlatformContent();
            })
            .catch(console.log);
    });
}

function watchPlatformDeletion() {
    $('.del-btn').on('click', (event) => {
        event.preventDefault();
        const $this = event.target;
        /** @type {string} */
        const platformSelected = $($this).parent().parent().prop('id');
        const pid = platformSelected.split('-')[1];
        fetch(`http://localhost:5000/platform/${ pid }`, { method: 'DELETE' })
            .then(res => res.status)
            .then(status => {
                if (status === 204) {
                    loadPlatformContent();
                }
            })
            .catch(console.log);
    });
}