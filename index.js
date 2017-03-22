'use strict';

const codex = require('./src/codex');
module.exports = codex;

const fortelCodex = codex
const util = require('util');
//const fortelCodex = require('fortel-codex');
const Zodiac = fortelCodex.Zodiac;

var items = Zodiac.items; //Array of "生肖"
console.log(items.map(item=>item.displayName).join(', '));