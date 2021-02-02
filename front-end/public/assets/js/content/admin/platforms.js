"use strict";

/*
 *  Author:     Ethan Tan
 *  Admin:      p2012085
 *  Class:      DAAA/FT/1B/03
 *  File:       platforms.js
 */

function loadPlatformContent() {
    $('.platform-info').off('submit');
    $('#new-platform').off('submit');
    $('.del-btn').off('click');
    fetch(`http://${ BACK_END_HOST }:${ BACK_END_PORT }/platform`, { method: 'GET' })
        .then(res => res.json())
        .then((
            /** @type {{
             *      id: number,
             *      platform: string,
             *      version: string
             * }[]} */
            platforms
        ) => {
            const platformsSorted = platforms.sort((p1, p2) => p1.platform.localeCompare(p2.platform) * 100 + p1.version.localeCompare(p2.version));
            let platformLabels = '';
            let platformData = '';
            for (let platform of platformsSorted) {
                platformLabels += PlatformLabel(platform['id'], `${ platform['platform'] } ${ platform['version'] }`);
                platformData += PlatformBody(platform['id'], platform['platform'], platform['version']);
            }
            $('#platform-labels').html(platformLabels);
            $('#platform-details').html(platformData);
            watchPlatformDeletion();
            watchPlatformEdition();
        })
        .catch(ignore)
        .finally(watchPlatformCreation);
}

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
            fetch(`http://${ BACK_END_HOST }:${ BACK_END_PORT }/platform`, {
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
                                .then(err => alert(err['message']));
                            return;
                        case 500:
                            throw Error('Error');
                    }
                })
                .catch(ignore)
                .finally(loadPlatformContent);
        }
    });
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
        fetch(`http://${ BACK_END_HOST }:${ BACK_END_PORT }/platform/${ cid }`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('sp-games-token')
            },
            body: JSON.stringify(UPDATED_PLATFORM)
        })
            .then(res => {
                switch (res.status) {
                    case 400:
                    case 422:
                        res.json()
                            .then(err => alert(err['message']));
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
            .catch(ignore);
    });
}

function watchPlatformDeletion() {
    $('.del-btn').on('click', (event) => {
        event.preventDefault();
        const $this = event.target;
        /** @type {string} */
        const platformSelected = $($this).parent().parent().prop('id');
        const pid = platformSelected.split('-')[1];
        fetch(`http://${ BACK_END_HOST }:${ BACK_END_PORT }/platform/${ pid }`, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('sp-games-token')
            }
        })
            .catch(ignore)
            .finally(loadPlatformContent);
    });
}