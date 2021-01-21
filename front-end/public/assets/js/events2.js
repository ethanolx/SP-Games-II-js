function watchAdministration() {
    $('#category-mode').on('click', (event) => {
        event.preventDefault();
        $('#category-overview').slideDown();
    });
}

function watchCategoryCreation() {
    $('#new-category').on('submit', (event) => {
        event.preventDefault();
        const newCatName = $('#new-category-name').val();
        const newCatDesc = $('#new-category-desc').val();
        if (newCatName !== '' && newCatDesc !== '') {
            const NEW_CATEGORY = {
                catname: newCatName,
                description: newCatDesc
            };
            fetch('http://localhost:5000/category', {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(NEW_CATEGORY)
            })
                .then(res => {
                    $('#new-category').trigger('reset');
                    switch (res.status) {
                        case 422:
                            res.json()
                                .then(err => err['message'])
                                .then(alert);
                            return;
                        case 500:
                            throw Error('Error');
                    }
                })
                .then(result => {
                    loadCategoryContent();
                })
                .catch(console.log);
        }
    });
}

function aliasCategoryEdition() {

}

function watchCategoryEdition() {
    $('.category-info').on('submit', (event) => {
        event.preventDefault();
        const $this = event.target;
        const cid = $($this).attr('id').split('-')[1];
        const newCatName = $(`#category-${ cid }-name`).val();
        const newCatDesc = $(`#category-${ cid }-desc`).val();
        const UPDATED_CATEGORY = {
            catname: newCatName,
            description: newCatDesc
        };
        fetch(`http://localhost:5000/category/${ cid }`, {
            method: 'PUT',
            body: JSON.stringify(UPDATED_CATEGORY)
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
                }
            })
            .then(result => {
                loadCategoryContent();
            })
            .catch(console.log);
    });
}

function watchCategoryDeletion() {
    $('.del-btn').on('click', (event) => {
        event.preventDefault();
        const $this = event.target;
        /** @type {string} */
        const categorySelected = $($this).parent().parent().prop('id');
        const cid = categorySelected.split('-')[1];
        fetch(`http://localhost:5000/category/${ cid }`, { method: 'DELETE' })
            .then(res => res.status)
            .then(status => {
                if (status === 204) {
                    loadCategoryContent();
                }
            })
            .catch(console.log);
    });
}

// function aliasCategoryEdition() {
//     $('.category-info').on('keypress', (event) => {
//         if (event.which === 13) {
//             $(this).trigger('submit');
//         }
//     });
// }

function watchGameSelection() {
    $('.game-details').on('click', (event) => {
        const gameElementId = $(event.target).attr('id').split('-');
        const gid = gameElementId[gameElementId.length - 1];
        window.location.assign('/game/' + gid);
        $(window).trigger('hashchange');
    });
}