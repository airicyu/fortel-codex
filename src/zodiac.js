'use strict';

const { Branch } = require('./stemBranch');

/**
 * 十二生肖
 * 
 * @class Zodiac
 */
class Zodiac {

    /**
     * Creates an instance of Zodiac.
     * @param {number} index 
     * @param {string} displayName 
     * @param {Branch} branch
     * 
     * @memberOf Zodiac
     */
    constructor(index, displayName, branch) {
        this.index = index;
        this.displayName = displayName;
        this.branch = branch;
    }

    getIndex() {
        return this.index;
    }

    getDisplayName() {
        return this.displayName;
    }

    getBranch() {
        return this.branch;
    }

    /**
     * get by index or name
     * 
     * @static
     * @param {number|string} key 
     * @returns {Zodiac}
     * 
     * @memberOf Zodiac
     */
    static get(key) {
        if (typeof key === 'string') {
            return Zodiac.items[['鼠', '牛', '虎', '兔', '龍', '蛇', '馬', '羊', '猴', '雞', '狗', '豬'].indexOf(key)];
        } else {
            let items = this.items;
            return items[((key % items.length) + items.length) % items.length]
        }
    }
}
Zodiac.items = [
    new Zodiac(0, '鼠', Branch.get(0)),
    new Zodiac(1, '牛', Branch.get(1)),
    new Zodiac(2, '虎', Branch.get(2)),
    new Zodiac(3, '兔', Branch.get(3)),
    new Zodiac(4, '龍', Branch.get(4)),
    new Zodiac(5, '蛇', Branch.get(5)),
    new Zodiac(6, '馬', Branch.get(6)),
    new Zodiac(7, '羊', Branch.get(7)),
    new Zodiac(8, '猴', Branch.get(8)),
    new Zodiac(9, '雞', Branch.get(9)),
    new Zodiac(10, '狗', Branch.get(10)),
    new Zodiac(11, '豬', Branch.get(11))
];

Object.freeze(Zodiac);
Object.freeze(Zodiac.items);
for (let zodiac of Zodiac.items) {
    Object.freeze(zodiac);
}

module.exports = Zodiac;