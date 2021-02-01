function loadContent() {
    const page = window.location.pathname;
    if (/\/game\/[\d]+/.test(page)) {
        loadSingleGameContent(parseInt(page.substr(1).split('/')[1]));
    }
    else {
        switch (page) {
            case '/':
                break;
            case '/games':
                loadGameContent();
                watchGameSelection();
                watchSearchConditions();
                loadFilterBar();
                break;
            case '/profile':
                loadProfileContent();
                watchProfileEdition();
                break;
            case '/categories':
                watchCategoryCreation();
                loadCategoryContent();
                break;
            case '/platforms':
                watchPlatformCreation();
                loadPlatformContent();
                break;
            case '/games-admin':
                loadAdminGameContent();
                break;
        }
    }
}