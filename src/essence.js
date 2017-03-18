'use strict';

/**
 * 五行
 * 
 * @class Essence
 */
class Essence {

    /**
     * Creates an instance of Essence.
     * @param {number} index 
     * @param {string} displayName 
     * 
     * @memberOf Essence
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
     * @returns {Essence}
     * 
     * @memberOf Essence
     */
    static get(key) {
        if (typeof key === 'string') {
            return Essence.items[['金', '木', '土', '水', '火'].indexOf(key)];
        } else {
            let items = Essence.items;
            return items[((key % items.length) + items.length) % items.length]
        }
    }

    /**
     * 相生相剋
     * 
     * @param {Essence} target 
     * @returns {relation: string, isPositive: boolean, isNegative: boolean}
     * 
     * @memberOf Essence
     */
    to(target) {
        let relativeIndex = target.index - this.index;
        let relation = ['同', '剋', '被生', '生', '被剋'][(relativeIndex + 5) % 5];
        let isPositive = (relation === '生' || relation === '被生');
        let isNegative = (relation === '剋' || relation === '被剋');
        return {
            relation,
            isPositive,
            isNegative
        };
    }

    /**
     * 生
     * 
     * @readonly
     * @returns {Essence}
     * 
     * @memberOf Essence
     */
    get feed() {
        return Essence.get(this.index + 3);
    }

    /**
     * 被生
     * 
     * @readonly
     * @returns {Essence}
     * 
     * @memberOf Essence
     */
    get feeded() {
        return Essence.get(this.index - 3);
    }

    /**
     * 剋
     * 
     * @readonly
     * @returns {Essence}
     * 
     * @memberOf Essence
     */
    get suppress() {
        return Essence.get(this.index + 1);
    }

    /**
     * 被剋
     * 
     * @readonly
     * @returns {Essence}
     * 
     * @memberOf Essence
     */
    get suppressed() {
        return Essence.get(this.index - 1);
    }
}

Essence.items = [
    new Essence(0, '金'),
    new Essence(1, '木'),
    new Essence(2, '土'),
    new Essence(3, '水'),
    new Essence(4, '火')
];
Essence.gold = Essence.items[0];
Essence.wood = Essence.items[1];
Essence.earth = Essence.items[2];
Essence.water = Essence.items[3];
Essence.fire = Essence.items[4];

module.exports = Essence;