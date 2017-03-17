'use strict';

/**
 * 陰陽
 * 
 * @class DarkBright
 */
class DarkBright {

    /**
     * Creates an instance of DarkBright.
     * @param {number} index 
     * @param {string} displayName 
     * 
     * @memberOf DarkBright
     */
    constructor(index, displayName) {
        this.index = index;
        this.displayName = displayName;
    }

    /**
     * get by index or name
     * 
     * @static
     * @param {number|string} i 
     * @returns {DarkBright}
     * 
     * @memberOf DarkBright
     */
    static get(i) {
        let items = DarkBright.items;
        return items[((i % items.length) + items.length) % items.length]
    }
}
DarkBright.items = [new DarkBright(0, '陰'), new DarkBright(1, '陽')];
DarkBright.dark = DarkBright.items[0];
DarkBright.bright = DarkBright.items[1];

module.exports = DarkBright;