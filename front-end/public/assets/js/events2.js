$(() => {
    watchAdministration();
    watchCategoryCreation();
});

function watchAdministration() {

    $('#category-mode').on('click', (event) => {
        event.preventDefault();
        $('#category-overview').slideDown();
    })
}

function watchCategoryCreation() {
    $('.new-category').on('keypress', (event) => {
        event.stopPropagation();
        if (event.which === 13) {
            if ($('#new-category-name').text() !== 'New Category' && $('#new-category-desc').text() !== '...description') {
                const NEW_CATEGORY = {
                    catname: $('#new-category-name').text(),
                    description: $('#new-category-desc').text()
                }
                console.log(NEW_CATEGORY)
                fetch('http://localhost:5000/category', {
                    method: 'POST',
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token'),
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(NEW_CATEGORY)
                });
            }
            else {
                alert('Enter category name');
            }
        }
    });
}