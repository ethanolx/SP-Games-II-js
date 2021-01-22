function watchAdministration() {
    // $('#category-mode').on('click', (event) => {
    //     event.preventDefault();
    //     $('#category-overview').slideDown();
    // });
    watchCategoryCreation();
    watchPlatformCreation();
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
        event.preventDefault();
        const gameElementId = $(event.target).attr('id').split('-');
        const gid = gameElementId[gameElementId.length - 1];
        // window.location.assign('/game/' + gid);
        history.pushState(null, null, '/game/' + gid)
        $(window).trigger('hashchange');
    });
}

