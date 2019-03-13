'use strict';

/**
 * 陰陽
 * 
 * @class MoonSun
 */
class MoonSun {

    /**
     * Creates an instance of MoonSun.
     * @param {number} index 
     * @param {string} displayName 
     * 
     * @memberOf MoonSun
     */
    constructor(index, displayName) {
        this.index = index;
        this.displayName = displayName;
    }

    getDisplayName() {
        return this.displayName;
    }

    getOpposite() {
        return MoonSun.get(this.index + 1);
    }

    /**
     * get by index or name
     * 
     * @static
     * @param {number|string} key
     * @returns {MoonSun}
     * 
     * @memberOf MoonSun
     */
    static get(key) {
        if (typeof key === 'string') {
            if (key === '陰') {
                return MoonSun.Moon
            } else if (key === '陽') {
                return MoonSun.Sun
            } else return null;
        } else {
            let items = MoonSun.items;
            return items[((key % items.length) + items.length) % items.length]
        }
    }

}
MoonSun.items = [new MoonSun(0, '陰'), new MoonSun(1, '陽')];
MoonSun.Moon = MoonSun.items[0];
MoonSun.Sun = MoonSun.items[1];

Object.freeze(MoonSun);
Object.freeze(MoonSun.items);
Object.freeze(MoonSun.Moon);
Object.freeze(MoonSun.Sun);

module.exports = MoonSun;