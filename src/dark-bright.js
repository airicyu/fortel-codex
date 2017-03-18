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
     * @param {number|string} key
     * @returns {DarkBright}
     * 
     * @memberOf DarkBright
     */
    static get(key) {
        if (typeof key === 'string') {
            if (key === '陰') { return DarkBright.dark }
            if (key === '陽') { return DarkBright.bright }
        } else {
        let items = DarkBright.items;
        return items[((key % items.length) + items.length) % items.length]
        }
    }

}
DarkBright.items = [new DarkBright(0, '陰'), new DarkBright(1, '陽')];
DarkBright.dark = DarkBright.items[0];
DarkBright.bright = DarkBright.items[1];

module.exports = DarkBright;