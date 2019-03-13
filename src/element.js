'use strict';

const Relationship = require('./relationship');

/**
 * 五行
 * 
 * @class Element
 */
class Element {

    /**
     * Creates an instance of Element.
     * @param {number} index 
     * @param {string} displayName 
     * 
     * @memberOf Element
     */
    constructor(index, displayName) {
        this.index = index;
        this.displayName = displayName;
    }

    getDisplayName() {
        return this.displayName;
    }

    /**
     * get by index or name
     * 
     * @static
     * @param {number|string} key 
     * @returns {Element}
     * 
     * @memberOf Element
     */
    static get(key) {
        if (typeof key === 'string') {
            return Element.items[['金', '木', '土', '水', '火'].indexOf(key)];
        } else {
            let items = Element.items;
            return items[((key % items.length) + items.length) % items.length]
        }
    }

    /**
     * 相生相剋
     * 
     * @param {Element} target 
     * @returns {relationship: string, isPosiitive: boolean, isNegative: boolean}
     * 
     * @memberOf Element
     */
    to(target) {
        if (target instanceof Element) {
            let relativeIndex = target.index - this.index;

            let relationship = [
                Relationship.Same,
                Relationship.Suppress,
                Relationship.EnhancedBy,
                Relationship.Enhance,
                Relationship.SuppressedBy
            ][(relativeIndex + 5) % 5];

            return relationship;
        }
        return null;
    }

    /**
     * 生
     * 
     * @readonly
     * @returns {Element}
     * 
     * @memberOf Element
     */
    getEnhance() {
        return Element.get(this.index + 3);
    }

    /**
     * 被生
     * 
     * @readonly
     * @returns {Element}
     * 
     * @memberOf Element
     */
    getEnhancedBy() {
        return Element.get(this.index - 3);
    }

    /**
     * 剋
     * 
     * @readonly
     * @returns {Element}
     * 
     * @memberOf Element
     */
    getSuppress() {
        return Element.get(this.index + 1);
    }

    /**
     * 被剋
     * 
     * @readonly
     * @returns {Element}
     * 
     * @memberOf Element
     */
    getSuppressedBy() {
        return Element.get(this.index - 1);
    }
}

Element.items = [
    new Element(0, '金'),
    new Element(1, '木'),
    new Element(2, '土'),
    new Element(3, '水'),
    new Element(4, '火')
];
Element.Gold = Element.items[0];
Element.Wood = Element.items[1];
Element.Earth = Element.items[2];
Element.Water = Element.items[3];
Element.Fire = Element.items[4];

Object.freeze(Element);
Object.freeze(Element.items);
Object.freeze(Element.Gold);
Object.freeze(Element.Wood);
Object.freeze(Element.Earth);
Object.freeze(Element.Water);
Object.freeze(Element.Fire);

module.exports = Element;