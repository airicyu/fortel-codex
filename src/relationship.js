'use strict';

class Relationship {

    constructor(id, displayName) {
        this.id = id;
        this.displayName = displayName;
    }

    getId() {
        return this.id;
    }

    getDisplayName() {
        return this.displayName;
    }

    isPositive() {
        return this.id === 'Enhance' || this.id === 'EnhancedBy';
    }

    isNegative() {
        return this.id === 'Suppress' || this.id === 'SuppressedBy';
    }

    isNeutral() {
        return this.id === 'Same';
    }
}

Relationship.Same = Object.freeze(new Relationship('Same', "同"));
Relationship.Enhance = Object.freeze(new Relationship('Enhance', "生"));
Relationship.EnhancedBy = Object.freeze(new Relationship('EnhancedBy', "被生"));
Relationship.Suppress = Object.freeze(new Relationship('Suppress', "剋"));
Relationship.SuppressedBy = Object.freeze(new Relationship('SuppressedBy', "被剋"));

module.exports = Relationship;