"use strict";

/*
 *  Author:     Ethan Tan
 *  Admin:      p2012085
 *  Class:      DAAA/FT/1B/03
 *  File:       templates.js
 */

/** @typedef {{
 *      userid?: number
 *      username?: string
 *      email?: string
 *      password?: string
 *      type?: 'Admin' | 'Customer',
 *      profile_pic_url?: string
 * }} User
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

/** @typedef {{
 *      id: number?,
 *      catname: string,
 *      description: string
 * }} Category */

/** @typedef {{
 *      id: number?,
 *      platform: string,
 *      version: string
 * }} Platform */

/** @typedef {{
 *      rating: string,
 *      content: string,
 *      created_at: string
 * }} Review
 */

/**
 * Casually ignore an error
 * @param {Error} err
 * @returns
 */
function ignore(err) {
    return;
}