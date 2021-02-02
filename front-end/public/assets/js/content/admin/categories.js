function loadCategoryContent() {
    fetch(`http://${ BACK_END_HOST }:${ BACK_END_PORT }/category`, { method: 'GET' })
        .then(res => res.json())
        .then((
            /** @type {{
             *      id: number,
             *      catname: string,
             *      description: string
             * }[]} */
            categories
        ) => {
            const categoriesSorted = categories.sort((c1, c2) => c1.catname.localeCompare(c2.catname));
            let categoryLabels = '';
            let categoryData = '';
            for (let category of categoriesSorted) {
                categoryLabels += CategoryLabel(category['id'], category['catname']);
                categoryData += CategoryBody(category['id'], category['catname'], category['description']);
            }
            $('#category-labels').html(categoryLabels);
            $('#category-details').html(categoryData);
            watchCategoryDeletion();
            watchCategoryEdition();
        })
        .catch(ignore);
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
            fetch(`http://${ BACK_END_HOST }:${ BACK_END_PORT }/category`, {
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
                .catch(ignore);
        }
    });
}

function watchCategoryEdition() {
    $('.category-info').one('submit', (event) => {
        event.preventDefault();
        const $this = event.target;
        const cid = $($this).attr('id').split('-')[1];
        const newCatName = $(`#category-${ cid }-name`).val();
        const newCatDesc = $(`#category-${ cid }-desc`).val();
        const UPDATED_CATEGORY = {
            catname: newCatName,
            description: newCatDesc
        };
        fetch(`http://${ BACK_END_HOST }:${ BACK_END_PORT }/category/${ cid }`, {
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
            .catch(ignore);
    });
}

function watchCategoryDeletion() {
    $('.del-btn').one('click', (event) => {
        event.preventDefault();
        const $this = event.target;
        /** @type {string} */
        const categorySelected = $($this).parent().parent().prop('id');
        const cid = categorySelected.split('-')[1];
        fetch(`http://${ BACK_END_HOST }:${ BACK_END_PORT }/category/${ cid }`, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('sp-games-token')
            }
        })
            .then(res => res.status)
            .then(status => {
                if (status === 204) {
                    loadCategoryContent();
                }
            })
            .catch(ignore);
    });
}