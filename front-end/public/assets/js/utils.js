"use strict";

/*
 *  Author:     Ethan Tan
 *  Admin:      p2012085
 *  Class:      DAAA/FT/1B/03
 *  File:       templates.js
 */

/** @typedef {{
 *      id: number,
 *      title: string,
 *      description: string,
 *      price: string,
 *      year: number | null,
 *      categories: {
 *          catid: number,
 *          catname: string
 *      }[],
 *      platforms: {
 *          pid: number,
 *          platform: string,
 *          version: string
 *      }[]}
 * } Game */

/**
 * Casually ignore an error
 * @param {Error} err
 * @returns
 */
function ignore(err) {
    return;
}