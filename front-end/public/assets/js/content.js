"use strict";

/*
 *  Author:     Ethan Tan
 *  Admin:      p2012085
 *  Class:      DAAA/FT/1B/03
 *  File:       content.js
 */

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
                loadFilterBar();
                loadGameContent();
                break;
            case '/profile':
                loadProfileContent();
                break;
            case '/categories':
                loadCategoryContent();
                break;
            case '/platforms':
                loadPlatformContent();
                break;
            case '/games-admin':
                loadAdminGameContent();
                break;
        }
    }
}