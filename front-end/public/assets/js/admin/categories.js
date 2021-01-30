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
                    'Authorization': 'Bearer ' + localStorage.getItem('sp-games-token'),
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(NEW_CATEGORY)
            })
                .then(res => {
                    $('#new-category').trigger('reset');
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
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('sp-games-token')
            },
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
                    default:
                        alert('Successfully updated!');
                }
            })
            .then(() => {
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