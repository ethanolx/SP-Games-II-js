/**
 * Casually ignore an error
 * @param {Error} err
 * @returns
 */
function ignore(err) {
    return;
}

/** @typedef {{
 *      id: number,
 *      title: string,
 *      description: string,
 *      price: string,
 *      year: number,
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